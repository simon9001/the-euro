// src/components/TributeWallSection.tsx
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { type Tribute, type TributeFormData } from '../types'

// ✅ Your live Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwX9xk5Z1qUkBPPUhjR7v_2UMaJpTXQhTfpyLSmcWYzMtz4u9zVL8P-3ZpQ66IWlgJNBA/exec'

interface TributeWallSectionProps {
  preview?: boolean;
}

// Generate unique user UUID for ownership tracking
const generateUserUUID = (): string => {
  if (!localStorage.getItem('user_uuid')) {
    const uuid = crypto.randomUUID()
    localStorage.setItem('user_uuid', uuid)
    return uuid
  }
  return localStorage.getItem('user_uuid')!
}

export default function TributeWallSection({ preview = false }: TributeWallSectionProps) {
  const [tributes, setTributes] = useState<Tribute[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userUUID, setUserUUID] = useState<string>('')
  const [userLocation, setUserLocation] = useState<string>('')
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false)
  const [locationError, setLocationError] = useState<string>('')
  const [showTributeForm, setShowTributeForm] = useState<boolean>(false)

  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue,
    watch,
    formState: { errors } 
  } = useForm<TributeFormData>()

  const visibleTributes = preview ? tributes.slice(0, 4) : tributes

  // Calculate statistics
  const totalTributes = tributes.length
  const candlesLit = tributes.filter(t => t.hasCandle).length
  const uniqueCountries = new Set(tributes.map(t => t.location).filter(Boolean)).size
  const prayerWallActive = totalTributes > 0 // Prayer wall is active if there are tributes

  // Load tributes on component mount
  useEffect(() => {
    const uuid = generateUserUUID()
    setUserUUID(uuid)
    loadAllTributes()
  }, [])

  // Get user's device location
  const getUserLocation = (): void => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      return
    }

    setIsGettingLocation(true)
    setLocationError('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          
          // Reverse geocoding to get location name
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
          
          const locationData = await response.json()
          
          let locationString = ''
          if (locationData.city) {
            locationString = locationData.city
          }
          if (locationData.countryName) {
            locationString += locationString ? `, ${locationData.countryName}` : locationData.countryName
          }
          
          if (locationString) {
            setUserLocation(locationString)
            setValue('location', locationString)
          } else {
            setUserLocation('Location detected')
            setValue('location', 'Location detected')
          }
        } catch (error) {
          console.error('Error getting location name:', error)
          setUserLocation('Location detected')
          setValue('location', 'Location detected')
        }
        
        setIsGettingLocation(false)
      },
      (error) => {
        console.error('Error getting location:', error)
        setIsGettingLocation(false)
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location services.')
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable.')
            break
          case error.TIMEOUT:
            setLocationError('Location request timed out.')
            break
          default:
            setLocationError('An unknown error occurred while getting location.')
            break
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  // Auto-detect location when component mounts in non-preview mode
  useEffect(() => {
    if (!preview) {
      getUserLocation()
    }
  }, [preview])

  // Load tributes from localStorage
  const loadTributes = (): Tribute[] => {
    const raw = localStorage.getItem('tributes_v1') || '[]'
    try {
      return JSON.parse(raw)
    } catch {
      return []
    }
  }

  const saveTributes = (arr: Tribute[]): void => {
    localStorage.setItem('tributes_v1', JSON.stringify(arr))
    setTributes(arr)
  }

  // POST new tribute to Google Apps Script
  const submitToWebApp = async (name: string, relation: string, message: string, location: string): Promise<string | null> => {
    const formData = new URLSearchParams()
    formData.append('name', name)
    formData.append('relation', relation)
    formData.append('message', message)
    formData.append('location', location)
    formData.append('uuid', userUUID)
    formData.append('ts', Date.now().toString())

    try {
      setIsSubmitting(true)
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      setIsSubmitting(false)

      if (data.status === 'success') return data.id

      alert('Failed to submit tribute: ' + (data.message || 'Unknown error'))
      return null

    } catch (err) {
      setIsSubmitting(false)
      alert('Network or CORS error. Make sure the Apps Script is deployed and accessible.')
      console.error(err)
      return null
    }
  }

  // DELETE tribute from Google Apps Script
  const deleteTribute = async (id: string): Promise<void> => {
    const payload = new FormData()
    payload.append('deleteId', id)
    payload.append('uuid', userUUID)

    try {
      const res = await fetch(SCRIPT_URL, { method: 'POST', body: payload })
      const text = await res.text()
      let data
      try { 
        data = JSON.parse(text) 
      } catch { 
        data = { status: 'deleted' } 
      }

      if (data.status === 'deleted') {
        console.log(`Deleted tribute with id ${id}`)
      } else {
        console.warn('Delete failed or not found', id)
      }
    } catch (err) {
      console.error('Error deleting tribute:', err)
    }
  }

  // GET all tributes from Google Apps Script
  const loadAllTributes = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const res = await fetch(SCRIPT_URL)
      const json = await res.json()

      // Expect { status: 'success', data: [...] }
      const tributesData = json?.data || []
      
      // Transform the data to match our Tribute interface
      const transformedTributes: Tribute[] = tributesData.map((tribute: any) => ({
        id: tribute.id || tribute.timestamp,
        name: tribute.name || 'Anonymous',
        message: tribute.message,
        date: tribute.timestamp ? new Date(tribute.timestamp).toISOString() : new Date().toISOString(),
        hasCandle: true,
        location: tribute.location || 'Kenya',
        relationship: tribute.relation || 'Fan',
        uuid: tribute.uuid,
        ts: tribute.timestamp || Date.now()
      }))

      saveTributes(transformedTributes)
    } catch (err) {
      console.error('Error loading tributes:', err)
      // Fallback to localStorage if API fails
      const localTributes = loadTributes()
      setTributes(localTributes)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: TributeFormData): Promise<void> => {
    const locationToUse = data.location || userLocation || 'Kenya'
    const id = await submitToWebApp(data.name, data.relationship || 'Fan', data.message, locationToUse)
    if (!id) return

    const newTribute: Tribute = {
      id,
      name: data.name,
      message: data.message,
      date: new Date().toISOString(),
      hasCandle: true,
      location: locationToUse,
      relationship: data.relationship || 'Fan',
      uuid: userUUID,
      ts: Date.now()
    }
    
    const updatedTributes = [...tributes, newTribute]
    saveTributes(updatedTributes)
    reset()
    setShowSuccess(true)
    setShowTributeForm(false) // Hide form after successful submission
    
    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const handleDeleteTribute = async (tribute: Tribute): Promise<void> => {
    if (confirm('Delete your tribute?')) {
      await deleteTribute(tribute.id as string)
      const updated = tributes.filter(t => t.id !== tribute.id)
      saveTributes(updated)
    }
  }

  const lightCandle = (id: string | number): void => {
    setTributes(tributes.map(tribute => 
      tribute.id === id ? { ...tribute, hasCandle: true } : tribute
    ))
  }

  const clearAllTributes = (): void => {
    if (confirm('Clear all tributes stored locally?')) {
      localStorage.removeItem('tributes_v1')
      setTributes([])
    }
  }

  const lightAllCandles = (): void => {
    setTributes(tributes.map(tribute => ({ ...tribute, hasCandle: true })))
  }

  const getRelationshipColor = (relationship: string): string => {
    const colors: { [key: string]: string } = {
      'Family': 'bg-pink-100 text-pink-800',
      'Friend': 'bg-blue-100 text-blue-800',
      'Fellow Minister': 'bg-purple-100 text-purple-800',
      'Mentee': 'bg-green-100 text-green-800',
      'Spiritual Father': 'bg-indigo-100 text-indigo-800',
      'Fan': 'bg-orange-100 text-orange-800',
      'International Fan': 'bg-teal-100 text-teal-800'
    }
    return colors[relationship] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString: string | number): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'Recent'
    }
  }

  const handleShareTributeClick = (): void => {
    setShowTributeForm(true)
  }

  if (isLoading) {
    return (
      <section id="tributes" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="loading loading-spinner loading-lg text-memorial-gold mb-4"></div>
              <p className="text-gray-600">Loading tributes...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="tributes" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
          <div>
            <h2 className="section-title text-left mb-2">Tribute Wall</h2>
            <p className="text-gray-600 text-lg max-w-3xl">
              Join {totalTributes}+ people in honoring Betty's memory and celebrating her eternal impact
            </p>
          </div>
          <div className="flex gap-2">
            {preview && (
              <Link 
                to="/tributes" 
                className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400 lg:self-center"
              >
                View All Tributes
              </Link>
            )}
            {!preview && (
              <button 
                onClick={clearAllTributes}
                className="btn btn-outline btn-sm text-gray-500"
              >
                Clear Local Cache
              </button>
            )}
          </div>
        </div>

        {/* Statistics - Updated with pink text */}
        {!preview && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-pink-50 rounded-lg p-4 text-center border border-pink-100">
              <div className="text-2xl font-bold text-pink-600">{totalTributes}</div>
              <div className="text-pink-700 text-sm font-medium">Total Tributes</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 text-center border border-pink-100">
              <div className="text-2xl font-bold text-pink-600">{candlesLit}</div>
              <div className="text-pink-700 text-sm font-medium">Candles Lit</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 text-center border border-pink-100">
              <div className="text-2xl font-bold text-pink-600">{uniqueCountries}+</div>
              <div className="text-pink-700 text-sm font-medium">Countries</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 text-center border border-pink-100">
              <div className="text-2xl font-bold text-pink-600">{prayerWallActive ? '24/7' : '0'}</div>
              <div className="text-pink-700 text-sm font-medium">Prayer Wall</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tribute Form - Conditionally Rendered */}
          {showTributeForm && (
            <div className="lg:col-span-1">
              <div className="card bg-base-100 shadow-xl sticky top-24">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🕯️</div>
                      <h3 className="card-title text-memorial-dark">Share Your Tribute</h3>
                    </div>
                    <button 
                      onClick={() => setShowTributeForm(false)}
                      className="btn btn-sm btn-ghost text-gray-500 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                  
                  {showSuccess && (
                    <div className="alert alert-success bg-green-50 border-green-200 mb-4">
                      <div className="flex items-center gap-2">
                        <span>✅</span>
                        <span className="text-green-800">Thank you for your tribute! It has been added to the wall.</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Name *</span>
                      </label>
                      <input
                        type="text"
                        {...register("name", { 
                          required: "Name is required",
                          minLength: { value: 2, message: "Name must be at least 2 characters" }
                        })}
                        className="input input-bordered"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                      )}
                    </div>

                    {/* Relationship Input - Always Show */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Relationship *</span>
                      </label>
                      <select 
                        {...register("relationship", { required: "Please select your relationship" })}
                        className="select select-bordered"
                      >
                        <option value="">Select your relationship</option>
                        <option value="Fan">Fan</option>
                        <option value="Friend">Friend</option>
                        <option value="Fellow Minister">Fellow Minister</option>
                        <option value="Family">Family</option>
                        <option value="Mentee">Mentee</option>
                        <option value="Spiritual Father">Spiritual Leader</option>
                        <option value="International Fan">International Fan</option>
                      </select>
                      {errors.relationship && (
                        <span className="text-red-500 text-sm">{errors.relationship.message}</span>
                      )}
                    </div>

                    {/* Location Section */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Location</span>
                      </label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          {...register("location")}
                          className="input input-bordered"
                          placeholder={userLocation || "City, Country"}
                          value={watch('location') || userLocation || ''}
                          onChange={(e) => setValue('location', e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={getUserLocation}
                          disabled={isGettingLocation}
                          className="btn btn-outline btn-sm w-full"
                        >
                          {isGettingLocation ? (
                            <>
                              <span className="loading loading-spinner loading-xs"></span>
                              Detecting Location...
                            </>
                          ) : (
                            <>
                              📍 Use My Current Location
                            </>
                          )}
                        </button>
                        {locationError && (
                          <div className="alert alert-warning bg-yellow-50 border-yellow-200 py-2">
                            <span className="text-yellow-800 text-sm">{locationError}</span>
                          </div>
                        )}
                        {userLocation && !locationError && (
                          <div className="text-green-600 text-sm flex items-center gap-1">
                            <span>✅</span>
                            Location detected: {userLocation}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Message *</span>
                      </label>
                      <textarea
                        {...register("message", { 
                          required: "Message is required",
                          minLength: { 
                            value: 10, 
                            message: "Message must be at least 10 characters" 
                          },
                          maxLength: {
                            value: 500,
                            message: "Message must be less than 500 characters"
                          }
                        })}
                        className="textarea textarea-bordered h-32"
                        placeholder="Share your memories, how her music impacted you, or a prayer..."
                      />
                      {errors.message && (
                        <span className="text-red-500 text-sm">{errors.message.message}</span>
                      )}
                    </div>

                    <div className="form-control mt-6">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400 text-lg py-3"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="loading loading-spinner"></span>
                            Lighting Candle...
                          </>
                        ) : (
                          <>
                            Light a Candle 🕯️
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-gray-500 text-xs text-center">
                      Your tribute will be visible to others visiting this memorial
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Tributes Display - Adjusted column span based on form visibility */}
          <div className={showTributeForm ? "lg:col-span-2" : "lg:col-span-3"}>
            {/* Share Tribute Button - Only show when form is hidden */}
            {!showTributeForm && !preview && (
              <div className="text-center mb-8">
                <button
                  onClick={handleShareTributeClick}
                  className="btn bg-pink-500 text-white border-none hover:bg-pink-600 text-lg py-4 px-8 shadow-lg"
                >
                  <span className="text-xl mr-2">🕯️</span>
                  Share Your Tribute
                </button>
                <p className="text-gray-500 mt-2">Be part of Betty's eternal legacy</p>
              </div>
            )}

            {tributes.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🕯️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No tributes yet</h3>
                <p className="text-gray-500 mb-6">Be the first to share a memory and light a candle</p>
                {!preview && (
                  <button
                    onClick={handleShareTributeClick}
                    className="btn bg-pink-500 text-white border-none hover:bg-pink-600"
                  >
                    Share First Tribute
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {visibleTributes.map((tribute, index) => (
                    <div 
                      key={tribute.id} 
                      className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="card-body">
                        {/* Header with name and actions */}
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex-1">
                                <h4 className="card-title text-memorial-dark group-hover:text-memorial-gold transition-colors">
                                  {tribute.name || 'Anonymous'}
                                </h4>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  {tribute.location && (
                                    <span className="text-gray-500 text-sm">📍 {tribute.location}</span>
                                  )}
                                  {tribute.relationship && (
                                    <span className={`badge badge-sm ${getRelationshipColor(tribute.relationship)}`}>
                                      {tribute.relationship}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {tribute.uuid === userUUID && (
                                <button 
                                  onClick={() => handleDeleteTribute(tribute)}
                                  className="btn btn-sm btn-ghost text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                                  title="Delete your tribute"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Candle */}
                        <div className="flex justify-end mb-3">
                          {tribute.hasCandle ? (
                            <div className="text-memorial-gold text-2xl animate-pulse">🕯️</div>
                          ) : (
                            <button 
                              onClick={() => lightCandle(tribute.id)}
                              className="btn btn-sm btn-circle btn-outline text-memorial-gold border-memorial-gold hover:bg-memorial-gold hover:text-white"
                              title="Light a candle"
                            >
                              🕯️
                            </button>
                          )}
                        </div>

                        {/* Message */}
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {preview && index >= 4
                            ? `${tribute.message.substring(0, 120)}...`
                            : tribute.message
                          }
                        </p>

                        {preview && index >= 4 && (
                          <Link 
                            to="/tributes" 
                            className="inline-flex items-center gap-1 text-memorial-gold font-semibold hover:underline text-sm mb-4"
                          >
                            Read full tribute →
                          </Link>
                        )}

                        {/* Footer with date and actions */}
                        <div className="card-actions justify-between items-center pt-4 border-t border-gray-100">
                          <span className="text-gray-500 text-sm">
                            {formatDate(tribute.ts || tribute.date)}
                          </span>
                          <div className="flex gap-2">
                            <button className="btn btn-sm btn-ghost text-gray-500 hover:text-memorial-gold">
                              🙏 Pray
                            </button>
                            {!preview && (
                              <button className="btn btn-sm btn-ghost text-gray-500 hover:text-memorial-gold">
                                💝 Love
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show more tributes indicator */}
                {preview && tributes.length > 4 && (
                  <div className="text-center mt-8">
                    <div className="bg-memorial-light rounded-xl p-6">
                      <p className="text-gray-600 mb-4">
                        And {tributes.length - 4} more heartfelt tributes from around the world
                      </p>
                      <Link 
                        to="/tributes" 
                        className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400"
                      >
                        Read All Tributes
                      </Link>
                    </div>
                  </div>
                )}

                {/* Live Candle Counter for Full Page */}
                {!preview && (
                  <div className="mt-8 bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl p-6 text-center border border-pink-200">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-4xl animate-pulse text-pink-500">🕯️</div>
                      <div>
                        <div className="text-2xl font-bold text-pink-600">
                          {candlesLit} Candles Burning
                        </div>
                        <p className="text-pink-700">
                          Join the continuous prayer vigil in Betty's memory
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={lightAllCandles}
                      className="btn bg-pink-500 text-white border-none hover:bg-pink-600"
                    >
                      Light All Candles
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
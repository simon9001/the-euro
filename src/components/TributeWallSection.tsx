// src/components/TributeWallSection.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { type Tribute, type TributeFormData } from '../types'

// Sample initial tributes
const initialTributes: Tribute[] = [
  {
    id: 1,
    name: "Sarah M.",
    message: "Betty's music got me through my darkest times. Her voice was truly a gift from God. I'll never forget how '11th Hour' helped me trust God's timing during my unemployment season.",
    date: "2024-01-15",
    hasCandle: true,
    location: "Nairobi, Kenya",
    relationship: "Fan"
  },
  {
    id: 2,
    name: "Pastor John Kamau",
    message: "Her ministry through music touched countless lives. She was a true servant of God who remained humble despite her success. I had the honor of hosting her at our church in 2022.",
    date: "2024-01-14",
    hasCandle: true,
    location: "Mombasa, Kenya",
    relationship: "Fellow Minister"
  },
  {
    id: 3,
    name: "Grace Wanjiru",
    message: "Betty was my spiritual big sister. She mentored me when I started in gospel music and taught me that ministry is about hearts, not charts. Her legacy lives on in all she touched.",
    date: "2024-01-16",
    hasCandle: true,
    location: "Kiambu, Kenya",
    relationship: "Mentee"
  },
  {
    id: 4,
    name: "David & Family",
    message: "To the world, she was Betty Bayo. To us, she was loving mother, devoted wife, and our prayer warrior. Her faith never wavered, even at the end. We miss her every day.",
    date: "2024-01-13",
    hasCandle: true,
    location: "Family",
    relationship: "Family"
  },
  {
    id: 5,
    name: "Reverend Michael",
    message: "I witnessed Betty's growth from a young choir member to a gospel powerhouse. Her authenticity and dedication to God's work was inspiring. Heaven gained a true worshipper.",
    date: "2024-01-17",
    hasCandle: true,
    location: "Nakuru, Kenya",
    relationship: "Spiritual Father"
  },
  {
    id: 6,
    name: "Emily Chen",
    message: "Though I never met her personally, her music transcended cultures and languages. As a Chinese Christian living in Kenya, her songs became my prayer language during difficult times.",
    date: "2024-01-18",
    hasCandle: false,
    location: "Kisumu, Kenya",
    relationship: "International Fan"
  }
]

interface TributeWallSectionProps {
  preview?: boolean;
}

export default function TributeWallSection({ preview = false }: TributeWallSectionProps) {
  const [tributes, setTributes] = useState<Tribute[]>(initialTributes)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<TributeFormData>()

  const visibleTributes = preview ? tributes.slice(0, 4) : tributes

  const onSubmit = async (data: TributeFormData): Promise<void> => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newTribute: Tribute = {
      id: tributes.length + 1,
      name: data.name,
      message: data.message,
      date: new Date().toLocaleDateString('en-CA'),
      hasCandle: true,
      location: data.location || 'Kenya',
      relationship: data.relationship || 'Fan'
    }
    
    setTributes([newTribute, ...tributes])
    reset()
    setIsSubmitting(false)
    setShowSuccess(true)
    
    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const lightCandle = (id: number): void => {
    setTributes(tributes.map(tribute => 
      tribute.id === id ? { ...tribute, hasCandle: true } : tribute
    ))
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

  return (
    <section id="tributes" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
          <div>
            <h2 className="section-title text-left mb-2">Tribute Wall</h2>
            <p className="text-gray-600 text-lg max-w-3xl">
              Join {tributes.length}+ people in honoring Betty's memory and celebrating her eternal impact
            </p>
          </div>
          {preview && (
            <Link 
              to="/tributes" 
              className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400 lg:self-center"
            >
              View All Tributes
            </Link>
          )}
        </div>

        {/* Statistics */}
        {!preview && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-memorial-light rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-memorial-gold">{tributes.length}</div>
              <div className="text-gray-600 text-sm">Total Tributes</div>
            </div>
            <div className="bg-memorial-light rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-memorial-gold">{tributes.filter(t => t.hasCandle).length}</div>
              <div className="text-gray-600 text-sm">Candles Lit</div>
            </div>
            <div className="bg-memorial-light rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-memorial-gold">6+</div>
              <div className="text-gray-600 text-sm">Countries</div>
            </div>
            <div className="bg-memorial-light rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-memorial-gold">24/7</div>
              <div className="text-gray-600 text-sm">Prayer Wall</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tribute Form */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-24">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">🕯️</div>
                  <h3 className="card-title text-memorial-dark">Share Your Tribute</h3>
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

                  {!preview && (
                    <>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Your Location</span>
                        </label>
                        <input
                          type="text"
                          {...register("location")}
                          className="input input-bordered"
                          placeholder="City, Country"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Your Relationship</span>
                        </label>
                        <select 
                          {...register("relationship")}
                          className="select select-bordered"
                        >
                          <option value="Fan">Fan</option>
                          <option value="Friend">Friend</option>
                          <option value="Fellow Minister">Fellow Minister</option>
                          <option value="Family">Family</option>
                          <option value="Mentee">Mentee</option>
                          <option value="Spiritual Father">Spiritual Leader</option>
                          <option value="International Fan">International Fan</option>
                        </select>
                      </div>
                    </>
                  )}

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

          {/* Tributes Display */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleTributes.map((tribute) => (
                <div 
                  key={tribute.id} 
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="card-body">
                    {/* Header with name and candle */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="card-title text-memorial-dark group-hover:text-memorial-gold transition-colors">
                          {tribute.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
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
                      {preview && tribute.id > 4 
                        ? `${tribute.message.substring(0, 120)}...`
                        : tribute.message
                      }
                    </p>

                    {preview && tribute.id > 4 && (
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
                        {new Date(tribute.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
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
              <div className="mt-8 bg-gradient-to-r from-memorial-gold/10 to-memorial-dark/5 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-4xl animate-pulse">🕯️</div>
                  <div>
                    <div className="text-2xl font-bold text-memorial-gold">
                      {tributes.filter(t => t.hasCandle).length} Candles Burning
                    </div>
                    <p className="text-gray-600">
                      Join the continuous prayer vigil in Betty's memory
                    </p>
                  </div>
                </div>
                <button className="btn btn-outline border-memorial-gold text-memorial-gold hover:bg-memorial-gold hover:text-white">
                  Light All Candles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
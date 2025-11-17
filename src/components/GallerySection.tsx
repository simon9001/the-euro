// src/components/GallerySection.tsx
import { useState } from 'react'
import { Link } from 'react-router'
import { type GalleryImage } from '../types'

const galleryImages: GalleryImage[] = [
  { 
    id: 1, 
    src: "/images/gallery/1.jpg", 
    caption: "Betty in Concert", 
    description: "Captivating performance at the National Gospel Awards 2022",
    category: "concert",
    date: "2022"
  },
  { 
    id: 2, 
    src: "/images/gallery/2.jpg", 
    caption: "Studio Session", 
    description: "Recording her hit album 'Tena Tena' with producer Eric",
    category: "studio",
    date: "2023"
  },
  { 
    id: 3, 
    src: "/images/gallery/3.jpg", 
    caption: "Award Ceremony", 
    description: "Receiving the Best Gospel Artist award with her family",
    category: "awards",
    date: "2022"
  },
  { 
    id: 4, 
    src: "/images/gallery/4.jpg", 
    caption: "With Fans", 
    description: "Meeting and praying with fans after a powerful worship night",
    category: "fans",
    date: "2023"
  },
  { 
    id: 5, 
    src: "/images/gallery/5.jpg", 
    caption: "Worship Moment", 
    description: "Deep in worship during her 'Mwamba Imara' tour",
    category: "worship",
    date: "2022"
  },
  { 
    id: 6, 
    src: "/images/gallery/6.jpg", 
    caption: "Family Time", 
    description: "Cherished moments with her children during Christmas",
    category: "personal",
    date: "2022"
  },
  { 
    id: 7, 
    src: "/images/gallery/7.jpg", 
    caption: "Radio Interview", 
    description: "Sharing her testimony on national radio",
    category: "media",
    date: "2023"
  },
  { 
    id: 8, 
    src: "/images/gallery/8.jpg", 
    caption: "Church Service", 
    description: "Leading worship at her home church in Kiambu",
    category: "ministry",
    date: "2021"
  },
  { 
    id: 9, 
    src: "/images/gallery/9.jpg", 
    caption: "Charity Event", 
    description: "Supporting children's education through her foundation",
    category: "charity",
    date: "2022"
  },
  { 
    id: 10, 
    src: "/images/gallery/10.jpg", 
    caption: "Backstage Moments", 
    description: "Praying with the band before a major concert",
    category: "performance",
    date: "2023"
  },
  { 
    id: 11, 
    src: "/images/gallery/11.jpg", 
    caption: "Music Video Shoot", 
    description: "Filming the iconic '11th Hour' music video",
    category: "studio",
    date: "2020"
  },
  { 
    id: 12, 
    src: "/images/gallery/12.jpg", 
    caption: "Final Public Appearance", 
    description: "Her last public message of hope and faith to supporters",
    category: "personal",
    date: "2023"
  }
]

interface GallerySectionProps {
  preview?: boolean;
}

export default function GallerySection({ preview = false }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = ['all', ...new Set(galleryImages.map(img => img.category))]

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  const visibleImages = preview ? filteredImages.slice(0, 6) : filteredImages

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const navigateImage = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length
    
    setCurrentIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const getCategoryLabel = (category: string): string => {
    const labels: { [key: string]: string } = {
      'all': 'All Photos',
      'performance': 'Live Performances',
      'studio': 'Studio Sessions',
      'awards': 'Awards & Recognition',
      'fans': 'With Fans',
      'worship': 'Worship Moments',
      'personal': 'Personal Life',
      'media': 'Media Appearances',
      'ministry': 'Ministry Work',
      'charity': 'Charity Events'
    }
    return labels[category] || category
  }

  return (
    <section id="gallery" className="section-padding bg-memorial-light">
      <div className="max-w-7xl mx-auto">
        {/* Header with See More Button */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h2 className="section-title text-left mb-2">Memories in Pictures</h2>
            <p className="text-gray-600 max-w-2xl">
              A visual journey through Betty's life, ministry, and the moments that touched our hearts
            </p>
          </div>
          {preview && (
            <Link 
              to="/gallery" 
              className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400"
            >
              View Full Gallery
            </Link>
          )}
        </div>

        {/* Category Filters - Only show in full view */}
        {!preview && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`btn btn-sm ${
                  activeCategory === category
                    ? 'bg-memorial-gold text-memorial-dark border-none'
                    : 'btn-outline border-gray-300 text-gray-600'
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {visibleImages.map((image) => (
            <div
              key={image.id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => openLightbox(image, filteredImages.findIndex(img => img.id === image.id))}
            >
              <figure className="aspect-square relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-memorial-gold/20 to-memorial-dark/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2">📸</div>
                    <span className="text-gray-600 text-sm font-medium">{image.caption}</span>
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-center">
                    <div className="text-2xl mb-1">👁️</div>
                    <p className="text-sm font-semibold">View Photo</p>
                  </div>
                </div>
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-memorial-dark text-sm justify-between">
                  {image.caption}
                  <span className="text-gray-400 text-xs font-normal">{image.date}</span>
                </h3>
                <p className="text-gray-600 text-xs line-clamp-2">
                  {preview ? `${image.description.substring(0, 60)}...` : image.description}
                </p>
                {!preview && (
                  <div className="card-actions justify-end mt-2">
                    <div className="badge badge-outline badge-sm text-gray-500">
                      {getCategoryLabel(image.category)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Indicator for Preview */}
        {preview && filteredImages.length > 6 && (
          <div className="text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg inline-block">
              <p className="text-gray-600 mb-3">
                And {filteredImages.length - 6} more precious memories in the gallery
              </p>
              <Link 
                to="/gallery" 
                className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400"
              >
                Explore Full Gallery
              </Link>
            </div>
          </div>
        )}

        {/* Gallery Statistics for Full Page */}
        {!preview && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="stat bg-white rounded-lg text-center p-4 shadow-sm">
              <div className="stat-value text-memorial-gold text-xl">{galleryImages.length}</div>
              <div className="stat-desc text-gray-600">Total Photos</div>
            </div>
            <div className="stat bg-white rounded-lg text-center p-4 shadow-sm">
              <div className="stat-value text-memorial-gold text-xl">{categories.length - 1}</div>
              <div className="stat-desc text-gray-600">Categories</div>
            </div>
            <div className="stat bg-white rounded-lg text-center p-4 shadow-sm">
              <div className="stat-value text-memorial-gold text-xl">2018-2023</div>
              <div className="stat-desc text-gray-600">Timeline</div>
            </div>
            <div className="stat bg-white rounded-lg text-center p-4 shadow-sm">
              <div className="stat-value text-memorial-gold text-xl">100%</div>
              <div className="stat-desc text-gray-600">Precious Memories</div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Lightbox Modal */}
      {selectedImage && (
        <div className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box max-w-6xl w-full p-0 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Display */}
              <div className="lg:w-2/3 relative">
                <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-memorial-gold/10 to-memorial-dark/5 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🖼️</div>
                    <span className="text-gray-600">Large View: {selectedImage.caption}</span>
                  </div>
                  
                  {/* Navigation Arrows */}
                  <button 
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 btn btn-circle bg-black bg-opacity-50 text-white border-none hover:bg-opacity-70"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 btn btn-circle bg-black bg-opacity-50 text-white border-none hover:bg-opacity-70"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Image Details */}
              <div className="lg:w-1/3 p-6 bg-white">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-memorial-dark">{selectedImage.caption}</h3>
                  <button 
                    className="btn btn-sm btn-circle btn-ghost"
                    onClick={() => setSelectedImage(null)}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700">{selectedImage.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="badge bg-memorial-gold text-memorial-dark">
                      {getCategoryLabel(selectedImage.category)}
                    </div>
                    <div className="badge badge-outline">{selectedImage.date}</div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500">
                      Photo {currentIndex + 1} of {filteredImages.length}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button className="btn btn-sm btn-outline flex-1">
                        Download
                      </button>
                      <button className="btn btn-sm bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400 flex-1">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Close on backdrop click */}
          <div className="modal-backdrop" onClick={() => setSelectedImage(null)}>
            <button>close</button>
          </div>
        </div>
      )}
    </section>
  )
}
// src/components/VideosSection.tsx
import { useState } from 'react'
import { Link } from 'react-router'
import { type Video } from '../types'

const videos: Video[] = [
  {
    id: 1,
    title: "11th Hour - Official Music Video",
    type: "performance",
    description: "The iconic music video that touched millions worldwide. This powerful visual representation of Betty's breakthrough hit showcases her anointing and connection with worshippers.",
    duration: "4:32",
    views: "15.2M",
    uploadDate: "2020-03-15",
    thumbnail: "/images/videos/11th-hour.jpg",
    youtubeId: "dQw4w9WgXcQ" // Example ID
  },
  {
    id: 2,
    title: "Live at Kasarani Stadium - Full Concert",
    type: "performance",
    description: "Betty's historic performance before 40,000 worshippers at Nairobi's largest stadium. Witness her powerful stage presence and the crowd's electric response to her ministry.",
    duration: "1:28:15",
    views: "8.7M",
    uploadDate: "2022-08-20",
    thumbnail: "/images/videos/kasarani-concert.jpg",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Final Public Performance - Thanksgiving Service",
    type: "performance",
    description: "Her last live performance before her diagnosis, filled with emotion and powerful worship. She led the congregation in 'Mwamba Imara' with incredible strength and faith.",
    duration: "12:45",
    views: "12.4M",
    uploadDate: "2023-05-10",
    thumbnail: "/images/videos/final-performance.jpg",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 4,
    title: "Kenyan Gospel Artists Tribute",
    type: "tribute",
    description: "Fellow gospel musicians including Mercy Masika, Size 8, and Guardian Angel share heartfelt memories and perform special tributes to Betty's life and ministry.",
    duration: "28:30",
    views: "5.3M",
    uploadDate: "2024-01-20",
    thumbnail: "/images/videos/artists-tribute.jpg",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 5,
    title: "Faith Journey Interview - NTV Gospel",
    type: "interview",
    description: "In-depth conversation about her spiritual walk, musical calling, and the story behind '11th Hour.' A rare look into Betty's personal faith and ministry philosophy.",
    duration: "45:18",
    views: "3.8M",
    uploadDate: "2021-11-05",
    thumbnail: "/images/videos/ntv-interview.jpg",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 6,
    title: "Behind the Scenes - Mwamba Imara Recording",
    type: "behind-scenes",
    description: "Exclusive studio footage showing Betty's creative process, vocal preparation, and the spiritual atmosphere during the recording of her award-winning album.",
    duration: "22:10",
    views: "2.1M",
    uploadDate: "2022-04-12",
    thumbnail: "/images/videos/studio-session.jpg",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 7,
    title: "Worship Session - Acoustic Versions",
    type: "performance",
    description: "Intimate acoustic performances of her biggest hits, recorded in her home studio. Features stripped-down arrangements that highlight her raw vocal talent.",
    duration: "38:45",
    views: "4.2M",
    uploadDate: "2023-02-28",
    thumbnail: "/images/videos/acoustic-session.jpg",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 8,
    title: "Memorial Service Highlights",
    type: "tribute",
    description: "Powerful moments from Betty's national memorial service, including eulogies from family, tributes from pastors, and worship led by the gospel community.",
    duration: "1:15:30",
    views: "9.8M",
    uploadDate: "2024-01-25",
    thumbnail: "/images/videos/memorial-service.jpg",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 9,
    title: "Children's Choir Tribute - Tena Tena",
    type: "tribute",
    description: "Touching performance by the Nairobi Children's Choir singing 'Tena Tena' in honor of Betty's legacy and her love for mentoring young worshippers.",
    duration: "8:15",
    views: "1.7M",
    uploadDate: "2024-02-10",
    thumbnail: "/images/videos/children-choir.jpg",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 10,
    title: "Documentary - The Betty Bayo Story",
    type: "documentary",
    description: "Comprehensive documentary covering her life from Kiambu to international stages, featuring never-before-seen family footage and interviews with close friends.",
    duration: "1:52:20",
    views: "6.5M",
    uploadDate: "2024-03-01",
    thumbnail: "/images/videos/documentary.jpg",
    youtubeId: "dQw4w9WgXcQ"
  }
]

interface VideosSectionProps {
  preview?: boolean;
}

export default function VideosSection({ preview = false }: VideosSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [videoCategory, setVideoCategory] = useState<string>('all')

  const visibleVideos = preview ? videos.slice(0, 4) : videos

  const filteredVideos = videoCategory === 'all' 
    ? visibleVideos 
    : visibleVideos.filter(video => video.type === videoCategory)

  const videoCategories = [
    { key: 'all', label: 'All Videos', count: videos.length },
    { key: 'performance', label: 'Performances', count: videos.filter(v => v.type === 'performance').length },
    { key: 'tribute', label: 'Tributes', count: videos.filter(v => v.type === 'tribute').length },
    { key: 'interview', label: 'Interviews', count: videos.filter(v => v.type === 'interview').length },
    { key: 'behind-scenes', label: 'Behind Scenes', count: videos.filter(v => v.type === 'behind-scenes').length },
    { key: 'documentary', label: 'Documentaries', count: videos.filter(v => v.type === 'documentary').length }
  ]

  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      performance: 'badge-primary',
      tribute: 'badge-secondary',
      interview: 'badge-accent',
      'behind-scenes': 'badge-info',
      documentary: 'badge-success'
    }
    return colors[type] || 'badge-neutral'
  }

  const formatViewCount = (views: string): string => {
    return views.includes('M') ? views : `${views}K`
  }

  const playVideo = (video: Video): void => {
    setSelectedVideo(video)
  }

  return (
    <section id="videos" className="section-padding bg-memorial-light">
      <div className="max-w-7xl mx-auto">
        {/* Header with See More Button */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
          <div>
            <h2 className="section-title text-left mb-2">Her Voice, Her Legacy</h2>
            <p className="text-gray-600 text-lg max-w-3xl">
              Experience Betty's ministry through {videos.length}+ powerful videos - from iconic performances to heartfelt tributes
            </p>
          </div>
          {preview && (
            <Link 
              to="/videos" 
              className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400 lg:self-center"
            >
              View All Videos
            </Link>
          )}
        </div>

        {/* Video Statistics */}
        {!preview && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-memorial-gold">{videos.length}</div>
              <div className="text-gray-600 text-sm">Videos</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-memorial-gold">68M+</div>
              <div className="text-gray-600 text-sm">Total Views</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-memorial-gold">5</div>
              <div className="text-gray-600 text-sm">Categories</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-memorial-gold">2019-2024</div>
              <div className="text-gray-600 text-sm">Timeline</div>
            </div>
          </div>
        )}

        {/* Category Filters - Only show in full page */}
        {!preview && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {videoCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => setVideoCategory(category.key)}
                className={`btn btn-sm ${
                  videoCategory === category.key
                    ? 'bg-memorial-gold text-memorial-dark border-none'
                    : 'btn-outline border-gray-300 text-gray-600'
                }`}
              >
                {category.label}
                <span className="badge badge-sm ml-2 bg-white text-gray-600">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredVideos.map((video) => (
            <div 
              key={video.id} 
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              onClick={() => playVideo(video)}
            >
              <figure className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-memorial-gold/20 to-memorial-dark/10 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🎬</div>
                    <span className="text-gray-600 text-sm font-medium">{video.title}</span>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="btn btn-circle bg-memorial-gold text-white border-none hover:bg-yellow-400 transform scale-125">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>

                  {/* Video Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
              </figure>
              
              <div className="card-body p-4">
                <h3 className="card-title text-memorial-dark text-base group-hover:text-memorial-gold transition-colors line-clamp-2">
                  {video.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {preview && video.id > 4 
                    ? `${video.description.substring(0, 80)}...`
                    : video.description
                  }
                </p>

                {preview && video.id > 4 && (
                  <Link 
                    to="/videos" 
                    className="inline-flex items-center gap-1 text-memorial-gold font-semibold hover:underline text-xs mb-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Watch full video →
                  </Link>
                )}

                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>👁️ {formatViewCount(video.views)}</span>
                    <span>{new Date(video.uploadDate).getFullYear()}</span>
                  </div>
                  
                  <span className={`badge badge-sm ${getTypeColor(video.type)}`}>
                    {video.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more videos indicator */}
        {preview && videos.length > 4 && (
          <div className="text-center mt-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <p className="text-gray-600 mb-4">
                And {videos.length - 4} more powerful videos in Betty's legacy collection
              </p>
              <Link 
                to="/videos" 
                className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400"
              >
                Explore Video Library
              </Link>
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="modal modal-open">
            <div className="modal-box max-w-4xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-memorial-dark">{selectedVideo.title}</h3>
                <button 
                  className="btn btn-sm btn-circle"
                  onClick={() => setSelectedVideo(null)}
                >
                  ✕
                </button>
              </div>
              
              {/* Video Player Placeholder */}
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-memorial-gold/20 to-memorial-dark/10 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-gray-600">Video Player: {selectedVideo.title}</p>
                  <p className="text-gray-500 text-sm mt-2">YouTube ID: {selectedVideo.youtubeId}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Duration: {selectedVideo.duration}</span>
                <span>Views: {selectedVideo.views}</span>
                <span>Uploaded: {new Date(selectedVideo.uploadDate).toLocaleDateString()}</span>
              </div>

              <p className="text-gray-700 mt-4">{selectedVideo.description}</p>

              <div className="modal-action">
                <button 
                  className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400"
                  onClick={() => setSelectedVideo(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Additional Features for Full Page */}
        {!preview && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-memorial-dark mb-4">Video Legacy</h3>
              <p className="text-gray-700 mb-4">
                Betty's videos continue to inspire millions worldwide. From intimate worship sessions 
                to stadium-filling performances, each video captures a unique aspect of her ministry 
                and God-given talent.
              </p>
              <div className="flex gap-2 flex-wrap">
                <div className="badge badge-lg bg-memorial-gold text-memorial-dark">Worship</div>
                <div className="badge badge-lg bg-memorial-dark text-white">Ministry</div>
                <div className="badge badge-lg bg-memorial-gold text-memorial-dark">Testimony</div>
                <div className="badge badge-lg bg-memorial-dark text-white">Legacy</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-memorial-dark mb-4">Share Her Ministry</h3>
              <p className="text-gray-700 mb-4">
                Help spread Betty's message of hope and faith by sharing these videos with others 
                who might be blessed by her ministry.
              </p>
              <div className="flex gap-2">
                <button className="btn btn-outline border-memorial-gold text-memorial-gold hover:bg-memorial-gold hover:text-white">
                  Share Playlist
                </button>
                <button className="btn btn-outline border-memorial-dark text-memorial-dark hover:bg-memorial-dark hover:text-white">
                  Download All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
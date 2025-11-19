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
    youtubeId: "meB2XEwUUE8"
  },
  {
    id: 2,
    title: "Betty Bayo - Mungu Ni Mwamba (Official Video)",
    type: "performance",
    description: "Powerful worship song 'Mungu Ni Mwamba' that has become an anthem of faith for many believers across the world.",
    duration: "5:24",
    views: "8.7M",
    uploadDate: "2021-08-20",
    thumbnail: "/images/videos/mungu-ni-mwamba.jpg",
    youtubeId: "suWVHCX3Rto"
  },
  {
    id: 3,
    title: "Betty Bayo - Nipe Milele (Official Video)",
    type: "performance",
    description: "Beautiful worship song 'Nipe Milele' expressing deep devotion and commitment to God's eternal love.",
    duration: "4:15",
    views: "6.3M",
    uploadDate: "2022-05-10",
    thumbnail: "/images/videos/nipe-milele.jpg",
    youtubeId: "k0m2js3SwFI"
  },
  {
    id: 4,
    title: "Betty Bayo - Tena Tena (Official Video)",
    type: "performance",
    description: "The uplifting song 'Tena Tena' that encourages believers to continually praise God in every situation.",
    duration: "4:48",
    views: "7.2M",
    uploadDate: "2021-11-20",
    thumbnail: "/images/videos/tena-tena.jpg",
    youtubeId: "bhdhwRaoJTA"
  },
  {
    id: 5,
    title: "Betty Bayo - Mwamba Imara (Live Performance)",
    type: "performance",
    description: "Live performance of 'Mwamba Imara' showcasing Betty's powerful vocals and heartfelt worship.",
    duration: "6:15",
    views: "9.1M",
    uploadDate: "2022-03-05",
    thumbnail: "/images/videos/mwamba-imara.jpg",
    youtubeId: "T6P0wNiTwVA"
  },
  {
    id: 6,
    title: "Betty Bayo - Nimekutana Na Yesu (Official Video)",
    type: "performance",
    description: "Testimony song 'Nimekutana Na Yesu' celebrating the life-changing encounter with Jesus Christ.",
    duration: "5:37",
    views: "5.8M",
    uploadDate: "2020-09-12",
    thumbnail: "/images/videos/nimekutana.jpg",
    youtubeId: "XQwrvuQdBAE"
  },
  {
    id: 7,
    title: "Betty Bayo - Usinisahau (Official Video)",
    type: "performance",
    description: "Heartfelt prayer song 'Usinisahau' expressing dependence on God's constant remembrance and care.",
    duration: "4:52",
    views: "4.9M",
    uploadDate: "2023-01-15",
    thumbnail: "/images/videos/usinisahau.jpg",
    youtubeId: "dcPIXLG_esg"
  },
  {
    id: 8,
    title: "Betty Bayo - Mola Wangu (Official Video)",
    type: "performance",
    description: "Worship song 'Mola Wangu' dedicated to praising God as the sovereign Lord and master.",
    duration: "5:18",
    views: "6.7M",
    uploadDate: "2021-06-28",
    thumbnail: "/images/videos/mola-wangu.jpg",
    youtubeId: "9YrceVSNYvQ"
  },
  {
    id: 9,
    title: "Betty Bayo - Nimechagua Bwana (Official Video)",
    type: "performance",
    description: "Powerful declaration song 'Nimechagua Bwana' expressing the choice to follow Jesus no matter the cost.",
    duration: "5:42",
    views: "4.3M",
    uploadDate: "2022-07-15",
    thumbnail: "/images/videos/nimechagua-bwana.jpg",
    youtubeId: "6_lh5kBne_Y"
  },
  {
    id: 10,
    title: "Betty Bayo - Mola Wangu (Live Worship)",
    type: "performance",
    description: "Live worship session of 'Mola Wangu' featuring heartfelt worship and congregation participation.",
    duration: "6:18",
    views: "3.9M",
    uploadDate: "2021-09-22",
    thumbnail: "/images/videos/mola-wangu-live.jpg",
    youtubeId: "vMO53sjibUc"
  },
  {
    id: 11,
    title: "Betty Bayo - Nipe Milele (Acoustic Version)",
    type: "performance",
    description: "Intimate acoustic version of 'Nipe Milele' showcasing Betty's raw vocal talent and emotional delivery.",
    duration: "4:35",
    views: "2.8M",
    uploadDate: "2023-03-10",
    thumbnail: "/images/videos/nipe-milele-acoustic.jpg",
    youtubeId: "WD3zXdgZK0Q"
  },
  {
    id: 12,
    title: "Betty Bayo - Tena Tena (Live Performance)",
    type: "performance",
    description: "Energetic live performance of 'Tena Tena' with full band and backup singers creating a powerful worship atmosphere.",
    duration: "5:12",
    views: "5.1M",
    uploadDate: "2022-11-08",
    thumbnail: "/images/videos/tena-tena-live.jpg",
    youtubeId: "T7WNX3SxS7Q"
  },
  {
    id: 13,
    title: "Betty Bayo - Mungu Ni Mwamba (Acoustic Session)",
    type: "performance",
    description: "Stripped-down acoustic session of 'Mungu Ni Mwamba' highlighting the song's powerful lyrics and message.",
    duration: "4:58",
    views: "3.2M",
    uploadDate: "2023-06-20",
    thumbnail: "/images/videos/mungu-ni-mwamba-acoustic.jpg",
    youtubeId: "k1k_4pvvrLA"
  },
  {
    id: 14,
    title: "Betty Bayo - Usinisahau (Live Recording)",
    type: "performance",
    description: "Live recording of 'Usinisahau' capturing the spontaneous worship and anointing in the studio.",
    duration: "5:25",
    views: "2.7M",
    uploadDate: "2023-08-14",
    thumbnail: "/images/videos/usinisahau-live.jpg",
    youtubeId: "jDUz5JrEsmE"
  },
  {
    id: 15,
    title: "Betty Bayo - 11th Hour (Live Version)",
    type: "performance",
    description: "Special live version of '11th Hour' with extended worship and prophetic ministration.",
    duration: "7:35",
    views: "6.8M",
    uploadDate: "2021-12-03",
    thumbnail: "/images/videos/11th-hour-live.jpg",
    youtubeId: "07SlyEZRP-0"
  },
  {
    id: 16,
    title: "Betty Bayo - Mwamba Imara (Official Video)",
    type: "performance",
    description: "Official music video for 'Mwamba Imara' featuring powerful visuals that complement the song's message of God being our solid rock.",
    duration: "5:52",
    views: "7.4M",
    uploadDate: "2022-04-18",
    thumbnail: "/images/videos/mwamba-imara-official.jpg",
    youtubeId: "6KY-avouTYU"
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

  const getYouTubeThumbnail = (youtubeId: string): string => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }

  const getYouTubeEmbedUrl = (youtubeId: string): string => {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`
  }

  return (
    <section id="videos" className="section-padding bg-memorial-light">
      <div className="max-w-7xl mx-auto">
        {/* Header with See More Button */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
          <div>
            <h2 className="section-title text-left mb-2">Her Voice, Her Legacy</h2>
            <p className="text-gray-600 text-lg max-w-3xl">
              Experience Betty's ministry through {videos.length}+ powerful videos - from iconic performances to heartfelt worship
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
              <div className="text-2xl font-bold text-memorial-gold">85M+</div>
              <div className="text-gray-600 text-sm">Total Views</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-memorial-gold">4</div>
              <div className="text-gray-600 text-sm">Categories</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-memorial-gold">2020-2024</div>
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
                  {/* YouTube Thumbnail Background */}
                  <img 
                    src={getYouTubeThumbnail(video.youtubeId)} 
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if YouTube thumbnail fails
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  
                  {/* Fallback if thumbnail doesn't load */}
                  <div className="text-center p-4 absolute">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🎬</div>
                    <span className="text-white text-sm font-medium drop-shadow-lg">{video.title}</span>
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
            <div className="modal-box max-w-4xl w-full p-0">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-bold text-memorial-dark">{selectedVideo.title}</h3>
                <button 
                  className="btn btn-sm btn-circle"
                  onClick={() => setSelectedVideo(null)}
                >
                  ✕
                </button>
              </div>
              
              {/* Actual YouTube Video Player */}
              <div className="w-full aspect-video">
                <iframe
                  src={getYouTubeEmbedUrl(selectedVideo.youtubeId)}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>Duration: {selectedVideo.duration}</span>
                  <span>Views: {selectedVideo.views}</span>
                  <span>Uploaded: {new Date(selectedVideo.uploadDate).toLocaleDateString()}</span>
                </div>

                <p className="text-gray-700">{selectedVideo.description}</p>

                <div className="modal-action mt-4">
                  <button 
                    className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400"
                    onClick={() => setSelectedVideo(null)}
                  >
                    Close
                  </button>
                </div>
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
                to powerful music videos, each video captures a unique aspect of her ministry 
                and God-given talent. Her songs like "11th Hour" and "Mungu Ni Mwamba" have become 
                worship anthems across the globe.
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
                who might be blessed by her ministry. Each song carries a powerful message of God's love.
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
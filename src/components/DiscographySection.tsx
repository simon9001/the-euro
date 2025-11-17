// src/components/DiscographySection.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { type Album } from '../types'

// Sample data - in real app, this would come from JSON file
const discographyData: { albums: Album[] } = {
  albums: [
    {
      id: 1,
      title: "11th Hour",
      year: 2020,
      cover: "/images/albums/11th-hour.jpg",
      songs: ["11th Hour", "Mungu Mwenye Nguvu", "Yesu Ni Bwana", "Nimekosa", "Tawala", "Usinisahau", "Neema Yako", "Shukrani"],
      description: "The breakthrough album that established Betty Bayo as a gospel music powerhouse. This album features her iconic hit '11th Hour' that touched millions of hearts across Kenya and beyond."
    },
    {
      id: 2,
      title: "Mwamba Imara",
      year: 2022,
      cover: "/images/albums/mwamba-imara.jpg",
      songs: ["Mwamba Imara", "Nimetimiza Ahadi", "Uwezo Wako", "Shukurani", "Mkombozi", "Neema Yako", "Baraka Zako", "Aminifu"],
      description: "A collection of powerful worship songs celebrating God's faithfulness. This album showcases Betty's spiritual growth and her ability to connect with worshippers through heartfelt lyrics."
    },
    {
      id: 3,
      title: "Tena Tena",
      year: 2023,
      cover: "/images/albums/tena-tena.jpg",
      songs: ["Tena Tena", "Moyo Wangu", "Baraka Zako", "Ameniokoa", "Yesu Wetu", "Nimepata Pendo", "Uwezo Tu Wako", "Mungu wa Ahadi"],
      description: "Her final studio album, filled with messages of hope and redemption. Recorded during her health journey, this album reflects her unwavering faith and trust in God's plan."
    },
    {
      id: 4,
      title: "Early Worship",
      year: 2018,
      cover: "/images/albums/early-worship.jpg",
      songs: ["Tobina", "Shinda", "Moyo Wangu", "Bwana Asifiwe", "Nipe Uwezo", "Usiniache", "Mapenzi Yako"],
      description: "Her debut album that introduced her unique voice to the gospel music scene. Features early worship songs that laid the foundation for her musical ministry."
    },
    {
      id: 5,
      title: "Live in Concert",
      year: 2021,
      cover: "/images/albums/live-concert.jpg",
      songs: ["11th Hour (Live)", "Mwamba Imara (Live)", "Nimetimiza Ahadi (Live)", "Tena Tena (Live)", "Moyo Wangu (Live)"],
      description: "A powerful live recording capturing Betty's incredible stage presence and connection with her audience during her peak performance years."
    },
    {
      id: 6,
      title: "Heaven's Melody",
      year: 2022,
      cover: "/images/albums/heavens-melody.jpg",
      songs: ["Sifa", "Utukufu", "Wa Milele", "Bwana Yesu", "Upendo Wako", "Neema", "Amina"],
      description: "A collaborative album featuring duets with other gospel artists, showcasing her versatility and ability to blend her voice with others in worship."
    }
  ]
}

interface DiscographySectionProps {
  preview?: boolean;
}

export default function DiscographySection({ preview = false }: DiscographySectionProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [visibleAlbums, setVisibleAlbums] = useState<Album[]>([])

  useEffect(() => {
    if (discographyData.albums.length > 0) {
      setSelectedAlbum(discographyData.albums[0])
      // Show only 3 albums in preview mode, all albums in full mode
      setVisibleAlbums(preview ? discographyData.albums.slice(0, 3) : discographyData.albums)
    }
  }, [preview])

  return (
    <section id="music" className="section-padding bg-memorial-light">
      <div className="max-w-6xl mx-auto">
        {/* Header with See More Button */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="section-title mb-0">Her Musical Legacy</h2>
          {preview && (
            <Link 
              to="/music" 
              className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400"
            >
              View All Music
            </Link>
          )}
        </div>
        
        {/* Album Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleAlbums.map((album) => (
            <div
              key={album.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedAlbum(album)}
            >
              <figure className="px-6 pt-6">
                <div className="w-full h-48 bg-gradient-to-br from-memorial-gold/20 to-memorial-dark/10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎵</div>
                    <span className="text-gray-600 text-sm">{album.title}</span>
                  </div>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-memorial-dark justify-between">
                  {album.title}
                  <span className="text-memorial-gold text-sm font-normal">{album.year}</span>
                </h3>
                <p className="text-gray-600 line-clamp-2 text-sm">
                  {preview 
                    ? `${album.description.substring(0, 100)}...`
                    : album.description
                  }
                </p>
                <div className="card-actions justify-between items-center mt-2">
                  <span className="text-gray-500 text-sm">
                    {album.songs.length} songs
                  </span>
                  <button className="btn btn-sm bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400">
                    Listen
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show "Load More" indicator in preview mode if there are more albums */}
        {preview && discographyData.albums.length > 3 && (
          <div className="text-center mb-12">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <p className="text-gray-600 mb-4">
                And {discographyData.albums.length - 3} more albums in her incredible discography
              </p>
              <Link 
                to="/music" 
                className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400"
              >
                Explore Full Discography
              </Link>
            </div>
          </div>
        )}

        {/* Selected Album Details */}
        {selectedAlbum && (
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-6 items-start mb-6">
              <div className="lg:w-1/3">
                <div className="w-full h-64 bg-gradient-to-br from-memorial-gold/20 to-memorial-dark/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎵</div>
                    <h3 className="text-xl font-bold text-memorial-dark">{selectedAlbum.title}</h3>
                    <p className="text-memorial-gold">{selectedAlbum.year}</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3">
                <h3 className="text-2xl font-bold text-memorial-dark mb-4">
                  {selectedAlbum.title} - Album Details
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {selectedAlbum.description}
                </p>
                <div className="flex gap-4 mb-4">
                  <div className="badge badge-lg bg-memorial-gold text-memorial-dark">
                    {selectedAlbum.songs.length} Songs
                  </div>
                  <div className="badge badge-lg bg-memorial-dark text-white">
                    {selectedAlbum.year}
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-memorial-dark mb-4">Tracklist</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedAlbum.songs.map((song, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-memorial-light hover:bg-memorial-gray transition-colors group"
                >
                  <div className="w-10 h-10 bg-memorial-gold rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <span className="text-memorial-dark font-medium block">{song}</span>
                    <span className="text-gray-500 text-sm">Album: {selectedAlbum.title}</span>
                  </div>
                  <button className="btn btn-sm btn-ghost text-memorial-gold hover:bg-memorial-gold hover:text-white">
                    Play
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Features for Full Page */}
        {!preview && (
          <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-memorial-dark mb-4">Musical Journey</h3>
                <p className="text-gray-700 mb-4">
                  Betty Bayo's discography spans over 5 years of inspirational gospel music. 
                  From her debut in 2018 to her final album in 2023, each release marked a 
                  significant milestone in her spiritual and musical journey.
                </p>
                <div className="stats shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Total Albums</div>
                    <div className="stat-value text-memorial-gold">{discographyData.albums.length}</div>
                    <div className="stat-desc">2018 - 2023</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-memorial-dark mb-4">Legacy & Impact</h3>
                <p className="text-gray-700 mb-4">
                  Her music continues to inspire millions worldwide. Each album carries 
                  messages of hope, faith, and God's unwavering love, creating a lasting 
                  legacy that transcends generations.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="badge badge-lg bg-memorial-gold text-memorial-dark">Inspirational</div>
                  <div className="badge badge-lg bg-memorial-dark text-white">Worship</div>
                  <div className="badge badge-lg bg-memorial-gold text-memorial-dark">Hope</div>
                  <div className="badge badge-lg bg-memorial-dark text-white">Faith</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
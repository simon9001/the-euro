// src/components/LifeStorySection.tsx
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { type Chapter } from '../types'

const chapters: Chapter[] = [
  {
    title: "Early Life in Kiambu",
    content: "Betty Bayo was born on March 15, 1985, in the lush green highlands of Kiambu County. From her earliest days, music flowed through her veins. Growing up in a devout Christian family, she joined the church choir at just 7 years old, where her extraordinary vocal talent first emerged. Her childhood was filled with the sounds of traditional hymns and the rhythms of Kenyan worship, shaping her unique musical identity. Despite humble beginnings, Betty's passion for music and faith created the foundation for her future ministry.",
    image: "/images/early-life.jpg",
    year: "1985-2000",
    quote: "\"Even as a child, her voice carried something heavenly\" - Pastor Kamau"
  },
  {
    title: "Her Music Calling",
    content: "At age 18, Betty experienced a profound spiritual awakening during a church revival. She felt a clear divine calling to use her musical gift for evangelism. Initially hesitant about pursuing music professionally, she spent years praying and seeking guidance. In 2005, she made the life-changing decision to fully dedicate her talent to gospel ministry. She began writing her own worship songs, blending Scripture with personal testimonies. Her early performances in local churches quickly gained attention, with congregations moved to tears by her powerful delivery and genuine spirit.",
    image: "/images/calling.jpg",
    year: "2003-2008",
    quote: "\"I'm not just singing songs - I'm delivering God's message through melody\" - Betty Bayo"
  },
  {
    title: "The Rise of '11th Hour'",
    content: "2019 marked the turning point in Betty's career with the release of '11th Hour.' Written during a period of personal struggle, the song's message about God's perfect timing resonated deeply across Kenya. Within months, it became an anthem in churches, radio stations, and homes nationwide. The song's viral success wasn't just about musical talent - it was the raw authenticity of her faith that connected with millions. '11th Hour' earned her multiple awards and established her as a leading voice in African gospel music, opening doors for international ministry opportunities.",
    image: "/images/11th-hour.jpg",
    year: "2019-2020",
    quote: "\"When everything seems late, God is right on time\" - from '11th Hour' lyrics"
  },
  {
    title: "Musical Legacy & Impact",
    content: "Betty revolutionized Kenyan gospel by creating a sound that bridged generations. She masterfully blended traditional African rhythms with contemporary worship, making gospel music accessible to youth while maintaining its spiritual depth. Her albums consistently topped charts, but her impact went beyond numbers. She mentored young artists, supported church music programs, and used her platform to address social issues. Her 'Worship Revolution' concerts drew thousands, creating spaces where people from all backgrounds could experience transformative worship together.",
    image: "/images/impact.jpg",
    year: "2020-2022",
    quote: "\"She made worship cool for our generation\" - Young fan testimonial"
  },
  {
    title: "Personal Life & Motherhood",
    content: "Behind the spotlight, Betty was a devoted mother to her two children, Grace and David. She often spoke about balancing ministry with motherhood, considering her children her greatest blessing. Her home was filled with music, prayer, and laughter. Friends describe her as incredibly generous - always making time for others despite her busy schedule. She founded the 'Bayo Family Foundation' to support single mothers and orphans, demonstrating her commitment to living out her faith through practical love and service.",
    image: "/images/personal.jpg",
    year: "2015-2023",
    quote: "\"My children are my first ministry\" - Betty to close friends"
  },
  {
    title: "Courageous Health Journey",
    content: "In early 2023, Betty was diagnosed with leukemia. Rather than retreating from public life, she chose to share her journey transparently, turning her health struggle into a powerful testimony of faith. Through chemotherapy and treatment, she continued to minister, often recording from her hospital bed. Her social media updates became sources of encouragement for thousands facing similar battles. Her unwavering trust in God during this challenging season inspired a nationwide prayer movement and deepened the impact of her ministry beyond what she could have imagined.",
    image: "/images/health-journey.jpg",
    year: "2023",
    quote: "\"Whether I live or die, I belong to Jesus\" - Betty's final public message"
  },
  {
    title: "Eternal Legacy",
    content: "Betty's passing in January 2024 left a void in the gospel music world, but her legacy continues to flourish. Her music still plays in churches across Africa, her foundation continues its work, and her testimony inspires new generations. She demonstrated that true ministry isn't about fame or success, but about authentic relationship with God and genuine love for people. Her life verse, Psalm 115:1 - 'Not to us, Lord, not to us but to your name be the glory' - perfectly captures the heart of her ministry and the eternal impact she leaves behind.",
    image: "/images/legacy.jpg",
    year: "2024 & Beyond",
    quote: "\"Well done, good and faithful servant\" - Matthew 25:23"
  }
]

interface LifeStorySectionProps {
  preview?: boolean;
}

export default function LifeStorySection({ preview = false }: LifeStorySectionProps) {
  const [activeChapter, setActiveChapter] = useState<number>(0)
  const sectionRef = useRef<HTMLElement>(null)

  const visibleChapters = preview ? chapters.slice(0, 4) : chapters

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.chapter-item')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="story" ref={sectionRef} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header with See More Button */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
          <div>
            <h2 className="section-title text-left mb-2">Her Inspiring Journey</h2>
            <p className="text-gray-600 text-lg max-w-3xl">
              From humble beginnings in Kiambu to touching millions worldwide - explore the remarkable life of Betty Bayo
            </p>
          </div>
          {preview && (
            <Link 
              to="/story" 
              className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400 lg:self-center"
            >
              Read Full Story
            </Link>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Chapter Navigation */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="sticky top-24 space-y-2 bg-memorial-light rounded-xl p-4">
              <h3 className="font-bold text-memorial-dark mb-4 text-lg">Chapters of Her Life</h3>
              {visibleChapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => setActiveChapter(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all group ${
                    activeChapter === index
                      ? 'bg-memorial-gold text-memorial-dark shadow-md transform scale-105'
                      : 'bg-white text-memorial-dark hover:bg-memorial-gold/20 hover:shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm group-hover:text-memorial-dark">
                      {chapter.title}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      activeChapter === index 
                        ? 'bg-memorial-dark text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {chapter.year}
                    </span>
                  </div>
                </button>
              ))}
              
              {/* Show remaining chapters count in preview */}
              {preview && chapters.length > 4 && (
                <div className="text-center mt-4 pt-4 border-t border-gray-200">
                  <Link to="/story" className="text-memorial-gold font-semibold hover:underline">
                    + {chapters.length - 4} more chapters of her incredible journey
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Chapter Content */}
          <div className="lg:w-2/3 xl:w-3/4">
            <div className="chapter-item bg-gradient-to-br from-white to-memorial-light/30 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-2/3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                    <h3 className="text-2xl md:text-4xl font-bold text-memorial-dark">
                      {chapters[activeChapter].title}
                    </h3>
                    <span className="bg-memorial-gold text-memorial-dark px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                      {chapters[activeChapter].year}
                    </span>
                  </div>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {preview && activeChapter >= 3 
                      ? `${chapters[activeChapter].content.substring(0, 300)}...`
                      : chapters[activeChapter].content
                    }
                  </p>

                  {preview && activeChapter >= 3 && (
                    <Link 
                      to="/story" 
                      className="inline-flex items-center gap-2 text-memorial-gold font-semibold hover:underline mb-6"
                    >
                      Continue reading this chapter →
                    </Link>
                  )}

                  {/* Quote Section */}
                  <div className="bg-memorial-gold/10 border-l-4 border-memorial-gold pl-4 py-3 rounded-r-lg">
                    <p className="text-gray-700 italic text-sm">
                      "{chapters[activeChapter].quote}"
                    </p>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
                      disabled={activeChapter === 0}
                      className="btn btn-outline border-memorial-gold text-memorial-gold hover:bg-memorial-gold hover:text-white disabled:opacity-50"
                    >
                      ← Previous
                    </button>
                    
                    <div className="flex items-center gap-2">
                      {visibleChapters.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveChapter(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            activeChapter === index
                              ? 'bg-memorial-gold'
                              : 'bg-gray-300 hover:bg-memorial-gold/50'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveChapter(Math.min(visibleChapters.length - 1, activeChapter + 1))}
                      disabled={activeChapter === visibleChapters.length - 1}
                      className="btn btn-outline border-memorial-gold text-memorial-gold hover:bg-memorial-gold hover:text-white disabled:opacity-50"
                    >
                      Next →
                    </button>
                  </div>
                </div>
                
                <div className="lg:w-1/3">
                  <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-memorial-gold/20 to-memorial-dark/10 rounded-xl flex items-center justify-center shadow-inner">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-4">📖</div>
                      <span className="text-gray-600 font-medium">{chapters[activeChapter].title}</span>
                      <p className="text-gray-500 text-sm mt-2">Chapter {activeChapter + 1} of {chapters.length}</p>
                    </div>
                  </div>
                  
                  {/* Quick Facts */}
                  <div className="mt-4 bg-white rounded-lg p-4 shadow-sm border">
                    <h4 className="font-semibold text-memorial-dark mb-2">Quick Facts</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {chapters[activeChapter].year}</li>
                      <li>• Chapter {activeChapter + 1}</li>
                      <li>• {Math.ceil(chapters[activeChapter].content.length / 100)} min read</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Content for Full Page */}
            {!preview && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-memorial-light rounded-xl p-6">
                  <h4 className="font-bold text-memorial-dark mb-3">Legacy Impact</h4>
                  <p className="text-gray-700 text-sm">
                    This chapter of Betty's life continues to inspire new generations of worshippers 
                    and musicians across Africa and beyond.
                  </p>
                </div>
                <div className="bg-memorial-light rounded-xl p-6">
                  <h4 className="font-bold text-memorial-dark mb-3">Share Her Story</h4>
                  <p className="text-gray-700 text-sm">
                    Help keep Betty's legacy alive by sharing this chapter with others who might be inspired by her journey.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action for Preview Mode */}
        {preview && (
          <div className="text-center mt-12 bg-gradient-to-r from-memorial-gold/10 to-memorial-dark/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-memorial-dark mb-4">
              Discover the Complete Story
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Betty's full journey includes {chapters.length} detailed chapters covering her spiritual growth, 
              musical evolution, personal struggles, and eternal legacy.
            </p>
            <Link 
              to="/story" 
              className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400 text-lg px-8"
            >
              Read the Complete Biography
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
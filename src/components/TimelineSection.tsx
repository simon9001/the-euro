// src/components/TimelineSection.tsx
import { Link } from 'react-router'
import { type TimelineEvent } from '../types'

const timelineEvents: TimelineEvent[] = [
  {
    date: "March 15, 1985",
    title: "A Star is Born",
    description: "Betty Bayo was born in Kiambu County, Kenya. From her first cry, her family knew she was special. Growing up in a musical family, she was surrounded by worship and praise from infancy.",
    type: "birth",
    icon: "👶",
    significance: "The beginning of a divine journey"
  },
  {
    date: "1992",
    title: "First Solo in Church",
    description: "At just 7 years old, Betty sang her first solo in the church choir. Her powerful voice even at that young age moved the congregation to tears and marked the start of her musical ministry.",
    type: "milestone",
    icon: "🎤",
    significance: "Early recognition of her divine gift"
  },
  {
    date: "2003",
    title: "Divine Calling",
    description: "During a church revival, Betty received a clear calling from God to use her voice for ministry. She dedicated her life to gospel music, turning down secular music opportunities.",
    type: "spiritual",
    icon: "🙏",
    significance: "Confirmed her life's purpose"
  },
  {
    date: "2008-2018",
    title: "Ministry Foundation",
    description: "Years of serving in local churches, writing worship songs, and developing her unique sound. She ministered in small gatherings while working regular jobs to support herself.",
    type: "development",
    icon: "⛪",
    significance: "Built the foundation for her future impact"
  },
  {
    date: "June 2019",
    title: "'11th Hour' Release",
    description: "Released her breakthrough single '11th Hour.' The song became an instant gospel anthem across Kenya, transforming her from local minister to national gospel icon.",
    type: "breakthrough",
    icon: "⭐",
    significance: "National recognition and impact"
  },
  {
    date: "2020",
    title: "Award Recognition",
    description: "Won multiple gospel music awards including 'Best Gospel Artist' and 'Song of the Year.' Used her platform to mentor young artists and support church music programs.",
    type: "achievement",
    icon: "🏆",
    significance: "Industry recognition of her talent"
  },
  {
    date: "2021-2022",
    title: "International Ministry",
    description: "Expanded her ministry beyond Kenya, performing in Tanzania, Uganda, and the UK. Her music touched African diaspora communities worldwide while maintaining her humble spirit.",
    type: "expansion",
    icon: "🌍",
    significance: "Global impact and reach"
  },
  {
    date: "Early 2023",
    title: "Health Challenges Begin",
    description: "Started experiencing fatigue and health issues. Initially thought to be exhaustion from her busy ministry schedule, she continued performing while seeking medical advice.",
    type: "health",
    icon: "😔",
    significance: "Beginning of her health journey"
  },
  {
    date: "June 2023",
    title: "Leukemia Diagnosis",
    description: "Officially diagnosed with acute leukemia. Betty chose to share her diagnosis publicly, turning her health battle into a powerful testimony of faith for her followers.",
    type: "medical",
    icon: "🎗️",
    significance: "Public sharing of her health struggle"
  },
  {
    date: "July 2023",
    title: "Treatment Journey Begins",
    description: "Started intensive chemotherapy while continuing to minister through social media. Her updates from hospital became sources of inspiration for thousands facing similar battles.",
    type: "medical",
    icon: "💊",
    significance: "Courageous public faith journey"
  },
  {
    date: "September 2023",
    title: "National Prayer Movement",
    description: "Fans, fellow artists, and churches across Kenya organized nationwide prayer vigils. #PrayForBettyBayo trended on social media, showing the massive impact of her ministry.",
    type: "support",
    icon: "🤲",
    significance: "Unprecedented public support"
  },
  {
    date: "December 10, 2023",
    title: "Final Public Message",
    description: "Shared her final public video message from hospital: 'Whether I live or die, I belong to Jesus. My healing is in His hands.' The message went viral across Africa.",
    type: "public",
    icon: "📱",
    significance: "Final powerful testimony"
  },
  {
    date: "January 15, 2024",
    title: "Peaceful Transition",
    description: "Betty passed away peacefully surrounded by family, close friends, and pastoral care. She was singing worship songs until her final moments, true to her calling until the end.",
    type: "announcement",
    icon: "🕊️",
    significance: "Her heavenly transition"
  },
  {
    date: "January 20, 2024",
    title: "National Memorial",
    description: "Thousands attended her memorial service, broadcast nationally. Fellow gospel artists performed her songs in tribute, celebrating her life and eternal impact.",
    type: "legacy",
    icon: "🎵",
    significance: "National celebration of her life"
  },
  {
    date: "2024 & Beyond",
    title: "Eternal Legacy",
    description: "Her music continues to inspire millions, her foundation supports upcoming artists, and her testimony of faith remains a beacon of hope for generations to come.",
    type: "legacy",
    icon: "✨",
    significance: "Living legacy continues"
  }
]

interface TimelineSectionProps {
  preview?: boolean;
}

export default function TimelineSection({ preview = false }: TimelineSectionProps) {
  const visibleEvents = preview ? timelineEvents.filter(event => 
    event.type === 'breakthrough' || 
    event.type === 'medical' || 
    event.type === 'support' || 
    event.type === 'announcement' ||
    event.type === 'legacy'
  ).slice(0, 6) : timelineEvents

  const getTypeColor = (type: string): string => {
    const colors = {
      birth: 'bg-pink-500',
      milestone: 'bg-blue-500',
      spiritual: 'bg-purple-500',
      development: 'bg-indigo-500',
      breakthrough: 'bg-green-500',
      achievement: 'bg-yellow-500',
      expansion: 'bg-teal-500',
      health: 'bg-orange-500',
      medical: 'bg-red-500',
      support: 'bg-blue-500',
      public: 'bg-green-500',
      announcement: 'bg-purple-500',
      legacy: 'bg-memorial-gold'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-500'
  }

  const getTypeLabel = (type: string): string => {
    const labels = {
      birth: 'Birth',
      milestone: 'Milestone',
      spiritual: 'Spiritual',
      development: 'Development',
      breakthrough: 'Breakthrough',
      achievement: 'Achievement',
      expansion: 'Expansion',
      health: 'Health',
      medical: 'Medical',
      support: 'Support',
      public: 'Public',
      announcement: 'Announcement',
      legacy: 'Legacy'
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <section id="timeline" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header with See More Button */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
          <div>
            <h2 className="section-title text-left mb-2">Journey of Faith & Legacy</h2>
            <p className="text-gray-600 text-lg max-w-3xl">
              From birth to eternal legacy - follow Betty's remarkable journey through {timelineEvents.length} significant moments
            </p>
          </div>
          {preview && (
            <Link 
              to="/timeline" 
              className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400 lg:self-center"
            >
              View Full Timeline
            </Link>
          )}
        </div>

        {/* Timeline Statistics */}
        {!preview && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-memorial-light rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-memorial-gold">{timelineEvents.length}</div>
              <div className="text-gray-600 text-sm">Key Moments</div>
            </div>
            <div className="bg-memorial-light rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-memorial-gold">39</div>
              <div className="text-gray-600 text-sm">Years of Life</div>
            </div>
            <div className="bg-memorial-light rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-memorial-gold">15+</div>
              <div className="text-gray-600 text-sm">Years in Ministry</div>
            </div>
            <div className="bg-memorial-light rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-memorial-gold">Millions</div>
              <div className="text-gray-600 text-sm">Lives Touched</div>
            </div>
          </div>
        )}

        <div className="timeline relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-memorial-gold via-memorial-dark to-memorial-gold transform -translate-x-1/2 hidden md:block"></div>
          
          {visibleEvents.map((event, index) => (
            <div key={index} className={`timeline-item mb-8 animate-fade-in ${
              index % 2 === 0 ? 'md:pr-8 md:pl-0' : 'md:pl-8 md:pr-0'
            }`}>
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Left side for even, right side for odd */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:order-1' : 'md:text-left md:order-2'}`}>
                  <div className={`card bg-base-100 shadow-lg hover:shadow-xl transition-shadow ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                    <div className="card-body">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{event.icon}</div>
                          <h3 className="card-title text-memorial-dark text-lg">{event.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-memorial-gold font-semibold text-sm whitespace-nowrap">
                            {event.date}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        {preview && index >= 4 
                          ? `${event.description.substring(0, 120)}...`
                          : event.description
                        }
                      </p>

                      {preview && index >= 4 && (
                        <Link 
                          to="/timeline" 
                          className="inline-flex items-center gap-1 text-memorial-gold font-semibold hover:underline text-sm"
                        >
                          Read full story →
                        </Link>
                      )}

                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <span className={`badge badge-sm ${getTypeColor(event.type)} text-white`}>
                          {getTypeLabel(event.type)}
                        </span>
                        {event.significance && (
                          <span className="text-gray-500 text-xs text-right flex-1 ml-2">
                            {event.significance}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Marker - Center */}
                <div className="flex items-center justify-center md:absolute left-1/2 transform -translate-x-1/2 md:w-16 z-10 md:order-1">
                  <div className={`w-4 h-4 rounded-full ${getTypeColor(event.type)} ring-4 ring-white shadow-lg`}></div>
                </div>

                {/* Date on opposite side for desktop */}
                <div className={`flex-1 hidden md:block ${index % 2 === 0 ? 'md:text-left md:order-2' : 'md:text-right md:order-1'}`}>
                  <div className={`p-4 ${index % 2 === 0 ? 'ml-8' : 'mr-8'}`}>
                    <div className="text-lg font-semibold text-memorial-dark">{event.date}</div>
                    <div className="text-gray-500 text-sm mt-1">{getTypeLabel(event.type)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show remaining events count in preview */}
        {preview && timelineEvents.length > visibleEvents.length && (
          <div className="text-center mt-8">
            <div className="bg-memorial-light rounded-xl p-6">
              <p className="text-gray-600 mb-4">
                And {timelineEvents.length - visibleEvents.length} more significant moments in Betty's incredible journey
              </p>
              <Link 
                to="/timeline" 
                className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400"
              >
                Explore Complete Timeline
              </Link>
            </div>
          </div>
        )}

        {/* Additional Features for Full Page */}
        {!preview && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-memorial-gold/10 to-memorial-dark/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-memorial-dark mb-4">Timeline Highlights</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-gold rounded-full"></div>
                  <span>15 years of dedicated music ministry</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-gold rounded-full"></div>
                  <span>6 award-winning albums released</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-gold rounded-full"></div>
                  <span>International ministry across 3 continents</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-gold rounded-full"></div>
                  <span>Founded music education programs</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-memorial-dark/5 to-memorial-gold/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-memorial-dark mb-4">Share Her Journey</h3>
              <p className="text-gray-700 mb-4">
                Help inspire others by sharing Betty's timeline of faith, courage, and legacy.
              </p>
              <div className="flex gap-2">
                <button className="btn btn-outline border-memorial-gold text-memorial-gold hover:bg-memorial-gold hover:text-white btn-sm">
                  Share Timeline
                </button>
                <button className="btn btn-outline border-memorial-dark text-memorial-dark hover:bg-memorial-dark hover:text-white btn-sm">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .timeline-item:nth-child(odd) {
            flex-direction: row;
          }
          .timeline-item:nth-child(even) {
            flex-direction: row-reverse;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
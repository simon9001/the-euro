// src/components/HeroSection.tsx
import { useState, useEffect } from 'react'
import { type JSX } from 'react/jsx-runtime'

export default function HeroSection(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToStory = (): void => {
    document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/images/hero-bg.jpg)'
        }}
      />
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
            Betty Bayo
          </h1>
          <p className="text-xl md:text-2xl mb-6 animate-fade-in animation-delay-300">
            1985 - 2024
          </p>
          <p className="text-lg md:text-xl italic mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-500">
            "Her voice touched heaven, her music touched our souls. A gospel icon whose legacy will forever inspire generations."
          </p>
          <button 
            onClick={scrollToStory}
            className="btn btn-lg bg-memorial-gold text-memorial-dark hover:bg-yellow-400 border-none animate-slide-up animation-delay-700"
          >
            Enter Her Story
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}
// src/App.tsx
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import LifeStory from './pages/LifeStory'
import Discography from './pages/Discography'
import Tributes from './pages/Tributes'
import Gallery from './pages/Gallery'
import Timeline from './pages/Timeline'
import Videos from './pages/Videos'
import Memorial from './pages/Memorial.tsx';
import { type JSX } from 'react/jsx-runtime'

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-memorial-light">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-memorial-gold mb-4"></div>
          <p className="text-memorial-dark">Remembering Betty Bayo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-memorial-light">
      <Routes>
      <Route path="/memorial" element={<Memorial />} />
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<LifeStory />} />
        <Route path="/music" element={<Discography />} />
        <Route path="/tributes" element={<Tributes />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
    </div>
  )
}

export default App
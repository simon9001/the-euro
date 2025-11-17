// src/pages/Videos.tsx
import Navbar from '../components/Navbar'
import VideosSection from '../components/VideosSection'
import Footer from '../components/Footer'
import type { JSX } from 'react/jsx-runtime'

export default function Videos(): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <VideosSection preview={false} />
      </div>
      <Footer />
    </>
  )
}
// src/pages/Gallery.tsx
import Navbar from '../components/Navbar'
import GallerySection from '../components/GallerySection'
import Footer from '../components/Footer'
import type { JSX } from 'react/jsx-runtime'

export default function Gallery(): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <GallerySection preview={false} />
      </div>
      <Footer />
    </>
  )
}
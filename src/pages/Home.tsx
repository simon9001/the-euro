// src/pages/Home.tsx
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import LifeStorySection from '../components/LifeStorySection'
import DiscographySection from '../components/DiscographySection'
import TributeWallSection from '../components/TributeWallSection'
import GallerySection from '../components/GallerySection'
import TimelineSection from '../components/TimelineSection'
import VideosSection from '../components/VideosSection'
import DonationSection from '../components/DonationSection'
import Footer from '../components/Footer'
import type { JSX } from 'react/jsx-runtime'

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LifeStorySection preview={true} />
      <DiscographySection preview={true} />
      <TributeWallSection preview={true} />
      <GallerySection preview={true} />
      <TimelineSection preview={true} />
      <VideosSection preview={true} />
      <DonationSection />
      <Footer />
    </>
  )
}
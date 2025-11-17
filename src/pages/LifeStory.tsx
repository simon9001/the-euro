// src/pages/LifeStory.tsx
import Navbar from '../components/Navbar'
import LifeStorySection from '../components/LifeStorySection'
import Footer from '../components/Footer'
import type { JSX } from 'react/jsx-runtime'

export default function LifeStory(): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="pt-20"> {/* Add padding for fixed navbar */}
        <LifeStorySection preview={false} />
      </div>
      <Footer />
    </>
  )
}
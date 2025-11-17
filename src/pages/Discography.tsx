// src/pages/Discography.tsx
import Navbar from '../components/Navbar'
import DiscographySection from '../components/DiscographySection'
import Footer from '../components/Footer'
import type { JSX } from 'react/jsx-runtime'

export default function Discography(): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <DiscographySection preview={false} />
      </div>
      <Footer />
    </>
  )
}
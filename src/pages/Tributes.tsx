// src/pages/Tributes.tsx
import Navbar from '../components/Navbar'
import TributeWallSection from '../components/TributeWallSection'
import Footer from '../components/Footer'
import type { JSX } from 'react/jsx-runtime'

export default function Tributes(): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <TributeWallSection preview={false} />
      </div>
      <Footer />
    </>
  )
}
// src/pages/Timeline.tsx
import Navbar from '../components/Navbar'
import TimelineSection from '../components/TimelineSection'
import Footer from '../components/Footer'
import type { JSX } from 'react/jsx-runtime'

export default function Timeline(): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <TimelineSection preview={false} />
      </div>
      <Footer />
    </>
  )
}
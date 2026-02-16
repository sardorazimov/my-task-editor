import React from 'react'
import { HeroSections } from '../components/shared/hero-3d'
import { Footprints } from 'lucide-react'
import MagicFooter from '../components/shared/footer'
import CTASection from '../components/shared/feature-sections'

const page = () => {
  return (
    <div>
      <HeroSections />
       <CTASection />
      <MagicFooter/>
    </div>
  )
}

export default page
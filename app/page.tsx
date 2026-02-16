import React from 'react'
import { HeroSections } from '../components/shared/hero-3d'
import { Footprints } from 'lucide-react'
import MagicFooter from '../components/shared/footer'
import Testimonials from '../components/shared/testimonials'
import SmartUserCounter from '../components/shared/live-counter'


const page = () => {
  return (
    <div>
      <HeroSections />
       <Testimonials />
       
      <MagicFooter/>
    </div>
  )
}

export default page
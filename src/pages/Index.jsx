import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AnimatedSection from '../components/AnimatedSection'
import TrustBadges from './TrustBadges'

const Index = () => {
  return (
    <div className='min-h-screen'>
        <Navbar />
        <main>
            <Hero />
             <AnimatedSection>
          <TrustBadges />
        </AnimatedSection>
        </main>
    </div>
  )
}

export default Index
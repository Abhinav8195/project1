import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AnimatedSection from '../components/AnimatedSection'
import TrustBadges from './TrustBadges'
import Features from './Features'
import HowItWorks from './HowItWorks'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'


const Index = () => {
  return (
    <div className='min-h-screen'>
        <Navbar />
        <main>
            <Hero />
             
          <TrustBadges />
      
          
          <Features />
      
        <AnimatedSection>
          <HowItWorks />
        </AnimatedSection>
        <AnimatedSection>
          <Pricing />
        </AnimatedSection>
        <AnimatedSection>
          <Testimonials />
        </AnimatedSection>
        
          <FAQ />
        
        
          <CTA />
        
        </main>
        <Footer />
    </div>
  )
}

export default Index
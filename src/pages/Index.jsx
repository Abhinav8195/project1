import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Index = () => {
  return (
    <div className='min-h-screen'>
        <Navbar />
        <main>
            <Hero />
        </main>
    </div>
  )
}

export default Index
import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Showcase from './components/Showcase'
import Framework from './components/Framework'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-redlamp-darker">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Showcase />
      <Framework />
      <Footer />
    </div>
  )
}

export default App

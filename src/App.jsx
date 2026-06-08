import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Framework from './components/Framework'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-redlamp-darker">
      <Hero />
      <About />
      <Services />
      <Framework />
      <Footer />
    </div>
  )
}

export default App

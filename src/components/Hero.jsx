import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-redlamp-darker via-redlamp-dark to-redlamp-darker" />
      
      {/* Red lamp glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-redlamp-red/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-redlamp-orange/10 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/RedLamp-Website/Redlamp proto logo.png" 
            alt="REDLAMP Logo" 
            className="w-48 h-48 mx-auto mb-8 object-contain mix-blend-screen"
          />
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-redlamp-red">RED</span>LAMP
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-redlamp-light/80 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Creative Incubator • Digital Media Engine • Social Enterprise
        </motion.p>
        
        <motion.p 
          className="text-lg text-redlamp-light/60 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A dedicated launchpad for alternative, indie, and progressive musical talent
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center"
        >
          <a 
            href="#about"
            className="group flex flex-col items-center text-redlamp-light/60 hover:text-redlamp-red transition-colors duration-300"
          >
            <span className="text-sm mb-2">Discover More</span>
            <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

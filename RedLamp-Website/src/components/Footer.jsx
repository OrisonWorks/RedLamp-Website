import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-redlamp-darker border-t border-redlamp-red/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-redlamp-red">RED</span>LAMP
            </h3>
            <p className="text-redlamp-light/60 leading-relaxed">
              A cultural movement, sonic sanctuary, and ethical creative engine proving that boundary-pushing alternative art can directly ignite sustainable community transformation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-4 text-redlamp-red">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-redlamp-light/60 hover:text-redlamp-red transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-redlamp-light/60 hover:text-redlamp-red transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#framework" className="text-redlamp-light/60 hover:text-redlamp-red transition-colors duration-300">
                  Wealth-Recycling Framework
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-bold mb-4 text-redlamp-red">Part of</h4>
            <p className="text-redlamp-light/60 leading-relaxed">
              Chisomo NGO
            </p>
            <p className="text-redlamp-light/60 leading-relaxed mt-2">
              Empowering communities through creative education and youth welfare initiatives
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-8 border-t border-redlamp-red/10 text-center"
        >
          <p className="text-redlamp-light/40 text-sm">
            © {new Date().getFullYear()} REDLAMP. All rights reserved. A social enterprise under Chisomo NGO.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

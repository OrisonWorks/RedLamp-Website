import React from 'react'
import { motion } from 'framer-motion'
import { Headphones, Film, Music, Zap } from 'lucide-react'

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 bg-redlamp-darker">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What We <span className="text-redlamp-red">Offer</span>
          </h2>
          <div className="w-24 h-1 bg-redlamp-red mx-auto" />
          <p className="mt-6 text-lg text-redlamp-light/70 max-w-2xl mx-auto">
            Comprehensive support for alternative artists to realize their creative vision
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <Headphones className="w-16 h-16" />,
              title: "Studio Access",
              description: "Studio backline with audio equipment available at zero cost to qualified artists",
              highlight: "Zero-cost access"
            },
            {
              icon: <Music className="w-16 h-16" />,
              title: "Songwriting Mentorship",
              description: "Guidance to help artists develop their unique sonic identity and craft compelling compositions",
              highlight: "Professional guidance"
            },
            {
              icon: <Film className="w-16 h-16" />,
              title: "EPK Production",
              description: "Professional electronic press kits with premium audio multi-tracking, branding and visual storytelling.",
              highlight: "Brand quality"
            },
            {
              icon: <Zap className="w-16 h-16" />,
              title: "Live Showcase Events",
              description: "Curated live performances that provide artists with platform exposure and generate revenue to sustain our mission",
              highlight: "Platform exposure"
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group bg-redlamp-dark p-8 rounded-lg border border-redlamp-red/10 hover:border-redlamp-red/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="text-redlamp-red mb-6 group-hover:text-redlamp-orange transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-redlamp-light/70 mb-4 leading-relaxed">
                {service.description}
              </p>
              <span className="inline-block px-4 py-2 bg-redlamp-red/10 text-redlamp-red rounded-full text-sm font-medium">
                {service.highlight}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

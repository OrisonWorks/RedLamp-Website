import React from 'react'
import { motion } from 'framer-motion'
import { Users, Mic, Radio } from 'lucide-react'

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-redlamp-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-redlamp-red">About</span> Redlamp
          </h2>
          <div className="w-24 h-1 bg-redlamp-red mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-redlamp-light/80 leading-relaxed">
              Redlamp is a forward-thinking creative incubator, digital media engine, and social enterprise operating under the umbrella of the Chisomo NGO. Founded by Moses Chilunjika and Tumelo Daniel Mwaba, Redlamp was established to disrupt the standard music pipeline and build a dedicated launchpad for alternative, indie, and progressive musical talent.
            </p>
            <p className="text-lg text-redlamp-light/80 leading-relaxed">
              In a contemporary music landscape dominated by mainstream commercial pop, underground and experimental creators frequently find themselves without the infrastructure, technical gear, or production support necessary to scale their careers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-redlamp-light/80 leading-relaxed">
              Redlamp bridges this gap entirely. By providing raw talent with merit-based, zero-cost access to a studio backline, songwriting mentorship, and production, the agency allows alternative artists to fully realize and capture their unique sonic identities.
            </p>
            <p className="text-lg text-redlamp-light/80 leading-relaxed">
              Beyond development, Redlamp acts as a creative media hub. Its signature live-in-studio broadcast series, "Redlamp Sessions," captures the raw, visceral energy of live production arrangements.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="w-12 h-12" />,
              title: "Artist Development",
              description: "Merit-based, zero-cost access to studio backline and songwriting mentorship"
            },
            {
              icon: <Mic className="w-12 h-12" />,
              title: "Media Production",
              description: "Audio multi-tracking with branding and visual storytelling for professional EPKs"
            },
            {
              icon: <Radio className="w-12 h-12" />,
              title: "Live Sessions",
              description: "Multi-camera capturing the raw energy of live production arrangements"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-redlamp-gray p-8 rounded-lg border border-redlamp-red/20 hover:border-redlamp-red/40 transition-colors duration-300"
            >
              <div className="text-redlamp-red mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-redlamp-light/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

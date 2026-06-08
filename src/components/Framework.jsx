import React from 'react'
import { motion } from 'framer-motion'
import { Recycle, Heart, GraduationCap, Settings } from 'lucide-react'

const Framework = () => {
  return (
    <section id="framework" className="py-24 px-6 bg-redlamp-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Wealth-Recycling <span className="text-redlamp-red">Framework</span>
          </h2>
          <div className="w-24 h-1 bg-redlamp-red mx-auto" />
          <p className="mt-6 text-lg text-redlamp-light/70 max-w-3xl mx-auto">
            Our revolutionary self-sustaining model where a percentage of net proceeds are recycled directly back into the community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-redlamp-darker p-8 rounded-lg border border-redlamp-red/20 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-redlamp-red">
              <Recycle className="w-16 h-16" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Revenue Generation</h3>
              <p className="text-redlamp-light/80 leading-relaxed">
                Operating as a hybrid social enterprise, Redlamp generates independent commercial revenue through curated live showcase events, digital publishing royalties, and business-to-business (B2B) premium hardware out-rentals.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-start gap-6 bg-redlamp-gray p-6 rounded-lg border-l-4 border-redlamp-red"
          >
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-redlamp-red/20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-redlamp-red">40%</span>
              </div>
            </div>
            <div className="flex items-start gap-4 flex-1">
              <Settings className="w-8 h-8 text-redlamp-red flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold mb-2">Studio Operations</h4>
                <p className="text-redlamp-light/70">
                  Sustains the studio's technical operations, ensuring equipment maintenance and facility upgrades
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row items-start gap-6 bg-redlamp-gray p-6 rounded-lg border-l-4 border-redlamp-orange"
          >
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-redlamp-orange/20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-redlamp-orange">30%</span>
              </div>
            </div>
            <div className="flex items-start gap-4 flex-1">
              <Heart className="w-8 h-8 text-redlamp-orange flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold mb-2">Artist Support</h4>
                <p className="text-redlamp-light/70">
                  Directly funds free tracking, mixing, and marketing for underprivileged alternative creators
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row items-start gap-6 bg-redlamp-gray p-6 rounded-lg border-l-4 border-redlamp-red"
          >
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-redlamp-red/20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-redlamp-red">30%</span>
              </div>
            </div>
            <div className="flex items-start gap-4 flex-1">
              <GraduationCap className="w-8 h-8 text-redlamp-red flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold mb-2">Community Initiatives</h4>
                <p className="text-redlamp-light/70">
                  Funneled into Chisomo NGO's broader regional charity initiatives, powering local education, youth welfare, and creative vocational training programs
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xl text-redlamp-light/90 italic max-w-3xl mx-auto">
            "Redlamp is more than an artist development agency—it is a cultural movement, a sonic sanctuary, and an ethical creative engine proving that boundary-pushing alternative art can directly ignite sustainable community transformation."
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Framework

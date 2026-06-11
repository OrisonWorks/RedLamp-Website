import React from 'react'
import { motion } from 'framer-motion'
import { Play, ExternalLink } from 'lucide-react'
import { SITE_CONFIG } from '../config'

const Showcase = () => {
  const sessions = [
    {
      title: 'Alternative Rock Session',
      artist: 'The Indie Collective',
      thumbnail: 'https://images.unsplash.com/photo-1514525253344-f814d0743b1a?auto=format&fit=crop&q=80&w=800',
      duration: '12:45'
    },
    {
      title: 'Progressive Soul Experience',
      artist: 'Lumina Echo',
      thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800',
      duration: '15:20'
    },
    {
      title: 'Experimental Electronic Live',
      artist: 'Synth Wave Ritual',
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
      duration: '10:30'
    }
  ]

  return (
    <section id="showcase" className="py-24 px-6 bg-redlamp-darker">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Redlamp <span className="text-redlamp-red">Sessions</span>
          </h2>
          <div className="w-24 h-1 bg-redlamp-red mx-auto" />
          <p className="mt-6 text-lg text-redlamp-light/70 max-w-2xl mx-auto">
            Capturing the raw, visceral energy of live production arrangements in our signature broadcast series
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {sessions.map((session, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-2xl shadow-black/50 bg-redlamp-gray"
            >
              <div 
                className="w-full aspect-video bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100 bg-redlamp-dark"
                style={{ backgroundImage: `url(${session.thumbnail})` }}
                role="img"
                aria-label={session.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-redlamp-dark via-transparent to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-redlamp-red rounded-full flex items-center justify-center text-white shadow-lg">
                  <Play className="w-8 h-8 fill-current" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-bold text-redlamp-red uppercase tracking-widest mb-1">
                  {session.duration} • Live Session
                </p>
                <h3 className="text-xl font-bold text-white mb-1">{session.title}</h3>
                <p className="text-sm text-redlamp-light/60">{session.artist}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a 
            href={SITE_CONFIG.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-redlamp-red text-redlamp-red hover:bg-redlamp-red hover:text-white font-bold rounded-lg transition-all duration-300"
          >
            <ExternalLink className="w-5 h-5" />
            Watch More on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Showcase

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, Music, User, CheckCircle, ExternalLink, Mail, Phone } from 'lucide-react'
import CustomCalendar from './Calendar'
import { SITE_CONFIG } from '../config'

const BookingForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    artistName: '',
    date: '',
    time: '',
    genre: '',
    producerSession: false,
    agreedToTerms: false
  })

  const [errors, setErrors] = useState({})
  const [showCalendar, setShowCalendar] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateDate = (dateString) => {
    if (!dateString) return false
    const [year, month, day] = dateString.split('-').map(Number)
    const selectedDate = new Date(year, month - 1, day)
    const dayOfWeek = selectedDate.getDay()
    return SITE_CONFIG.booking.availableDays.includes(dayOfWeek)
  }

  const validateTime = (time) => {
    if (!time) return false
    const [hours] = time.split(':').map(Number)
    return hours >= SITE_CONFIG.booking.hours.start && hours <= SITE_CONFIG.booking.hours.end
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)

    const newErrors = {}

    if (!formData.artistName.trim()) {
      newErrors.artistName = 'Artist name is required'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    } else if (!validateDate(formData.date)) {
      newErrors.date = `Booking is only available on ${SITE_CONFIG.booking.availableDays.includes(0) ? 'Sundays' : ''} ${SITE_CONFIG.booking.availableDays.includes(6) ? 'and Saturdays' : ''}`.trim()
    }

    if (!formData.time) {
      newErrors.time = 'Time is required'
    } else if (!validateTime(formData.time)) {
      newErrors.time = `Booking hours are between ${SITE_CONFIG.booking.hours.start}:00 and ${SITE_CONFIG.booking.hours.end}:00`
    }

    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required'
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the terms and conditions'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // Generate WhatsApp message
    const whatsappMessage = `
*${SITE_CONFIG.name} Studio Booking Request*

*Artist Name:* ${formData.artistName}
*Date:* ${formData.date}
*Time:* ${formData.time}
*Genre:* ${formData.genre}
*Producer Session:* ${formData.producerSession ? 'Yes (Paid)' : 'No'}

*I agree to the ${SITE_CONFIG.name} terms and conditions.*
    `.trim()

    const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`

    // Generate email
    const emailSubject = `${SITE_CONFIG.name} Studio Booking Request`
    const emailBody = `
${SITE_CONFIG.name} Studio Booking Request

Artist Name: ${formData.artistName}
Date: ${formData.date}
Time: ${formData.time}
Genre: ${formData.genre}
Producer Session: ${formData.producerSession ? 'Yes (Paid)' : 'No'}

I agree to the ${SITE_CONFIG.name} terms and conditions.
    `.trim()

    const mailtoUrl = `mailto:${SITE_CONFIG.contact.emails.join(',')}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

    // Open WhatsApp and email
    try {
      window.open(whatsappUrl, '_blank')
      setTimeout(() => {
        window.location.href = mailtoUrl
      }, 200)
    } catch (err) {
      console.error('Failed to open links:', err)
    }

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleReset = () => {
    setIsSuccess(false)
    setFormData({
      artistName: '',
      date: '',
      time: '',
      genre: '',
      producerSession: false,
      agreedToTerms: false
    })
    onClose()
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  useEffect(() => {
    if (isOpen) {
      setIsSubmitting(false)
      setIsSuccess(false)
      setErrors({})
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-redlamp-dark border border-redlamp-red/20 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-redlamp-red">Book a Session</h2>
            <button
              onClick={onClose}
              className="text-redlamp-light/60 hover:text-redlamp-red transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Request Sent!</h3>
                <p className="text-redlamp-light/70 mb-8">
                  Your booking details have been prepared for WhatsApp and Email. 
                  Please ensure you send the messages in the opened windows.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-redlamp-darker rounded-lg border border-redlamp-red/10 text-left">
                    <Phone className="w-5 h-5 text-redlamp-red flex-shrink-0" />
                    <div>
                      <p className="text-xs text-redlamp-light/50">WhatsApp</p>
                      <p className="text-sm font-medium">+{SITE_CONFIG.contact.whatsapp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-redlamp-darker rounded-lg border border-redlamp-red/10 text-left">
                    <Mail className="w-5 h-5 text-redlamp-red flex-shrink-0" />
                    <div>
                      <p className="text-xs text-redlamp-light/50">Email</p>
                      <p className="text-sm font-medium">{SITE_CONFIG.contact.emails[0]}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-4 bg-redlamp-red hover:bg-redlamp-orange text-white font-bold rounded-lg transition-all"
                >
                  Return to Site
                </button>
              </motion.div>
            ) : (
              <>
            {/* Artist Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-redlamp-light mb-2">
                <User className="w-4 h-4 text-redlamp-red" />
                Artist Name *
              </label>
              <input
                type="text"
                name="artistName"
                value={formData.artistName}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-redlamp-darker border rounded-lg focus:outline-none focus:ring-2 focus:ring-redlamp-red/50 transition-all ${
                  errors.artistName ? 'border-red-500' : 'border-redlamp-red/20'
                } text-white placeholder-redlamp-light/40`}
                placeholder="Enter artist or band name"
              />
              {errors.artistName && (
                <p className="text-red-500 text-sm mt-1">{errors.artistName}</p>
              )}
            </div>

            {/* Date */}
            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-medium text-redlamp-light mb-2">
                <Calendar className="w-4 h-4 text-redlamp-red" />
                Date *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  onClick={() => setShowCalendar(!showCalendar)}
                  readOnly
                  placeholder="Select a date"
                  className={`w-full px-4 py-3 bg-redlamp-darker border rounded-lg focus:outline-none focus:ring-2 focus:ring-redlamp-red/50 transition-all cursor-pointer ${
                    errors.date ? 'border-red-500' : 'border-redlamp-red/20'
                  } text-white placeholder-redlamp-light/40`}
                />
                <Calendar
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-redlamp-red pointer-events-none"
                />
              </div>
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
              <p className="text-redlamp-light/50 text-xs mt-1">
                * Only available on Saturdays and Sundays
              </p>
              <AnimatePresence>
                {showCalendar && (
                  <CustomCalendar
                    selectedDate={formData.date}
                    onSelect={(date) => {
                      setFormData(prev => ({ ...prev, date }))
                      if (errors.date) {
                        setErrors(prev => ({ ...prev, date: '' }))
                      }
                    }}
                    onClose={() => setShowCalendar(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Time */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-redlamp-light mb-2">
                <Clock className="w-4 h-4 text-redlamp-red" />
                Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                min={`${SITE_CONFIG.booking.hours.start}:00`}
                max={`${SITE_CONFIG.booking.hours.end}:00`}
                className={`w-full px-4 py-3 bg-redlamp-darker border rounded-lg focus:outline-none focus:ring-2 focus:ring-redlamp-red/50 transition-all ${
                  errors.time ? 'border-red-500' : 'border-redlamp-red/20'
                } text-white`}
              />
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time}</p>
              )}
              <p className="text-redlamp-light/50 text-xs mt-1">
                * Booking hours: {SITE_CONFIG.booking.hours.start}:00 - {SITE_CONFIG.booking.hours.end}:00
              </p>
            </div>

            {/* Genre */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-redlamp-light mb-2">
                <Music className="w-4 h-4 text-redlamp-red" />
                Genre *
              </label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-redlamp-darker border rounded-lg focus:outline-none focus:ring-2 focus:ring-redlamp-red/50 transition-all ${
                  errors.genre ? 'border-red-500' : 'border-redlamp-red/20'
                } text-white placeholder-redlamp-light/40`}
                placeholder="e.g., Alternative, Indie, Rock, Electronic"
              />
              {errors.genre && (
                <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
              )}
            </div>

            {/* Producer Session */}
            <div className="flex items-start gap-3 p-4 bg-redlamp-darker rounded-lg border border-redlamp-red/10">
              <div 
                onClick={() => {
                  setFormData(prev => ({ ...prev, producerSession: !prev.producerSession }))
                }}
                className="mt-1 w-6 h-6 rounded border-2 border-redlamp-red/30 bg-redlamp-dark flex items-center justify-center cursor-pointer hover:border-redlamp-red transition-colors"
              >
                {formData.producerSession && (
                  <div className="w-4 h-4 bg-redlamp-red rounded-sm" />
                )}
              </div>
              <div>
                <label
                  htmlFor="producerSession"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, producerSession: !prev.producerSession }))
                  }}
                  className="text-sm font-medium text-redlamp-light cursor-pointer select-none"
                >
                  Book Producer Session
                </label>
                <p className="text-redlamp-light/50 text-xs mt-1">
                  Add a professional producer to your session (additional cost applies)
                </p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="p-4 bg-redlamp-darker rounded-lg border border-redlamp-red/10">
              <h3 className="text-sm font-bold text-redlamp-red mb-3">Terms and Conditions</h3>
              <div className="text-xs text-redlamp-light/70 space-y-2 max-h-32 overflow-y-auto pr-2">
                <p>• Artists must arrive 15 minutes before scheduled time</p>
                <p>• Cancellations must be made at least 48 hours in advance</p>
                <p>• RedLamp reserves the right to record sessions for promotional purposes</p>
                <p>• Artists under 18 must have parental/guardian consent</p>
                <p>• All equipment must be treated with care; damage will be charged</p>
                <p>• No illegal substances or weapons allowed on premises</p>
                <p>• RedLamp is not responsible for lost or stolen items</p>
                <p>• Artists grant RedLamp non-exclusive rights to use recorded material</p>
              </div>
              <div className="flex items-start gap-3 mt-4">
                <div 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, agreedToTerms: !prev.agreedToTerms }))
                    if (errors.agreedToTerms) {
                      setErrors(prev => ({ ...prev, agreedToTerms: '' }))
                    }
                  }}
                  className="mt-1 w-6 h-6 rounded border-2 border-redlamp-red/30 bg-redlamp-dark flex items-center justify-center cursor-pointer hover:border-redlamp-red transition-colors"
                >
                  {formData.agreedToTerms && (
                    <div className="w-4 h-4 bg-redlamp-red rounded-sm" />
                  )}
                </div>
                <label
                  htmlFor="agreedToTerms"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, agreedToTerms: !prev.agreedToTerms }))
                    if (errors.agreedToTerms) {
                      setErrors(prev => ({ ...prev, agreedToTerms: '' }))
                    }
                  }}
                  className="text-sm text-redlamp-light cursor-pointer select-none"
                >
                  I agree to the terms and conditions *
                </label>
              </div>
              {errors.agreedToTerms && (
                <p className="text-red-500 text-sm mt-1">{errors.agreedToTerms}</p>
              )}
            </div>

            {/* Error Summary */}
            {Object.keys(errors).length > 0 && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm font-medium mb-1">Please fix the following:</p>
                {errors.artistName && <p className="text-red-400 text-xs">• {errors.artistName}</p>}
                {errors.date && <p className="text-red-400 text-xs">• {errors.date}</p>}
                {errors.time && <p className="text-red-400 text-xs">• {errors.time}</p>}
                {errors.genre && <p className="text-red-400 text-xs">• {errors.genre}</p>}
                {errors.agreedToTerms && <p className="text-red-400 text-xs">• {errors.agreedToTerms}</p>}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-redlamp-red hover:bg-redlamp-orange text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-redlamp-red/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <CheckCircle className="w-5 h-5" />
              {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
            </button>

            <p className="text-center text-redlamp-light/50 text-xs">
              This will open WhatsApp and email with your booking details
            </p>
              </>
            )}
          </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BookingForm

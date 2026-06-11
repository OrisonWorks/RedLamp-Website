import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, Music, User, CheckCircle } from 'lucide-react'
import CustomCalendar from './Calendar'

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

  const validateDate = (dateString) => {
    if (!dateString) return false
    const [year, month, day] = dateString.split('-').map(Number)
    const selectedDate = new Date(year, month - 1, day)
    const dayOfWeek = selectedDate.getDay()
    // 0 = Sunday, 6 = Saturday
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  const validateTime = (time) => {
    if (!time) return false
    const [hours] = time.split(':').map(Number)
    return hours >= 10 && hours <= 21
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
      newErrors.date = 'Booking is only available on Saturdays and Sundays'
    }

    if (!formData.time) {
      newErrors.time = 'Time is required'
    } else if (!validateTime(formData.time)) {
      newErrors.time = 'Booking hours are between 10:00 and 21:00'
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
*REDLAMP Studio Booking Request*

*Artist Name:* ${formData.artistName}
*Date:* ${formData.date}
*Time:* ${formData.time}
*Genre:* ${formData.genre}
*Producer Session:* ${formData.producerSession ? 'Yes (Paid)' : 'No'}

*I agree to the RedLamp terms and conditions.*
    `.trim()

    const whatsappUrl = `https://wa.me/260977745567?text=${encodeURIComponent(whatsappMessage)}`

    // Generate email
    const emailSubject = 'REDLAMP Studio Booking Request'
    const emailBody = `
REDLAMP Studio Booking Request

Artist Name: ${formData.artistName}
Date: ${formData.date}
Time: ${formData.time}
Genre: ${formData.genre}
Producer Session: ${formData.producerSession ? 'Yes (Paid)' : 'No'}

I agree to the RedLamp terms and conditions.
    `.trim()

    const mailtoUrl = `mailto:mellorison@gmail.com,mrchilunjikamoses@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

    // Open WhatsApp and email immediately
    try {
      // Use a small delay for the second navigation to avoid browser blocking both
      window.open(whatsappUrl, '_blank')
      setTimeout(() => {
        window.location.href = mailtoUrl
      }, 200)
    } catch (err) {
      console.error('Failed to open links:', err)
    }

    // Reset state and close after a delay to ensure navigations are handled
    setTimeout(() => {
      setIsSubmitting(false)
      onClose()
      // Reset form
      setFormData({
        artistName: '',
        date: '',
        time: '',
        genre: '',
        producerSession: false,
        agreedToTerms: false
      })
    }, 1000)
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
                min="10:00"
                max="21:00"
                className={`w-full px-4 py-3 bg-redlamp-darker border rounded-lg focus:outline-none focus:ring-2 focus:ring-redlamp-red/50 transition-all ${
                  errors.time ? 'border-red-500' : 'border-redlamp-red/20'
                } text-white`}
              />
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time}</p>
              )}
              <p className="text-redlamp-light/50 text-xs mt-1">
                * Booking hours: 10:00 - 21:00
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
          </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BookingForm

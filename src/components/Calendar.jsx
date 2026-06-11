import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'

const Calendar = ({ selectedDate, onSelect, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const isWeekend = (date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  const isPastDate = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const handleDateClick = (date) => {
    if (isWeekend(date) && !isPastDate(date)) {
      onSelect(date.toISOString().split('T')[0])
      onClose()
    }
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    // Day names header
    const header = dayNames.map((day, index) => (
      <div
        key={day}
        className={`text-center text-xs font-medium py-2 ${
          index === 0 || index === 6 ? 'text-redlamp-red' : 'text-redlamp-light/50'
        }`}
      >
        {day}
      </div>
    ))
    days.push(...header)

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isWeekendDay = isWeekend(date)
      const isPast = isPastDate(date)
      const isSelected = selectedDate === date.toISOString().split('T')[0]
      const isDisabled = !isWeekendDay || isPast

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          disabled={isDisabled}
          className={`
            p-2 rounded-lg text-sm font-medium transition-all duration-200
            ${isSelected 
              ? 'bg-redlamp-red text-white hover:bg-redlamp-orange' 
              : isDisabled
                ? 'text-redlamp-light/20 cursor-not-allowed'
                : isWeekendDay
                  ? 'text-redlamp-light hover:bg-redlamp-red/20 cursor-pointer'
                  : 'text-redlamp-light/40 cursor-not-allowed'
            }
          `}
        >
          {day}
        </button>
      )
    }

    return days
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 z-50"
    >
      <div className="bg-redlamp-dark border border-redlamp-red/20 rounded-xl p-4 shadow-xl shadow-redlamp-red/10 w-80">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-redlamp-red/10 rounded-lg transition-colors text-redlamp-light/60 hover:text-redlamp-red"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-redlamp-red" />
            <span className="text-lg font-bold text-redlamp-light">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
          </div>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-redlamp-red/10 rounded-lg transition-colors text-redlamp-light/60 hover:text-redlamp-red"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-redlamp-red/10">
          <div className="flex items-center gap-4 text-xs text-redlamp-light/50">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-redlamp-red/20" />
              <span>Available (Sat/Sun)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-redlamp-light/10" />
              <span>Unavailable</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Calendar

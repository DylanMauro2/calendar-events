import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

type CalendarHeaderProps = {
  date: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
}

export function CalendarHeader({ date, onPreviousMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="calendar-header-container">
      <div className="calendar-header-date-change-container">
        <button
          onClick={onPreviousMonth}
          className="calendar-header-date-change-button"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="calendar-header-date-change-icon" />
        </button>

        <button
          onClick={onNextMonth}
          className="calendar-header-date-change-button"
          aria-label="Mes siguiente"
        >
          <ChevronRight className="calendar-header-date-change-icon" />
        </button>
      </div>

      <p className="calendar-header-date-title">
        <CalendarIcon className="calendar-header-date-icon" />
        {date.toLocaleDateString('es-CL', {
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  )
}






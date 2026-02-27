import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

type CalendarHeaderProps = {
  date: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
}

export function CalendarHeader({ date, onPreviousMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="flex items-center gap-4 calendar-header-container">
      <div className="flex items-center gap-2 calendar-header-date-change-container">
        <button
          onClick={onPreviousMonth}
          className="rounded-full size-10 bg-accent flex items-center justify-center transition-all calendar-header-date-change-button"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="size-7 text-muted-foreground calendar-header-date-change-icon" />
        </button>

        <button
          onClick={onNextMonth}
          className="rounded-full size-10 bg-accent flex items-center justify-center transition-all calendar-header-date-change-button"
          aria-label="Mes siguiente"
        >
          <ChevronRight className="size-7 text-muted-foreground calendar-header-date-change-icon" />
        </button>
      </div>

      <p className="flex items-center gap-2 font-medium text-xl capitalize calendar-header-date-title">
        <CalendarIcon className="size-7 text-primary calendar-header-date-icon" />
        {date.toLocaleDateString('es-CL', {
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  )
}






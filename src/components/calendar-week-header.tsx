import { CalendarWeekHeaderItem } from './calendar-week-header-item'

const WEEK_DAYS = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO']

export function CalendarWeekHeader() {
  return (
    <div className="grid grid-cols-7 bg-primary/20 rounded h-13 text-lg items-center mt-4 mb-1 calendar-week-header-container">
      {WEEK_DAYS.map((day) => (
        <CalendarWeekHeaderItem key={day} label={day} />
      ))}
    </div>
  )
}

import { CalendarWeekHeaderItem } from './calendar-week-header-item'

const WEEK_DAYS = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO']

export function CalendarWeekHeader() {
  return (
    <div className="calendar-week-header-container">
      {WEEK_DAYS.map((day) => (
        <CalendarWeekHeaderItem key={day} label={day} />
      ))}
    </div>
  )
}

import * as React from 'react'
import { useState, useMemo } from 'react'
import { CalendarEvent } from './types'
import { CalendarHeader } from './calendar-header'
import { CalendarWeekHeader } from './calendar-week-header'
import { CalendarDay } from './calendar-day'
import { CalendarAnimatedIcon } from './calendar-animated-icon'
import { cn } from '../lib/utils'

type Props<TData> = {
  initialDate?: Date
  events?: CalendarEvent<TData>[]
  className?: string
  /** Muestra un spinner centrado en cada celda del mes actual mientras se cargan los datos. */
  loading?: boolean
  onClickEvent?: (event: CalendarEvent<TData>) => void
  /**
   * Render prop para personalizar cómo se muestra cada evento dentro del día.
   * Si no se provee, se usa el diseño por defecto.
   *
   * @example
   * renderEvent={event => (
   *   <span style={{ background: event.color }} className="rounded px-2 text-xs text-white">
   *     {event.title}
   *   </span>
   * )}
   */
  renderEvent?: (event: CalendarEvent<TData>) => React.ReactNode
}

const DAY_NAME_TO_INDEX = new Map([
  ['lunes', 0],
  ['martes', 1],
  ['miércoles', 2],
  ['miercoles', 2],
  ['jueves', 3],
  ['viernes', 4],
  ['sábado', 5],
  ['sabado', 5],
  ['domingo', 6],
])

const defaultEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Reunión de equipo',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
    description: 'Reunión semanal del equipo',
  },
  {
    id: 2,
    title: 'Entrega proyecto',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
    description: 'Fecha límite de entrega',
  },
  {
    id: 3,
    title: 'Capacitación',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    description: 'Capacitación en nuevas tecnologías',
  },
  {
    id: 4,
    title: 'Revisión código',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    description: 'Code review del sprint',
  },
  {
    id: 5,
    title: 'Demo cliente',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
    description: 'Presentación al cliente',
  },
]

export default function CalendarEvents<TData = unknown>({
  initialDate = new Date(),
  events = defaultEvents as CalendarEvent<TData>[],
  className,
  loading = false,
  onClickEvent,
  renderEvent,
}: Props<TData>) {
  const [date, setDate] = useState(initialDate)

  const allDays = useMemo(() => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate()

    const days = []
    for (let i = 1; i <= lastDayOfMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }, [date])

  const getStartDay = () => {
    const dayName = allDays[0].toLocaleDateString('es-CL', { weekday: 'long' })
    return DAY_NAME_TO_INDEX.get(dayName) ?? 0
  }

  const previousMonthDays = useMemo(() => {
    const skipDays = getStartDay()
    if (skipDays === 0) return []

    const year = date.getFullYear()
    const month = date.getMonth()
    const lastDayPrevMonth = new Date(year, month, 0).getDate()

    const previousDays = []
    for (let i = skipDays - 1; i >= 0; i--) {
      previousDays.push(new Date(year, month - 1, lastDayPrevMonth - i))
    }
    return previousDays
  }, [date, allDays])

  const nextMonthDays = useMemo(() => {
    const totalCells = 42
    const remainingCells = totalCells - getStartDay() - allDays.length

    if (remainingCells <= 0) return []

    const year = date.getFullYear()
    const month = date.getMonth()

    const nextDays = []
    for (let i = 1; i <= remainingCells; i++) {
      nextDays.push(new Date(year, month + 1, i))
    }
    return nextDays
  }, [date, allDays])

  const goToPreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  const isToday = (day: Date) => {
    return day.toDateString() === new Date().toDateString()
  }

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => day.toDateString() === event.date.toDateString())
  }

  return (
    <div className={cn('p-2 border rounded-lg w-full calendar-container', className)}>
      <CalendarHeader
        date={date}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
      />

      <CalendarWeekHeader />

      <div className="relative calendar-body">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/90 flex-col gap-2 calendar-loading-overlay">
            <CalendarAnimatedIcon size={90} className="text-primary" />
            <p className="text-lg italic text-muted-foreground calendar-loading-text">
              Cargando Eventos del Calendario...
            </p>
          </div>
        )}

        <div className="grid grid-cols-7 gap-1 calendar-grid">
          {previousMonthDays.map((day) => (
            <CalendarDay key={day.toISOString()} day={day} events={[]} isToday={false} isOutsideMonth />
          ))}

          {allDays.map((day) => (
            <CalendarDay
              key={day.toISOString()}
              day={day}
              events={getEventsForDay(day)}
              isToday={isToday(day)}
              onClickEvent={onClickEvent}
              renderEvent={renderEvent}
            />
          ))}

          {nextMonthDays.map((day) => (
            <CalendarDay key={day.toISOString()} day={day} events={[]} isToday={false} isOutsideMonth />
          ))}
        </div>
      </div>
    </div>
  )
}

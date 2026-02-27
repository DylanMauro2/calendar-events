import React from 'react'
import { CalendarEvent } from './types'
import { CalendarEventItem } from './calendar-event-item'

type CalendarDayProps<TData> = {
  day: Date
  events: CalendarEvent<TData>[]
  isToday: boolean
  isOutsideMonth?: boolean
  onClickEvent?: (event: CalendarEvent<TData>) => void
  /** Render prop para personalizar el diseño de cada evento. Si no se provee, se usa el diseño por defecto. */
  renderEvent?: (event: CalendarEvent<TData>) => React.ReactNode
}

export function CalendarDay<TData>({
  day,
  events,
  isToday,
  isOutsideMonth = false,
  onClickEvent,
  renderEvent,
}: CalendarDayProps<TData>) {
  if (isOutsideMonth) {
    return (
      <div className="calendar-day-is-outside">
        {day.getDate()}
      </div>
    )
  }

  return (
    <div
      className={`calendar-day-container ${
        isToday ? 'calendar-day-is-today' : 'calendar-day-is-not-today'
      }`}
    >
      <div className="calendar-day-number">{day.getDate()}</div>
      <div className="calendar-day-list space-y-1">
        {events.map((event) =>
          renderEvent ? (
            <div key={event.id}>{renderEvent(event)}</div>
          ) : (
            <CalendarEventItem key={event.id} event={event} onClickEvent={onClickEvent} />
          ),
        )}
      </div>
    </div>
  )
}




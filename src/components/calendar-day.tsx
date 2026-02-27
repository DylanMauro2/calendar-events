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
      <div className="text-muted-foreground p-2 bg-accent/50 h-20 lg:h-28 text-xs calendar-day-is-outside">
        {day.getDate()}
      </div>
    )
  }

  return (
    <div
      className={`p-2 rounded h-20 lg:h-28 flex flex-col bg-accent/50 border calendar-day-container ${
        isToday ? 'border-primary/50 calendar-day-is-today' : 'border-transparent calendar-day-is-not-today'
      }`}
    >
      <div className="font-medium text-xs calendar-day-number">{day.getDate()}</div>
      <div className="mt-1 flex-1 overflow-y-auto p-1 space-y-1 calendar-day-event-list">
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




import { CalendarEvent } from './types'

type CalendarEventItemProps<TData> = {
  event: CalendarEvent<TData>
  onClickEvent?: (event: CalendarEvent<TData>) => void
}

export function CalendarEventItem<TData>({ event, onClickEvent }: CalendarEventItemProps<TData>) {
  return (
    <button
      className="calendar-event-item"
      onClick={() => onClickEvent?.(event)}
    >
      {event.title}
    </button>
  )
}


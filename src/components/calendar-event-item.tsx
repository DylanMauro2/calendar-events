import { CalendarEvent } from './types'

type CalendarEventItemProps<TData> = {
  event: CalendarEvent<TData>
  onClickEvent?: (event: CalendarEvent<TData>) => void
}

export function CalendarEventItem<TData>({ event, onClickEvent }: CalendarEventItemProps<TData>) {
  return (
    <button
      className="text-xs p-2 bg-secondary/50 w-full justify-start line-clamp-2 text-start rounded-lg italic cursor-pointer transition-all calendar-event-item"
      onClick={() => onClickEvent?.(event)}
    >
      {event.title}
    </button>
  )
}


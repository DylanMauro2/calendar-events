import { CalendarEvent } from './types'

type CalendarEventItemProps<TData> = {
  event: CalendarEvent<TData>
  onClickEvent?: (event: CalendarEvent<TData>) => void
}

export function CalendarEventItem<TData>({ event, onClickEvent }: CalendarEventItemProps<TData>) {
  return (
    <button
      className="text-xs p-2 bg-secondary/20 font-normal w-full justify-start line-clamp-2 overflow-ellipsis text-start rounded-lg italic cursor-pointer hover:bg-secondary/50 hover:scale-101 transition-all"
      onClick={() => onClickEvent?.(event)}
    >
      {event.title}
    </button>
  )
}

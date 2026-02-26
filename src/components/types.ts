export type CalendarEvent<TData = unknown> = {
  id: number
  title: string
  date: Date
  description?: string
  data?: TData
}

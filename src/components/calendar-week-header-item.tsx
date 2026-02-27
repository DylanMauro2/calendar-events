type CalendarWeekHeaderItemProps = {
  label: string
}

export function CalendarWeekHeaderItem({ label }: CalendarWeekHeaderItemProps) {
  return (
    <div className="calendar-week-header-item">
      {label}
    </div>
  )
}

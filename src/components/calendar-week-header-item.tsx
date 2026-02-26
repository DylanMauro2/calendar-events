type CalendarWeekHeaderItemProps = {
  label: string
}

export function CalendarWeekHeaderItem({ label }: CalendarWeekHeaderItemProps) {
  return (
    <div className="text-muted-foreground px-3 text-xs lg:text-md xl:text-lg truncate">
      {label}
    </div>
  )
}

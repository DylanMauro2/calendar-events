import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

type CalendarHeaderProps = {
  date: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
}

export function CalendarHeader({ date, onPreviousMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="flex items-end py-1 justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onPreviousMonth}
            className="rounded-full h-10 w-10 hover:scale-110 hover:bg-accent flex items-center justify-center transition-all"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="h-7 w-7 text-muted-foreground" />
          </button>

          <button
            onClick={onNextMonth}
            className="rounded-full h-10 w-10 hover:scale-110 hover:bg-accent flex items-center justify-center transition-all"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="h-7 w-7 text-muted-foreground" />
          </button>
        </div>

        <p className="capitalize font-medium text-xl flex items-center gap-2">
          <CalendarIcon className="text-primary size-7" />
          {date.toLocaleDateString('es-CL', {
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <div className="border rounded-lg flex">
        <button
          onClick={onPreviousMonth}
          className="px-2 text-lg font-normal border-r rounded-l-lg hover:bg-accent transition-colors"
        >
          Mes
        </button>
        <button
          onClick={onNextMonth}
          className="px-2 text-lg font-normal rounded-r-lg hover:bg-accent transition-colors"
        >
          Agenda
        </button>
      </div>
    </div>
  )
}

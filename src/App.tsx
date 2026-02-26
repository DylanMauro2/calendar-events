import { useState } from 'react'
import { CalendarEvents } from './index'
import type { CalendarEvent } from './index'

const sampleEvents: CalendarEvent[] = [
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

export default function App() {
  const [selected, setSelected] = useState<CalendarEvent | null>(null)

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700 }}>
        calendar-events — Demo
      </h1>

      <CalendarEvents
        events={sampleEvents}
        onClickEvent={(event) => setSelected(event)}
      />

      {selected && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
          <strong>{selected.title}</strong>
          {selected.description && <p style={{ color: '#64748b' }}>{selected.description}</p>}
          <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
            {selected.date.toLocaleDateString('es-CL', { dateStyle: 'full' })}
          </p>
        </div>
      )}
    </div>
  )
}

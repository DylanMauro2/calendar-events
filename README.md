# calendar-events

A lightweight, customizable React calendar component with event support. Built with TypeScript and Tailwind CSS, featuring generic typed events, render props for full control over event display, a loading state with an animated SVG icon, and seamless dark mode via CSS variables (shadcn/ui compatible).

## Features

- **Generic typed events** — attach any custom data shape to your events via `CalendarEvent<TData>`
- **Render props** — fully control how each event is rendered inside a day cell
- **Loading state** — built-in animated calendar icon overlay while fetching data
- **Dark mode** — works out of the box with a `.dark` class using CSS custom properties
- **shadcn/ui compatible** — uses the same CSS variable conventions, so it slots into any shadcn/ui project with no extra configuration
- **Modular** — all sub-components are exported individually so you can compose your own layout

## Installation

```bash
npm install calendar-events
```

**Peer dependencies** (install if not already present):

```bash
npm install react react-dom
```

## Usage

### 1. Import the styles

Import the CSS once at the root of your app (e.g. `main.tsx` or `layout.tsx`):

```tsx
import 'calendar-events/style.css'
```

> **Already using shadcn/ui?** Skip this import — your existing CSS variables are already compatible.

### 2. Use the component

```tsx
import { CalendarEvents } from 'calendar-events'

export default function Page() {
  return <CalendarEvents />
}
```

### 3. Pass your own events

```tsx
import { CalendarEvents } from 'calendar-events'
import type { CalendarEvent } from 'calendar-events'

const events: CalendarEvent[] = [
  {
    id: 1,
    title: 'Team meeting',
    date: new Date(2025, 5, 10),
    description: 'Weekly sync',
  },
  {
    id: 2,
    title: 'Project deadline',
    date: new Date(2025, 5, 20),
  },
]

export default function Page() {
  return (
    <CalendarEvents
      events={events}
      onClickEvent={(event) => console.log(event)}
    />
  )
}
```

## Generic typed events

Attach any custom data to an event using the generic parameter:

```tsx
type Task = {
  priority: 'low' | 'medium' | 'high'
  assignee: string
}

const events: CalendarEvent<Task>[] = [
  {
    id: 1,
    title: 'Deploy release',
    date: new Date(2025, 5, 15),
    data: { priority: 'high', assignee: 'Ana' },
  },
]

<CalendarEvents<Task>
  events={events}
  onClickEvent={(event) => {
    // event.data is fully typed as Task
    console.log(event.data.priority)
  }}
/>
```

## Custom event rendering

Use the `renderEvent` prop to replace the default event pill with anything you want:

```tsx
<CalendarEvents
  events={events}
  renderEvent={(event) => (
    <span
      className="block rounded px-2 py-0.5 text-xs text-white truncate"
      style={{ backgroundColor: event.data?.color }}
    >
      {event.title}
    </span>
  )}
/>
```

## Loading state

Pass `loading={true}` while fetching events from an API. An animated calendar overlay is shown over the grid:

```tsx
const { data, isLoading } = useQuery(...)

<CalendarEvents
  events={data ?? []}
  loading={isLoading}
/>
```

## Props — `CalendarEvents`

| Prop | Type | Default | Description |
|---|---|---|---|
| `initialDate` | `Date` | `new Date()` | Month shown on first render |
| `events` | `CalendarEvent<TData>[]` | Sample events | List of events to display |
| `loading` | `boolean` | `false` | Shows an animated loading overlay |
| `className` | `string` | — | Extra classes for the root element |
| `onClickEvent` | `(event: CalendarEvent<TData>) => void` | — | Fired when the user clicks an event |
| `renderEvent` | `(event: CalendarEvent<TData>) => ReactNode` | — | Custom renderer for each event pill |

## Type — `CalendarEvent<TData>`

```ts
type CalendarEvent<TData = unknown> = {
  id: number
  title: string
  date: Date
  description?: string
  data?: TData       // any custom payload
}
```

## CSS variables

The library styles are built on CSS custom properties. If you imported `calendar-events/style.css`, these defaults are already set. Override any of them in your own CSS to customise the look:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --border: 214.3 31.8% 91.4%;
  --background: 0 0% 100%;
  --radius: 0.5rem;
}
```

Values follow the `H S% L%` HSL format (no `hsl()` wrapper) so Tailwind's opacity modifier syntax works correctly.

## Dark mode

Add the `.dark` class to `<html>` (or any ancestor element) to switch to the dark theme:

```html
<html class="dark">
```

## Exported components

All sub-components are exported individually for advanced composition:

```ts
import {
  CalendarEvents,          // main component
  CalendarHeader,          // month/year nav bar
  CalendarWeekHeader,      // row of day names
  CalendarWeekHeaderItem,  // single day name cell
  CalendarDay,             // single day cell
  CalendarEventItem,       // default event pill
  CalendarAnimatedIcon,    // animated SVG calendar icon
} from 'calendar-events'
```

## Development

```bash
# clone and install
git clone <repo-url>
cd calendar-events
npm install

# start dev server with live demo
npm run dev

# production build (JS + types + CSS)
npm run build
```

## License

MIT

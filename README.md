# calendar-events

A lightweight, customizable React calendar component with event support. Built with TypeScript and native CSS, featuring generic typed events, render props for full control over event display, a loading state with an animated SVG icon, and seamless dark mode via CSS variables.

## Features

- **Generic typed events** — attach any custom data shape to your events via `CalendarEvent<TData>`
- **Render props** — fully control how each event is rendered inside a day cell
- **Loading state** — built-in animated calendar icon overlay while fetching data
- **Dark mode** — works out of the box with a `.dark` class using CSS custom properties
- **No framework dependencies** — uses native CSS with `--ce-*` prefixed variables, compatible with any design system
- **Modular** — all sub-components are exported individually so you can compose your own layout

## Installation

```bash
npm install calendar-events
# or
pnpm add calendar-events
```

**Peer dependencies** (install if not already present):

```bash
npm install react react-dom
```

## Color palette setup

After installing, run the following command to choose a color palette for your project:

```bash
npm exec calendar-events
# or
pnpm exec calendar-events
```

This interactive CLI will ask you to pick a **color** and a **shade**, then automatically write the selected values into the `dist/style.css` file.

**Available colors:**

| # | Color | Description |
|---|-------|-------------|
| 1 | `verde` | Green |
| 2 | `rojo` | Red |
| 3 | `amarillo` | Yellow |
| 4 | `morado` | Purple |
| 5 | `azul` | Blue |
| 6 | `naranja` | Orange |

**Available shades:** `claro` (light) · `medio` (medium) · `oscuro` (dark)

## Usage

### 1. Import the styles

Import the CSS once at the root of your app (e.g. `main.tsx` or `layout.tsx`):

```tsx
import 'calendar-events/style.css'
```

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
      style={{
        display: 'block',
        borderRadius: '4px',
        padding: '2px 8px',
        fontSize: '0.75rem',
        color: 'white',
        overflow: 'hidden',
        backgroundColor: event.data?.color,
      }}
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
  --ce-background: 0 0% 100%;
  --ce-foreground: 222.2 84% 4.9%;
  --ce-primary: 222.2 47.4% 11.2%;
  --ce-primary-foreground: 210 40% 98%;
  --ce-secondary: 210 40% 96.1%;
  --ce-muted-foreground: 215.4 16.3% 46.9%;
  --ce-accent: 210 40% 96.1%;
  --ce-border: 214.3 31.8% 91.4%;
  --ce-radius: 0.5rem;
}
```

Values follow the `H S% L%` HSL format (no `hsl()` wrapper).

If you use shadcn/ui, you can map your existing variables:

```css
:root {
  --ce-primary: var(--primary);
  --ce-border: var(--border);
  /* etc. */
}
```

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

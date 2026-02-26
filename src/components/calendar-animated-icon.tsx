import * as React from 'react'

type CalendarAnimatedIconProps = React.SVGProps<SVGSVGElement> & {
  /** Tamaño del icono en px. Por defecto: 24. */
  size?: number | string
  /** Color del trazo. Por defecto: `"currentColor"`. */
  color?: string
  /** Grosor del trazo. Por defecto: 2. */
  strokeWidth?: number | string
}

const DOT_POSITIONS = [
  { cx: 7,  cy: 13.5 },
  { cx: 12, cy: 13.5 },
  { cx: 17, cy: 13.5 },
  { cx: 7,  cy: 17.5 },
  { cx: 12, cy: 17.5 },
  { cx: 17, cy: 17.5 },
]

const STEP_DELAY = 0.28
const DURATION   = 2.4

/**
 * Icono animado de calendario. Misma API que los iconos de Lucide React.
 *
 * Los puntos del calendario se iluminan en secuencia creando un efecto de escaneo.
 *
 * @example
 * <CalendarAnimatedIcon size={48} color="hsl(var(--primary))" strokeWidth={1.5} />
 */
export function CalendarAnimatedIcon({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className,
  style,
  ...props
}: CalendarAnimatedIconProps) {
  const uid = React.useId().replace(/:/g, '')

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      {...props}
    >
      <style>{`
        @keyframes ${uid}-pulse {
          0%, 100% { opacity: 0.12; transform: scale(1);   }
          30%       { opacity: 1;    transform: scale(1.5); }
          55%       { opacity: 0.12; transform: scale(1);   }
        }
        .${uid}-dot {
          animation: ${uid}-pulse ${DURATION}s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>

      {/* Cuerpo del calendario */}
      <rect x="3" y="4" width="18" height="17" rx="2" />

      {/* Línea separadora del encabezado */}
      <path d="M3 10h18" />

      {/* Argollas */}
      <path d="M8 2v4M16 2v4" />

      {/* Puntos animados (grilla 3×2) */}
      {DOT_POSITIONS.map((dot, i) => (
        <circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={1.3}
          fill={color}
          stroke="none"
          className={`${uid}-dot`}
          style={{ animationDelay: `${i * STEP_DELAY}s`, opacity: 0.12 }}
        />
      ))}
    </svg>
  )
}

#!/usr/bin/env node

import { createInterface } from 'readline'
import { readFileSync, writeFileSync, existsSync, createReadStream, createWriteStream } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const PALETTES = {
  verde: {
    claro:  { primary: '142 52% 60%', secondary: '142 30% 93%', accent: '142 30% 94%', 'muted-foreground': '142 20% 55%', border: '142 20% 84%' },
    medio:  { primary: '142 71% 42%', secondary: '142 25% 90%', accent: '142 25% 91%', 'muted-foreground': '142 15% 50%', border: '142 15% 80%' },
    oscuro: { primary: '142 76% 26%', secondary: '142 20% 87%', accent: '142 20% 88%', 'muted-foreground': '142 10% 45%', border: '142 10% 76%' },
  },
  rojo: {
    claro:  { primary: '0 72% 65%',   secondary: '0 50% 93%', accent: '0 50% 94%', 'muted-foreground': '0 20% 55%', border: '0 30% 84%' },
    medio:  { primary: '0 84% 53%',   secondary: '0 40% 90%', accent: '0 40% 91%', 'muted-foreground': '0 15% 50%', border: '0 25% 80%' },
    oscuro: { primary: '0 72% 38%',   secondary: '0 25% 87%', accent: '0 25% 88%', 'muted-foreground': '0 10% 45%', border: '0 15% 76%' },
  },
  amarillo: {
    claro:  { primary: '48 90% 55%', secondary: '48 60% 93%', accent: '48 60% 94%', 'muted-foreground': '48 25% 50%', border: '48 35% 84%' },
    medio:  { primary: '45 93% 45%', secondary: '45 50% 90%', accent: '45 50% 91%', 'muted-foreground': '45 20% 45%', border: '45 30% 80%' },
    oscuro: { primary: '38 92% 33%', secondary: '38 35% 87%', accent: '38 35% 88%', 'muted-foreground': '38 15% 40%', border: '38 20% 76%' },
  },
  morado: {
    claro:  { primary: '270 60% 68%', secondary: '270 35% 93%', accent: '270 35% 94%', 'muted-foreground': '270 20% 55%', border: '270 25% 84%' },
    medio:  { primary: '270 70% 52%', secondary: '270 30% 90%', accent: '270 30% 91%', 'muted-foreground': '270 15% 50%', border: '270 20% 80%' },
    oscuro: { primary: '270 76% 36%', secondary: '270 20% 87%', accent: '270 20% 88%', 'muted-foreground': '270 10% 45%', border: '270 15% 76%' },
  },
  azul: {
    claro:  { primary: '210 80% 63%',  secondary: '210 50% 93%', accent: '210 50% 94%', 'muted-foreground': '210 20% 55%', border: '210 30% 84%' },
    medio:  { primary: '210 100% 48%', secondary: '210 45% 90%', accent: '210 45% 91%', 'muted-foreground': '210 15% 50%', border: '210 25% 80%' },
    oscuro: { primary: '210 100% 33%', secondary: '210 30% 87%', accent: '210 30% 88%', 'muted-foreground': '210 10% 45%', border: '210 20% 76%' },
  },
  naranja: {
    claro:  { primary: '24 90% 63%',  secondary: '24 55% 93%', accent: '24 55% 94%', 'muted-foreground': '24 20% 55%', border: '24 35% 84%' },
    medio:  { primary: '24 100% 50%', secondary: '24 45% 90%', accent: '24 45% 91%', 'muted-foreground': '24 15% 50%', border: '24 25% 80%' },
    oscuro: { primary: '24 100% 36%', secondary: '24 30% 87%', accent: '24 30% 88%', 'muted-foreground': '24 10% 45%', border: '24 15% 76%' },
  },
}

const COLOR_OPTIONS = ['verde', 'rojo', 'amarillo', 'morado', 'azul', 'naranja']
const SHADE_OPTIONS = ['claro', 'medio', 'oscuro']

function openTTY() {
  // When npm/pnpm pipes stdin, we open /dev/tty directly to get
  // an interactive terminal regardless of how the script was spawned.
  if (process.stdin.isTTY) {
    return { input: process.stdin, output: process.stdout }
  }
  if (!existsSync('/dev/tty')) return null
  try {
    return {
      input: createReadStream('/dev/tty'),
      output: createWriteStream('/dev/tty'),
    }
  } catch {
    return null
  }
}

function ask(rl, prompt) {
  return new Promise(resolve => rl.question(prompt, resolve))
}

async function main() {
  const tty = openTTY()
  if (!tty) process.exit(0) // CI/CD — skip setup silently

  const rl = createInterface(tty)

  tty.output.write('\ncalendar-events setup\n\n')

  tty.output.write('Selecciona una paleta de colores:\n')
  COLOR_OPTIONS.forEach((color, i) => tty.output.write(`  ${i + 1}. ${color}\n`))

  const colorAnswer = (await ask(rl, '\nColor (1-6): ')).trim()
  const colorKey = COLOR_OPTIONS[parseInt(colorAnswer) - 1]

  if (!colorKey) {
    tty.output.write('Seleccion invalida.\n')
    rl.close()
    process.exit(1)
  }

  tty.output.write(`\nSelecciona un tono para ${colorKey}:\n`)
  tty.output.write('  1. Claro\n')
  tty.output.write('  2. Medio\n')
  tty.output.write('  3. Oscuro\n')

  const shadeAnswer = (await ask(rl, '\nTono (1-3): ')).trim()
  const shadeKey = SHADE_OPTIONS[parseInt(shadeAnswer) - 1]

  rl.close()

  if (!shadeKey) {
    tty.output.write('Seleccion invalida.\n')
    process.exit(1)
  }

  const palette = PALETTES[colorKey][shadeKey]
  const cssPath = join(__dirname, '..', 'dist', 'style.css')
  let css = readFileSync(cssPath, 'utf-8')

  for (const [variable, value] of Object.entries(palette)) {
    css = css.replace(
      new RegExp(`(--ce-${variable}:\\s*)[^;]+;`),
      `$1${value};`
    )
  }

  writeFileSync(cssPath, css)

  tty.output.write(`\nPaleta aplicada: ${colorKey} ${shadeKey}\n`)
}

main()

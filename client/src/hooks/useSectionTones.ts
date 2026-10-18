import { useEffect } from 'react'
import { useLocation } from 'react-router'

type Rgb = [number, number, number]
type Tone = { bg: Rgb; fg: Rgb }

const hex = (value: string): Rgb => [
  parseInt(value.slice(1, 3), 16),
  parseInt(value.slice(3, 5), 16),
  parseInt(value.slice(5, 7), 16),
]

const TONES: Record<string, Tone> = {
  cocoa: { bg: hex('#523F2B'), fg: hex('#B3CED6') },
  wine: { bg: hex('#740C08'), fg: hex('#B3CED6') },
  ice: { bg: hex('#B3CED6'), fg: hex('#523F2B') },
  rose: { bg: hex('#E484AC'), fg: hex('#740C08') },
}

const mix = (a: Rgb, b: Rgb, t: number): Rgb => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
]

const smooth = (t: number) => t * t * (3 - 2 * t)
const css = ([r, g, b]: Rgb) => `rgb(${r} ${g} ${b})`

/**
 * Читає секції з атрибутом data-tone і плавно змішує фон та колір тексту
 * біля межі між двома секціями.
 */
export function useSectionTones() {
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const apply = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-tone]'))
      if (sections.length === 0) return

      const probe = window.scrollY + window.innerHeight * 0.5
      const zone = reduceMotion.matches ? 1 : window.innerHeight * 0.4

      const items = sections.map(el => {
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.scrollY
        return { tone: TONES[el.dataset.tone ?? ''] ?? TONES.cocoa, top, bottom: top + rect.height }
      })

      let current = items.find(item => probe >= item.top && probe < item.bottom)
      if (!current) current = probe < items[0].top ? items[0] : items[items.length - 1]

      let { bg, fg } = current.tone
      const index = items.indexOf(current)

      const next = items[index + 1]
      if (next && next.top - probe < zone) {
        const t = smooth(1 - (next.top - probe) / zone)
        bg = mix(bg, next.tone.bg, t * 0.5)
        fg = mix(fg, next.tone.fg, t * 0.5)
      }
      const prev = items[index - 1]
      if (prev && probe - prev.bottom < zone) {
        const t = smooth(1 - (probe - prev.bottom) / zone)
        bg = mix(bg, prev.tone.bg, t * 0.5)
        fg = mix(fg, prev.tone.fg, t * 0.5)
      }

      root.style.setProperty('--bg', css(bg))
      root.style.setProperty('--fg', css(fg))
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(apply)
    }

    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])
}

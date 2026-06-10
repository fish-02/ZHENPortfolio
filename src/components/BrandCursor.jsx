import { useEffect, useRef } from 'react'

export default function BrandCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) return undefined

    const cursor = cursorRef.current
    const label = labelRef.current
    if (!cursor || !label) return undefined

    let frame
    let currentX = window.innerWidth / 2
    let currentY = window.innerHeight / 2
    let targetX = currentX
    let targetY = currentY

    document.documentElement.classList.add('has-brand-cursor')

    const render = () => {
      currentX += (targetX - currentX) * 0.2
      currentY += (targetY - currentY) * 0.2
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      frame = requestAnimationFrame(render)
    }

    const updateTarget = (event) => {
      const interactive = event.target.closest?.('[data-cursor-label]')
      const nativeControl = event.target.closest?.('input, textarea, select, [contenteditable="true"]')

      if (nativeControl) {
        cursor.classList.remove('is-visible', 'is-active')
        return
      }

      const magnet = interactive?.dataset.cursorMagnetic === 'true'
      if (magnet) {
        const rect = interactive.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        targetX = event.clientX + (centerX - event.clientX) * 0.12
        targetY = event.clientY + (centerY - event.clientY) * 0.12
      } else {
        targetX = event.clientX
        targetY = event.clientY
      }

      label.textContent = interactive?.dataset.cursorLabel || ''
      cursor.classList.add('is-visible')
      cursor.classList.toggle('is-active', Boolean(interactive))
      cursor.classList.toggle('is-right-edge', event.clientX > window.innerWidth - 250)
      cursor.classList.toggle('is-bottom-edge', event.clientY > window.innerHeight - 80)
    }

    const hideCursor = () => cursor.classList.remove('is-visible', 'is-active')
    const showCursor = () => cursor.classList.add('is-visible')
    const handlePointerDown = () => cursor.classList.add('is-pressed')
    const handlePointerUp = () => cursor.classList.remove('is-pressed')

    window.addEventListener('pointermove', updateTarget, { passive: true })
    document.documentElement.addEventListener('pointerleave', hideCursor)
    document.documentElement.addEventListener('pointerenter', showCursor)
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove('has-brand-cursor')
      window.removeEventListener('pointermove', updateTarget)
      document.documentElement.removeEventListener('pointerleave', hideCursor)
      document.documentElement.removeEventListener('pointerenter', showCursor)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  return (
    <div className="brand-cursor" ref={cursorRef} aria-hidden="true">
      <span className="brand-cursor-reticle">
        <span className="brand-cursor-core" />
      </span>
      <span className="brand-cursor-label" ref={labelRef} />
    </div>
  )
}

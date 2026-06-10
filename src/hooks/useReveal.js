import { useEffect, useRef } from 'react'

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.reveal, .stagger').forEach((el) => el.classList.add('is-in'))
        e.target.classList.add('is-in')
      }
    })
  },
  { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
)

export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.querySelectorAll('.reveal, .stagger').forEach((child) => observer.observe(child))
    return () => {
      el.querySelectorAll('.reveal, .stagger').forEach((child) => observer.unobserve(child))
    }
  }, [])
  return ref
}

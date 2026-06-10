import { useEffect, useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme.js'

export default function Nav() {
  const toggleRef = useRef(null)
  const menuRef = useRef(null)
  const scrollTopRef = useRef(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggle: toggleTheme } = useTheme()
  const { scrollYProgress } = useScroll()

  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open)
    toggleRef.current?.setAttribute('aria-expanded', String(open))
    menuRef.current?.setAttribute('aria-hidden', String(!open))
  }

  useEffect(() => {
    setMenu(false)

    if (location.pathname === '/' && scrollTopRef.current) {
      scrollTopRef.current = false
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
      return
    }

    if (location.pathname === '/' && location.hash && !location.hash.startsWith('#project-')) {
      const sectionId = location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [location])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false)
    }
    const onResize = () => {
      if (window.innerWidth > 1024 && document.body.classList.contains('menu-open')) setMenu(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const goToSection = (id) => {
    setMenu(false)

    if (location.pathname !== '/') {
      navigate(`/#${id}`)
      return
    }

    window.history.replaceState(null, '', `/#${id}`)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goToTop = (event) => {
    event.preventDefault()
    setMenu(false)

    if (location.pathname !== '/') {
      scrollTopRef.current = true
      navigate('/')
      return
    }

    window.history.replaceState(null, '', '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <div className="nav-scroll-track" aria-hidden="true">
          <motion.span style={{ scaleX: scrollYProgress }} />
        </div>
        <Link to="/" className="mark" onClick={goToTop}>
          創作者姓名<span>.</span>
        </Link>
        <ul>
          <li><a href="/#about" onClick={(e) => { e.preventDefault(); goToSection('about') }}>About</a></li>
          <li><a href="/#works" onClick={(e) => { e.preventDefault(); goToSection('works') }}>Works</a></li>
          <li><a href="/#contact" onClick={(e) => { e.preventDefault(); goToSection('contact') }}>Contact</a></li>
        </ul>
        <div className="nav-right">
          <a href="/#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); goToSection('contact') }}>
            Resume / Contact
          </a>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`目前為${theme === 'dark' ? '深色' : '亮色'}模式，點擊切換`}
            title={`目前為${theme === 'dark' ? '深色' : '亮色'}模式`}
          >
            <span className="theme-symbol" aria-hidden="true">{theme === 'dark' ? '●' : '○'}</span>
            <span className="theme-label">{theme === 'dark' ? '深色' : '亮色'}</span>
          </button>
          <button
            ref={toggleRef}
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle menu"
            aria-expanded="false"
            aria-controls="mobileMenu"
            onClick={() => setMenu(!document.body.classList.contains('menu-open'))}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div ref={menuRef} className="mobile-menu" id="mobileMenu" aria-hidden="true">
        <ul>
          <li><a href="/#about" onClick={(e) => { e.preventDefault(); goToSection('about') }}><span>About</span><span className="num">§ 02</span></a></li>
          <li><a href="/#works" onClick={(e) => { e.preventDefault(); goToSection('works') }}><span>Works</span><span className="num">§ 03</span></a></li>
          <li><a href="/#contact" onClick={(e) => { e.preventDefault(); goToSection('contact') }}><span>Contact</span><span className="num">§ 04</span></a></li>
        </ul>
        <div className="menu-foot">
          <span className="live">Available · Q2 2026</span>
          <span>TPE / 2026</span>
        </div>
      </div>
    </>
  )
}

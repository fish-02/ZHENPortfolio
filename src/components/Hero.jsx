import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const TYPING_TEXT = '說故事的腦。做實事的手。'
const TYPING_SPEED = 80
const PAUSE_AFTER = 2400
const DELETE_SPEED = 40

export default function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const sectionRef = useReveal()

  useEffect(() => {
    let timeout
    if (!isDeleting) {
      if (displayed.length < TYPING_TEXT.length) {
        timeout = setTimeout(() => setDisplayed(TYPING_TEXT.slice(0, displayed.length + 1)), TYPING_SPEED)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(TYPING_TEXT.slice(0, displayed.length - 1)), DELETE_SPEED)
      } else {
        setIsDeleting(false)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting])

  return (
    <>
      <section id="hero" className="hero" ref={sectionRef}>
        <div className="hero-left">
          <div className="hero-tag reveal">Portfolio · Vol. 01 · 2025 / 2026</div>

          <h1
            className="hero-headline hero-headline-dual"
            aria-label="述說者乘以實踐家。A mind for stories. Hands for action."
          >
            <span className="brand-axis reveal" aria-hidden="true">
              <span>Storyteller</span>
              <span className="x-mark">×</span>
              <span>Executor</span>
            </span>

            <span
              className="brand-stage reveal"
              style={{ transitionDelay: '.1s' }}
              tabIndex="0"
              aria-label="將滑鼠移到這裡，從 A Mind for Stories 切換為 Hands for Action"
              data-cursor-label="STORY × ACTION"
              data-cursor-magnetic="true"
            >
              <span className="brand-layer brand-layer-story" aria-hidden="true">
                A Mind for <strong>Stories.</strong>
              </span>
              <span className="brand-layer brand-layer-execution" aria-hidden="true">
                Hands for <strong>Action.</strong>
              </span>
              <span className="brand-crosshair" />
            </span>
          </h1>

          <div className="hero-sub-wrap reveal" style={{ transitionDelay: '.2s' }}>
            <div className="hero-typing">
              {displayed}<span className="cursor" />
            </div>
            <p className="hero-tagline">
              讓複雜的事情，變得清晰可執行。
            </p>
          </div>

          <div className="hero-cta reveal" style={{ transitionDelay: '.35s' }}>
            <a href="#works" className="btn-primary" data-cursor-label="VIEW PROJECTS" data-cursor-magnetic="true" onClick={(e) => { e.preventDefault(); document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' }) }}>
              看精選作品 <span className="arr">↓</span>
            </a>
            <a href="#contact" className="btn-ghost" data-cursor-label="START A CONVERSATION" data-cursor-magnetic="true" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              直接聯絡 →
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image">
            <div className="ph">
              <div className="ph-label">[ 個人形象照佔位 ]<br />EDITORIAL — MAGAZINE COVER</div>
              <div className="ph-label2">CREATOR<br />2026 EDITION</div>
            </div>
            <div className="hero-year">2026</div>
          </div>
        </div>

        <div className="hero-status">
          <div className="live">Available · Q2 2026</div>
          <div>Based in Taipei</div>
          <div>EN / 中文</div>
        </div>

        <div className="scroll-hint">
          <span className="arrow">↓</span> Scroll to Explore
        </div>
      </section>

      <section className="hero-img-mobile" aria-hidden="true">
        <div className="hero-image">
          <div className="ph">
            <div className="ph-label">[ 個人形象照佔位 ]</div>
            <div className="ph-label2">CREATOR<br />2026</div>
          </div>
          <div className="hero-year">2026</div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>劇場製作</span><span>·</span><span>視覺設計</span><span>·</span>
          <span>活動企劃</span><span>·</span><span>攝影</span><span>·</span>
          <span>世界觀設計</span><span>·</span><span>小說撰寫</span><span>·</span>
          <span>文案企劃</span><span>·</span><em>// AVAILABLE FOR COLLABORATION 2026</em><span>·</span>
          <span>劇場製作</span><span>·</span><span>視覺設計</span><span>·</span>
          <span>活動企劃</span><span>·</span><span>攝影</span><span>·</span>
          <span>世界觀設計</span><span>·</span><span>小說撰寫</span><span>·</span>
          <span>文案企劃</span><span>·</span><em>// AVAILABLE FOR COLLABORATION 2026</em><span>·</span>
        </div>
      </div>
    </>
  )
}

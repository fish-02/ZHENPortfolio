import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function CTAFooter() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formsubmit.co/ajax/vincent0215qaz@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `[Portfolio] 來自 ${form.name} 的訊息`,
          _captcha: 'false',
        }),
      })
      const data = await res.json()
      if (data.success === 'true' || data.success === true) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="cta-footer" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head" style={{ borderBottom: 'none', paddingBottom: '24px' }}>
          <div>
            <div className="section-num reveal">§ 05 / Contact</div>
          </div>
          <div className="section-meta reveal" style={{ transitionDelay: '.2s' }}>
            Reply within 48h<br />Mon — Fri / TPE
          </div>
        </div>

        <h2 className="cta-head reveal">
          <span className="en">Let's Talk</span>
          讓我們一起<br /><span className="accent">聊聊</span>。
        </h2>

        <div className="cta-grid">
          {/* LEFT: Info + Links */}
          <div className="cta-info reveal">
            <div className="cta-block">
              <div className="k">Location</div>
              <div className="v">Taipei, Taiwan</div>
            </div>
            <div className="cta-block">
              <div className="k">Availability</div>
              <div className="v" style={{ fontSize: '20px', color: '#cfcfcf' }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', marginRight: 10, verticalAlign: 'middle' }} />
                Open · Q2 2026
              </div>
            </div>
            <div className="cta-links">
              <a href="https://mail.google.com/mail/?view=cm&to=vincent0215qaz@gmail.com" target="_blank" rel="noopener noreferrer" className="cta-link-row" data-cursor-label="START A CONVERSATION" data-cursor-magnetic="true">
                <span>01 / Direct</span>
                Email →
              </a>
              <a href="#" className="cta-link-row" data-cursor-label="CONNECT" data-cursor-magnetic="true">
                <span>02 / Professional</span>
                LinkedIn →
              </a>
              <a href="https://www.instagram.com/zh_e_n_ash/" target="_blank" rel="noopener noreferrer" className="cta-link-row" data-cursor-label="VIEW VISUAL DIARY" data-cursor-magnetic="true">
                <span>03 / Visual Diary</span>
                Instagram →
              </a>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="reveal" style={{ transitionDelay: '.15s' }}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="cf-name">姓名 Name</label>
                <input
                  id="cf-name"
                  className="contact-form-input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="你的名字"
                  disabled={status === 'loading'}
                />
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="cf-email">電子郵件 Email</label>
                <input
                  id="cf-email"
                  className="contact-form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  disabled={status === 'loading'}
                />
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="cf-msg">訊息 Message</label>
                <textarea
                  id="cf-msg"
                  className="contact-form-textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="說說你的想法..."
                  disabled={status === 'loading'}
                />
              </div>
              {status === 'success' && (
                <div className="contact-form-msg success">訊息已送出，我會盡快回覆。</div>
              )}
              {status === 'error' && (
                <div className="contact-form-msg error">送出失敗，請稍後再試或直接寄信。</div>
              )}
              <button className="contact-form-submit" type="submit" disabled={status === 'loading'} data-cursor-label="SEND MESSAGE" data-cursor-magnetic="true">
                <span>{status === 'loading' ? '送出中⋯' : '送出訊息'}</span>
                <span>{status === 'loading' ? '…' : '→'}</span>
              </button>
            </form>
          </div>
        </div>

        <footer className="site-footer">
          <div><span className="accent-dot" />© 2026 創作者姓名 · All Rights Reserved</div>
          <div>Editorial Modernism · Built in Taipei</div>
          <Link to="/archive" className="site-footer-archive">
            完整作品庫 →
          </Link>
        </footer>
      </div>
    </section>
  )
}

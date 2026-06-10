import { useEffect, useState } from 'react'

export default function MediaGallery({ media }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const hasMedia = Array.isArray(media) && media.length > 0
  const hasMultiple = hasMedia && media.length > 1

  useEffect(() => {
    setActiveIdx(0)
  }, [media])

  const showPrevious = () => {
    if (hasMultiple) setActiveIdx((current) => (current - 1 + media.length) % media.length)
  }

  const showNext = () => {
    if (hasMultiple) setActiveIdx((current) => (current + 1) % media.length)
  }

  if (!hasMedia) {
    return (
      <div className="media-gallery media-gallery-empty">
        <div className="media-main">
          <div className="media-ph">
            <span>[ Media Gallery ]</span>
            <span>圖片 / 影片待填入</span>
          </div>
          <button className="media-arrow media-arrow-prev" type="button" disabled aria-label="上一個媒體">←</button>
          <button className="media-arrow media-arrow-next" type="button" disabled aria-label="下一個媒體">→</button>
          <div className="media-count">00 / 00</div>
        </div>
        <div className="media-thumbs" aria-label="媒體縮圖預留位置">
          {[0, 1, 2, 3].map((slot) => (
            <div className="media-thumb media-thumb-placeholder" key={slot}>
              {String(slot + 1).padStart(2, '0')}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const active = media[activeIdx]

  return (
    <div
      className="media-gallery"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') showPrevious()
        if (e.key === 'ArrowRight') showNext()
      }}
    >
      <div className="media-main">
        {active.type === 'video' ? (
          <iframe
            src={active.url.replace('vimeo.com/', 'player.vimeo.com/video/')}
            width="100%" height="100%"
            style={{ border: 'none', position: 'absolute', inset: 0 }}
            allow="autoplay; fullscreen"
            title="Project video"
          />
        ) : (
          <img src={active.url} alt={active.alt || `Project media ${activeIdx + 1}`} loading="lazy" />
        )}
        {hasMultiple && (
          <>
            <button className="media-arrow media-arrow-prev" type="button" onClick={showPrevious} aria-label="上一個媒體">←</button>
            <button className="media-arrow media-arrow-next" type="button" onClick={showNext} aria-label="下一個媒體">→</button>
          </>
        )}
        <div className="media-count">
          {String(activeIdx + 1).padStart(2, '0')} / {String(media.length).padStart(2, '0')}
        </div>
      </div>
      {hasMultiple && (
        <div className="media-thumbs" aria-label="選擇媒體">
          {media.map((item, i) => (
            <button
              type="button"
              key={`${item.url}-${i}`}
              className={`media-thumb${i === activeIdx ? ' active' : ''}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`View media ${i + 1}`}
              aria-current={i === activeIdx ? 'true' : undefined}
            >
              {item.type === 'image'
                ? <img src={item.url} alt="" loading="lazy" />
                : <span className="media-video-label">VIDEO</span>
              }
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

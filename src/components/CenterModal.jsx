import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import STARContent from './STARContent.jsx'
import MediaGallery from './MediaGallery.jsx'

const CATEGORY_LABEL = {
  Architect: '01 Architect', Maker: '02 Maker', Lens: '03 Lens', Writer: '04 Writer',
}

export default function CenterModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && project) onClose(project.slug) }
    window.addEventListener('keydown', onKey)
    document.body.classList.toggle('drawer-open', !!project)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('drawer-open')
    }
  }, [project, onClose])

  return (
    <>
      <AnimatePresence>
        {project && (
          <motion.div key="modal-backdrop" className="modal-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }} onClick={() => onClose(project.slug)} />
        )}
      </AnimatePresence>
      <div className="modal-centering-wrapper">
        <AnimatePresence>
          {project && (
            <motion.aside key="center-modal" className="center-modal"
              initial={{ y: '100vh' }}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}>
              <div className="modal-header">
                <div>
                  <div className="modal-cat">{CATEGORY_LABEL[project.category] ?? project.category}</div>
                  <h2 className="modal-title">{project.title}</h2>
                </div>
                <button className="modal-close" onClick={() => onClose(project.slug)} aria-label="關閉">✕</button>
              </div>
              <div className="modal-tags">
                <span className="detail-tag tag-cat">{CATEGORY_LABEL[project.category] ?? project.category}</span>
                <span className="detail-tag tag-year">{project.year}</span>
                {project.tags.map((t) => <span key={t} className="detail-tag">{t}</span>)}
              </div>
              <div className="modal-body">
                <STARContent narrative={project.narrative} />
                <MediaGallery media={project.media} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

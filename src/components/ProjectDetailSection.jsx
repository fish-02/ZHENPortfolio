import { AnimatePresence, motion } from 'framer-motion'
import STARContent from './STARContent.jsx'
import MediaGallery from './MediaGallery.jsx'

const CATEGORY_LABEL = {
  Architect: '01 Architect',
  Maker: '02 Maker',
  Lens: '03 Lens',
  Writer: '04 Writer',
}

export default function ProjectDetailSection({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.section
          key={project.id}
          className="detail-section"
          id="project-detail"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 22 }}
          style={{ overflow: 'hidden' }}
        >
          <motion.div
            className="detail-inner"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
          >
            {/* Header */}
            <div className="detail-header">
              <div className="detail-header-left">
                <div className="detail-cat">{CATEGORY_LABEL[project.category] ?? project.category}</div>
                <h2 className="detail-title">{project.title}</h2>
              </div>
              <button className="detail-close" onClick={() => onClose(project.slug)}>
                關閉 ✕
              </button>
            </div>

            {/* Tags */}
            <div className="detail-tags">
              <span className="detail-tag tag-cat">{CATEGORY_LABEL[project.category] ?? project.category}</span>
              <span className="detail-tag tag-year">{project.year}</span>
              {project.tags.map((t) => (
                <span key={t} className="detail-tag">{t}</span>
              ))}
            </div>

            {/* Body: STAR + Media */}
            <div className="detail-body">
              <STARContent narrative={project.narrative} />
              <MediaGallery media={project.media} />
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

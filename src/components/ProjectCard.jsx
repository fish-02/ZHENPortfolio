import { motion } from 'framer-motion'
import ProjectEvidence from './ProjectEvidence.jsx'

const CATEGORY_LABEL = {
  Architect: '01 Architect',
  Maker: '02 Maker',
  Lens: '03 Lens',
  Writer: '04 Writer',
}

export default function ProjectCard({ project, isActive, onClick }) {
  return (
    <motion.article
      className={`featured-card${isActive ? ' active' : ''}`}
      data-slug={project.slug}
      data-cursor-label="VIEW PROJECT"
      data-cursor-magnetic="true"
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(project)
        }
      }}
    >
      <div className="featured-thumb">
        <div className="featured-thumb-media">
          {project.thumbnail
            ? <img src={project.thumbnail} alt={project.title} loading="lazy" />
            : <div className="ph-overlay">[ 縮圖待填入 ]</div>
          }
        </div>
        <ProjectEvidence evidence={project.evidence} />
      </div>
      <div className="featured-cat">{CATEGORY_LABEL[project.category] ?? project.category}</div>
      <h3 className="featured-title">{project.title}</h3>
      <p className="featured-hook">{project.narrative.hook}</p>
      <div className="featured-footer">
        <span className="featured-year">{project.year}</span>
        <span className="featured-arrow">→</span>
      </div>
    </motion.article>
  )
}

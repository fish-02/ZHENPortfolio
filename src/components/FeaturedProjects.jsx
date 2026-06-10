import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import projectsData from '../data/projects.json'
import ProjectEvidence from './ProjectEvidence.jsx'

const CATEGORY_LABEL = {
  Architect: '01 Architect',
  Maker: '02 Maker',
  Lens: '03 Lens',
  Writer: '04 Writer',
}

export default function FeaturedProjects({ onProjectClick }) {
  const sectionRef = useRef(null)

  const featured = [...projectsData.projects]
    .filter((p) => !p.metadata.show_in_archive_only)
    .sort((a, b) => b.metadata.featured_score.total - a.metadata.featured_score.total)
    .slice(0, 3)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    )
    sectionRef.current?.querySelectorAll('.reveal, .stagger').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="featured" className="featured" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="section-num reveal">§ 03 / Featured Projects</div>
            <h2 className="section-title reveal" style={{ transitionDelay: '.1s' }}>
              精選<span className="accent">主打星</span>
            </h2>
          </div>
          <div className="section-meta reveal" style={{ transitionDelay: '.2s' }}>
            Auto-selected<br />by Score Matrix
          </div>
        </div>
      </div>

      <div className="featured-grid stagger">
        {featured.map((project) => (
          <motion.article
            key={project.id}
            className="featured-card"
            onClick={() => onProjectClick(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onProjectClick(project)
              }
            }}
            data-slug={project.slug}
            data-cursor-label="VIEW PROJECT"
            data-cursor-magnetic="true"
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
        ))}
      </div>
    </section>
  )
}

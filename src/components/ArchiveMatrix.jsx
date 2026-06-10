import { useState, useMemo, useEffect, useRef } from 'react'
import projectsData from '../data/projects.json'
import FilterNav from './FilterNav.jsx'
import ProjectCard from './ProjectCard.jsx'

export default function ArchiveMatrix({ onProjectClick, activeProjectId }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeYear, setActiveYear] = useState(null)
  const sectionRef = useRef(null)

  const mainProjects = projectsData.projects.filter((p) => !p.metadata.show_in_archive_only)

  const years = useMemo(
    () => [...new Set(mainProjects.map((p) => p.year))].sort((a, b) => b - a),
    [mainProjects]
  )

  const filtered = useMemo(() => {
    return mainProjects.filter((p) => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory
      const yearMatch = activeYear === null || p.year === activeYear
      return catMatch && yearMatch
    })
  }, [mainProjects, activeCategory, activeYear])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="works" className="archive" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="section-num reveal">§ 04 / Archive Matrix</div>
            <h2 className="section-title reveal" style={{ transitionDelay: '.1s' }}>
              作品<span className="accent">總覽</span>
            </h2>
          </div>
          <div className="section-meta reveal" style={{ transitionDelay: '.2s' }}>
            {mainProjects.length} Projects<br />
            2024 — 2025
          </div>
        </div>
      </div>

      <FilterNav
        activeCategory={activeCategory}
        activeYear={activeYear}
        years={years}
        onCategory={setActiveCategory}
        onYear={setActiveYear}
      />

      <div className="project-grid">
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isActive={project.id === activeProjectId}
            onClick={onProjectClick}
          />
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '80px 56px', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '.22em' }}>
            NO PROJECTS IN THIS CATEGORY YET
          </div>
        )}
      </div>
    </section>
  )
}

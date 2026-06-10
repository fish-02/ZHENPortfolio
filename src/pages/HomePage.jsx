import { useState, useEffect } from 'react'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import FeaturedProjects from '../components/FeaturedProjects.jsx'
import ArchiveMatrix from '../components/ArchiveMatrix.jsx'
import CenterModal from '../components/CenterModal.jsx'
import CTAFooter from '../components/CTAFooter.jsx'
import projectsData from '../data/projects.json'

export default function HomePage() {
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#project-')) {
      const slug = hash.replace('#project-', '')
      const project = projectsData.projects.find((p) => p.slug === slug)
      if (project) setActiveProject(project)
    }
  }, [])

  const handleProjectClick = (project) => {
    setActiveProject(project)
    window.history.pushState(null, '', `/#project-${project.slug}`)
  }

  const handleDetailClose = () => {
    setActiveProject(null)
    window.history.pushState(null, '', '/')
  }

  return (
    <main>
      <Hero />
      <About />
      <FeaturedProjects onProjectClick={handleProjectClick} />
      <ArchiveMatrix onProjectClick={handleProjectClick} activeProjectId={activeProject?.id} />
      <CTAFooter />
      <CenterModal project={activeProject} onClose={handleDetailClose} />
    </main>
  )
}

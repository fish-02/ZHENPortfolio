import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import HomePage from './pages/HomePage.jsx'
import ArchivePage from './pages/ArchivePage.jsx'
import BrandCursor from './components/BrandCursor.jsx'

export default function App() {
  return (
    <>
      <BrandCursor />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
    </>
  )
}

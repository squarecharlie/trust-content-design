import { useState, useEffect } from 'react'
import './App.css'
import SlideDeck from './components/SlideDeck'
import SlideCounter from './components/SlideCounter'

function App() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const totalSlides = 26

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const newSlide = Math.round(scrollPosition / windowHeight) + 1
      setCurrentSlide(Math.min(newSlide, totalSlides))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <SlideDeck />
      <SlideCounter current={currentSlide} total={totalSlides} />
    </div>
  )
}

export default App

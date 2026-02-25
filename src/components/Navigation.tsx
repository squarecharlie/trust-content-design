import React from 'react'
import './Navigation.css'

interface NavigationProps {
  currentSlide: number
  totalSlides: number
  onNavigate: (index: number) => void
}

const Navigation: React.FC<NavigationProps> = ({ currentSlide, totalSlides, onNavigate }) => {
  return (
    <div className="navigation">
      <div className="nav-dots">
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            className={`nav-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => onNavigate(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      <div className="nav-counter">
        {currentSlide + 1} / {totalSlides}
      </div>
      <div className="nav-arrows">
        {currentSlide > 0 && (
          <button
            className="nav-arrow nav-arrow-up"
            onClick={() => onNavigate(currentSlide - 1)}
            aria-label="Previous slide"
          >
            ↑
          </button>
        )}
        {currentSlide < totalSlides - 1 && (
          <button
            className="nav-arrow nav-arrow-down"
            onClick={() => onNavigate(currentSlide + 1)}
            aria-label="Next slide"
          >
            ↓
          </button>
        )}
      </div>
    </div>
  )
}

export default Navigation

import React from 'react'
import './Slide.css'

interface SlideProps {
  children: React.ReactNode
  className?: string
}

const Slide: React.FC<SlideProps> = ({ children, className = '' }) => {
  return (
    <div className={`slide ${className}`}>
      {children}
    </div>
  )
}

export default Slide

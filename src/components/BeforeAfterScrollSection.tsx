import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion'

interface BeforeAfterScrollSectionProps {
  children: React.ReactNode
}

export const BeforeAfterScrollSection = ({ children }: BeforeAfterScrollSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [showDebug, setShowDebug] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Toggle debug with D key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D') {
        setShowDebug(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Track scroll progress through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Before image: -100% to 0% (left to center)
  const beforeX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['-120%', '0%'])

  // After image: 100% to 0% (right to center)
  const afterX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['120%', '0%'])

  return (
    <div ref={containerRef} className="before-after-scroll-container">
      {/* Debug overlay */}
      {showDebug && (
        <motion.div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
            zIndex: 10000,
            pointerEvents: 'none'
          }}
        >
          Progress: {scrollYProgress.get().toFixed(2)}
        </motion.div>
      )}

      {/* Sticky section wrapper */}
      <div ref={sectionRef} className="before-after-sticky-wrapper">
        <div className="before-after-content">
          {children}
        </div>
      </div>
    </div>
  )
}

// Hook to get the transform values for the images
export const useBeforeAfterAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const beforeX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['-120%', '0%']
  )

  const afterX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['120%', '0%']
  )

  return { containerRef, beforeX, afterX, scrollYProgress }
}

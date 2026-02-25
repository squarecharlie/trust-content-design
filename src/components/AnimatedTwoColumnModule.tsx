import { useState, useEffect, useRef } from 'react'
import './AnimatedTwoColumnModule.css'

// State machine states
type AnimationState =
  | 'idle'           // Not in viewport
  | 'enter'          // Module sliding up into view
  | 'cycling'        // Cycling through phrases
  | 'exit'           // Module sliding up out of view
  | 'complete'       // Animation finished

interface Phrase {
  text: string
  html?: boolean
}

interface ModuleData {
  leftColumn: string
  rightPhrases: Phrase[]
}

interface AnimatedTwoColumnModuleProps {
  modules: ModuleData[]
  phraseDisplayDuration?: number  // ms to show each phrase (default: 1600)
  crossfadeDuration?: number      // ms for crossfade (default: 300)
  slideUpDuration?: number        // ms for module transitions (default: 600)
}

export default function AnimatedTwoColumnModule({
  modules,
  phraseDisplayDuration = 1600,
  crossfadeDuration = 300,
  slideUpDuration = 600
}: AnimatedTwoColumnModuleProps) {
  const [state, setState] = useState<AnimationState>('idle')
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isPhraseFading, setIsPhraseFading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // IntersectionObserver to trigger animation
  useEffect(() => {
    if (!containerRef.current) return
    if (prefersReducedMotion.current) {
      setState('cycling')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && state === 'idle') {
            setState('enter')
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [state])

  // State machine controller
  useEffect(() => {
    if (prefersReducedMotion.current) return

    let timeoutId: number

    switch (state) {
      case 'enter':
        // Wait for enter animation, then start cycling
        timeoutId = window.setTimeout(() => {
          setState('cycling')
        }, slideUpDuration)
        break

      case 'cycling':
        const currentModule = modules[currentModuleIndex]
        const isLastPhrase = currentPhraseIndex === currentModule.rightPhrases.length - 1
        const isLastModule = currentModuleIndex === modules.length - 1

        if (isLastPhrase && isLastModule) {
          // All done, stay on last phrase
          return
        }

        if (isLastPhrase) {
          // Move to next module
          timeoutId = window.setTimeout(() => {
            setState('exit')
          }, phraseDisplayDuration)
        } else {
          // Crossfade to next phrase
          timeoutId = window.setTimeout(() => {
            setIsPhraseFading(true)

            window.setTimeout(() => {
              setCurrentPhraseIndex(prev => prev + 1)
              setIsPhraseFading(false)
            }, crossfadeDuration)
          }, phraseDisplayDuration)
        }
        break

      case 'exit':
        // Wait for exit animation, then move to next module
        timeoutId = window.setTimeout(() => {
          setCurrentModuleIndex(prev => prev + 1)
          setCurrentPhraseIndex(0)
          setState('enter')
        }, slideUpDuration)
        break
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [
    state,
    currentModuleIndex,
    currentPhraseIndex,
    modules,
    phraseDisplayDuration,
    crossfadeDuration,
    slideUpDuration
  ])

  if (modules.length === 0) return null

  const currentModule = modules[currentModuleIndex]
  const currentPhrase = currentModule.rightPhrases[currentPhraseIndex]

  // Container classes based on state
  const containerClasses = [
    'animated-two-column-module',
    state === 'enter' ? 'module-entering' : '',
    state === 'exit' ? 'module-exiting' : '',
    (state === 'cycling' || state === 'complete') ? 'module-visible' : '',
    prefersReducedMotion.current ? 'reduced-motion' : ''
  ].filter(Boolean).join(' ')

  // Phrase classes for crossfade
  const phraseClasses = [
    'right-phrase',
    isPhraseFading ? 'phrase-fading' : 'phrase-visible'
  ].join(' ')

  return (
    <div ref={containerRef} className={containerClasses}>
      <div className="module-content">
        <div className="column-left">
          <h2>{currentModule.leftColumn}</h2>
        </div>
        <div className="column-right">
          <div className={phraseClasses}>
            {currentPhrase.html ? (
              <h2 dangerouslySetInnerHTML={{ __html: currentPhrase.text }} />
            ) : (
              <h2>{currentPhrase.text}</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

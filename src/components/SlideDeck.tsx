import { useEffect, useState, useRef } from 'react'
import './SlideDeck.css'
import emailImage from '../images/emailtemplate.png'
import trustLogo from '../images/trust design logo.svg'
import matrixSvg from '../images/matrix.svg'
import commsProcessImage from '../images/comms-process.png'
import disputeBeforeImage from '../images/new-dispute-before.png'
import disputeAfterImage from '../images/new-dispute-after.png'
import feedbackImage from '../images/feedback.png'
import contentfulImage from '../images/contentful.png'
import establishIdentityVideo from '../video/establish identity .mp4'
import handlingProblemsVideo from '../video/handling problems.mp4'
import gettingHelpVideo from '../video/getting help.mp4'

const SlideDeck = () => {
  const [gptPrompt, setGptPrompt] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState<{subject: string, body: string} | null>(null)
  const [gptTextPopulated, setGptTextPopulated] = useState(false)
  const gptTextPopulatedRef = useRef(false)

  const generateEmail = (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase()

    // Account verification scenario
    if (lowerPrompt.includes('verification') || lowerPrompt.includes('verify') || lowerPrompt.includes('identity')) {
      return {
        subject: 'Action required: Verify your identity',
        body: `<p><strong>Verify your identity</strong></p>

<p>Hi [First Name],</p>

<p>We need to verify your identity to keep your account secure. This helps us protect your business and ensure you have full access to your funds.</p>

<p><strong>What's affected:</strong> Your account access is temporarily limited until we can confirm your identity.</p>

<p><strong>What you need to do:</strong> Upload a photo of your government-issued ID by March 15, 2024.</p>

<p>Once we receive and review your information, we'll restore full access to your account within 24–48 hours.</p>

<p>If you have questions, visit our <span style="text-decoration: underline">Support Center</span>.</p>`
      }
    }

    // Dispute scenario
    if (lowerPrompt.includes('dispute') || lowerPrompt.includes('chargeback')) {
      return {
        subject: 'Action required: Respond to dispute',
        body: `<p><strong>Respond to a dispute</strong></p>

<p>Hi [First Name],</p>

<p>A customer disputed a $150 payment from February 20, 2024. We're here to help you resolve this.</p>

<p><strong>What's affected:</strong> $150 is temporarily on hold until the dispute is resolved.</p>

<p><strong>What you need to do:</strong> Submit evidence by March 5, 2024. This can include receipts, proof of delivery, or customer communication.</p>

<p>We'll review your response and work to resolve this within 5–7 business days. If the dispute is decided in your favor, the funds will be released to your balance.</p>

<p>Need help? Visit our <span style="text-decoration: underline">Dispute Guide</span>.</p>`
      }
    }

    // Account hold/restriction scenario
    if (lowerPrompt.includes('hold') || lowerPrompt.includes('restricted') || lowerPrompt.includes('limited')) {
      return {
        subject: 'Action required: Account review in progress',
        body: `<p><strong>Complete your account review</strong></p>

<p>Hi [First Name],</p>

<p>We're reviewing your account to ensure everything is secure. To complete this review, we need some information from you.</p>

<p><strong>What's affected:</strong> Your deposits are temporarily on hold until we complete this review.</p>

<p><strong>What you need to do:</strong> Provide recent bank statements and business details by March 10, 2024.</p>

<p>Once we receive your information, we'll complete our review within 48 hours and restore access to your funds.</p>

<p>Questions? Visit our <span style="text-decoration: underline">Support Center</span>.</p>`
      }
    }

    // Fraud alert scenario
    if (lowerPrompt.includes('fraud') || lowerPrompt.includes('suspicious') || lowerPrompt.includes('unusual')) {
      return {
        subject: 'Action required: Confirm recent activity',
        body: `<p><strong>Confirm your recent transactions</strong></p>

<p>Hi [First Name],</p>

<p>We noticed unusual activity on your account and paused some features to keep your business safe.</p>

<p><strong>What's affected:</strong> The ability to transfer funds is temporarily paused.</p>

<p><strong>What you need to do:</strong> Review your recent transactions and confirm whether you recognize them. This should take less than 5 minutes.</p>

<p>Once confirmed, we'll restore full access to your account immediately.</p>

<p>Need help? Contact our <span style="text-decoration: underline">Support Team</span>.</p>`
      }
    }

    // Deactivation scenario
    if (lowerPrompt.includes('deactivat') || lowerPrompt.includes('closed') || lowerPrompt.includes('terminated')) {
      return {
        subject: 'Your Square account access',
        body: `<p><strong>Account access update</strong></p>

<p>Hi [First Name],</p>

<p>We've made the difficult decision to end our service relationship. Your Square account is no longer active.</p>

<p><strong>What happens next:</strong> Any balance in your account will be transferred to your linked bank account within 180 days, per our terms of service.</p>

<p><strong>What you can do:</strong> You can access your transaction history and download reports until June 1, 2024.</p>

<p>If you believe this was made in error, you can submit an appeal by March 1, 2024. Visit our <span style="text-decoration: underline">Help Center</span> to learn more about the appeals process.</p>`
      }
    }

    // Default/general inquiry
    return {
      subject: 'Action required: Update your account',
      body: `<p><strong>Update needed for your account</strong></p>

<p>Hi [First Name],</p>

<p>We need some information to keep your Square account up to date and secure.</p>

<p><strong>What's affected:</strong> Some features may be limited until we receive the requested information.</p>

<p><strong>What you need to do:</strong> Update your business information by March 15, 2024.</p>

<p>Once we receive your updates, we'll review them within 24–48 hours.</p>

<p>Questions? Visit our <span style="text-decoration: underline">Support Center</span>.</p>`
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (gptPrompt.trim()) {
      const email = generateEmail(gptPrompt)
      setGeneratedEmail(email)

      // Advance to next slide (email template)
      setTimeout(() => {
        document.getElementById('slide-11')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }

  const handleClear = () => {
    setGptPrompt('')
    setGeneratedEmail(null)
  }

  // Scroll to top and clear input on page load
  useEffect(() => {
    window.scrollTo(0, 0)
    setGptPrompt('')
    setGeneratedEmail(null)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          console.log('Slide activated:', entry.target.id)

          // Reset Risk GPT state when slide becomes active
          if (entry.target.id === 'slide-10') {
            setGptPrompt('')
            setGptTextPopulated(false)
            gptTextPopulatedRef.current = false
          }

          // Show/hide fixed left text for slides 1, 1b, 1c
          const fixedLeftText = document.querySelector('.fixed-left-text')
          if (fixedLeftText) {
            if (entry.target.id === 'slide-1' || entry.target.id === 'slide-1b' || entry.target.id === 'slide-1c') {
              fixedLeftText.classList.add('visible')
            } else {
              fixedLeftText.classList.remove('visible')
            }
          }

          // Show/hide "They matter" overlay for slides 3, 4, 5, 5a
          const matterOverlay = document.querySelector('.matter-fixed-overlay')
          if (matterOverlay) {
            if (entry.target.id === 'slide-3' || entry.target.id === 'slide-4' ||
                entry.target.id === 'slide-5' || entry.target.id === 'slide-5a') {
              matterOverlay.classList.add('visible')
            } else {
              matterOverlay.classList.remove('visible')
            }
          }
        } else {
          entry.target.classList.remove('active')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const slides = document.querySelectorAll('.slide')

    slides.forEach(slide => observer.observe(slide))

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return

      e.preventDefault()

      const slides = Array.from(document.querySelectorAll('.slide'))

      // Find the currently visible slide
      let currentIndex = 0
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i] as HTMLElement
        const slideTop = slide.offsetTop
        const slideBottom = slideTop + slide.offsetHeight

        if (scrollPosition >= slideTop && scrollPosition < slideBottom) {
          currentIndex = i
          break
        }
      }

      if (e.key === 'ArrowDown' && currentIndex < slides.length - 1) {
        // Special handling for Risk GPT slide
        if (slides[currentIndex].id === 'slide-10' && !gptTextPopulatedRef.current) {
          setGptPrompt('write an email about credit disputes')
          setGptTextPopulated(true)
          gptTextPopulatedRef.current = true
          return // Don't navigate to next slide
        }
        slides[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        slides[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    // Handle scroll wheel for Risk GPT slide
    const handleWheel = (e: WheelEvent) => {
      const slides = Array.from(document.querySelectorAll('.slide'))
      const scrollPosition = window.scrollY + window.innerHeight / 2

      let currentSlide = null
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i] as HTMLElement
        const slideTop = slide.offsetTop
        const slideBottom = slideTop + slide.offsetHeight

        if (scrollPosition >= slideTop && scrollPosition < slideBottom) {
          currentSlide = slide
          break
        }
      }

      // If on Risk GPT slide, scrolling down, and text not populated
      if (currentSlide?.id === 'slide-10' && e.deltaY > 0 && !gptTextPopulatedRef.current) {
        e.preventDefault()
        setGptPrompt('write an email about credit disputes')
        setGptTextPopulated(true)
        gptTextPopulatedRef.current = true
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      slides.forEach(slide => observer.unobserve(slide))
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className="slide-deck">
      <a
        href="#slide-0"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        style={{ cursor: 'pointer' }}
      >
        <img src={trustLogo} alt="Trust Design Team" className="trust-logo" />
      </a>

      {/* Slide 1 - Gentle: Opening slide, big reveal moment with gravitas */}
      <section id="slide-0" className="slide motion-gentle">
        <div className="slide-content" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
          <h1>
            Trust Content Design:<br/>
            <span style={{ opacity: 0.3 }}>words when they matter</span><span className="cursor-blink-inline">|</span>
          </h1>
        </div>
        <div className="keyboard-nav-indicator">
          <div className="keyboard-keys">
            <div className="keyboard-key">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>
            <div className="keyboard-key">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          <span className="keyboard-hint">Use arrow keys to navigate or scroll</span>
        </div>
      </section>

      {/* Slide 2a - Steady: First critical flow - animate both columns */}
      <section id="slide-1" className="slide motion-steady">
        <div className="slide-content two-column" style={{ justifyContent: 'center', alignItems: 'start', paddingTop: '3vh' }}>
          <div className="column-left" style={{ visibility: 'hidden' }}>
            <h2>The Trust team handles some of the most critical flows</h2>
          </div>
          <div className="column-right" style={{
            borderRadius: '80px',
            height: '75vh',
            maxHeight: '800px',
            minWidth: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <video
              src={establishIdentityVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0
              }}
            />
            <h2 style={{
              position: 'relative',
              zIndex: 1,
              color: '#ffffff',
              fontWeight: '700'
            }}>Establishing<br/>your identity</h2>
          </div>
        </div>
      </section>

      {/* Slide 2b - Steady: Second critical flow - keep left fixed */}
      <section id="slide-1b" className="slide motion-steady slide-fixed-left">
        <div className="slide-content two-column" style={{ justifyContent: 'center', alignItems: 'start', paddingTop: '3vh' }}>
          <div className="column-left fixed-text" style={{ visibility: 'hidden' }}>
            <h2>The Trust team handles some of the most critical flows</h2>
          </div>
          <div className="column-right" style={{
            borderRadius: '80px',
            height: '75vh',
            maxHeight: '800px',
            minWidth: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <video
              src={handlingProblemsVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0
              }}
            />
            <h2 style={{
              position: 'relative',
              zIndex: 1,
              color: '#ffffff',
              fontWeight: '700'
            }}>Handling<br/>problems</h2>
          </div>
        </div>
      </section>

      {/* Slide 2c - Steady: Third critical flow - keep left fixed */}
      <section id="slide-1c" className="slide motion-steady slide-fixed-left">
        <div className="slide-content two-column" style={{ justifyContent: 'center', alignItems: 'start', paddingTop: '3vh' }}>
          <div className="column-left fixed-text" style={{ visibility: 'hidden' }}>
            <h2>The Trust team handles some of the most critical flows</h2>
          </div>
          <div className="column-right" style={{
            borderRadius: '80px',
            height: '75vh',
            maxHeight: '800px',
            minWidth: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <video
              src={gettingHelpVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0
              }}
            />
            <h2 style={{
              position: 'relative',
              zIndex: 1,
              color: '#ffffff',
              fontWeight: '700'
            }}>Getting help</h2>
          </div>
        </div>
      </section>

      {/* Fixed left text for slides 2-4 */}
      <div className="fixed-left-text">
        <h2>The Trust team handles some of the most critical flows</h2>
      </div>

      {/* Slide 3 - Soft: Reflective statement that needs breathing room */}
      <section id="slide-2" className="slide motion-soft">
        <div className="slide-content">
          <h2>Words matter in these<br/>spaces</h2>
        </div>
      </section>

      {/* Fixed "They matter" text that persists across slides 3-5a */}
      <div className="matter-fixed-overlay">
        <h2>They matter</h2>
      </div>

      {/* Slide 6 - Steady: Continuation of thought, standard pace */}
      <section id="slide-3" className="slide motion-steady matter-sequence-slide">
        <div className="slide-content matter-slide">
          <div className="matter-word-container">
            <h2 className="matter-word-practically" style={{ opacity: 0.3 }}>practically.</h2>
          </div>
        </div>
      </section>

      {/* Slide 5 - Fast: Short, punchy statement needs immediate impact */}
      <section id="slide-4" className="slide motion-fast matter-sequence-slide">
        <div className="slide-content matter-slide">
          <div className="matter-word-container">
            <h2 className="matter-word-legally" style={{ opacity: 0.3 }}>legally.</h2>
          </div>
        </div>
      </section>

      {/* Slide 8 - Soft: Emotional weight needs room to breathe */}
      <section id="slide-5" className="slide motion-soft matter-sequence-slide">
        <div className="slide-content matter-slide">
          <div className="matter-word-container">
            <h2 className="matter-word-emotionally" style={{ opacity: 0.3 }}>emotionally.</h2>
          </div>
        </div>
      </section>

      {/* Slide 6a - Soft: Code Red emphasis */}
      <section id="slide-5a" className="slide motion-soft matter-sequence-slide">
        <div className="slide-content matter-slide">
          <div className="matter-word-container">
            <h2 className="matter-word-codered">for <span style={{ color: '#ff0000' }}>Code Red.</span></h2>
          </div>
        </div>
      </section>

      {/* Slide 7 - Steady: Big stat slide, let the number speak for itself */}
      <section id="slide-6" className="slide motion-steady">
        <div className="slide-content stat-slide">
          <div className="big-number">
            <span className="digit" style={{animationDelay: '0ms'}}>4</span>
            <span className="digit" style={{animationDelay: '100ms'}}>0</span>
            <span className="digit" style={{animationDelay: '200ms'}}>%</span>
          </div>
          <p className="stat-description">of our product design time is content heavy projects like emails and notifs</p>
        </div>
      </section>

      {/* Slide 7a - Steady: Alignment stat */}
      <section id="slide-6a" className="slide motion-steady">
        <div className="slide-content stat-slide">
          <div className="big-number">
            <span className="digit" style={{animationDelay: '0ms'}}>2</span>
            <span className="digit" style={{animationDelay: '100ms'}}>0</span>
            <span className="digit" style={{animationDelay: '200ms'}}>%</span>
          </div>
          <p className="stat-description">of our time is spent getting alignment on content from legal, compliance and products</p>
        </div>
      </section>

      {/* Slide 8 - Steady: Another stat, consistent with previous for rhythm */}
      <section id="slide-7" className="slide motion-steady">
        <div className="slide-content stat-slide">
          <div className="big-number">
            <span className="digit" style={{animationDelay: '0ms'}}>1</span>
            <span className="digit" style={{animationDelay: '100ms'}}>0</span>
            <span className="digit" style={{animationDelay: '200ms'}}>0</span>
            <span className="digit" style={{animationDelay: '300ms'}}>%</span>
          </div>
          <p className="stat-description">of our projects have business critical copy with legal and compliance implications</p>
        </div>
      </section>

      {/* Slide 9 - Gentle: Dramatic reveal, punch line that needs weight */}
      <section id="slide-8" className="slide motion-gentle">
        <div className="slide-content stat-slide">
          <div className="big-number">
            <span className="digit" style={{animationDelay: '0ms'}}>0</span>
          </div>
          <p className="stat-description">content designers</p>
        </div>
      </section>

      {/* Slide 8-opportunities - Steady: Where we are today (duplicate of slide 30) */}
      <section id="slide-8-opportunities" className="slide motion-steady">
        <div className="slide-content" style={{ padding: '70px 80px', justifyContent: 'flex-start' }}>
          <h2 style={{
            marginBottom: '70px',
            fontSize: '3.5rem',
            fontWeight: '400',
            letterSpacing: '-0.02em',
            lineHeight: '0.85'
          }}>Where we are today</h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            maxWidth: '1100px',
            margin: '0',
            width: '100%'
          }}>
            {/* Level 1 - Strategy */}
            <div className="opportunities-module" style={{
              background: '#000000',
              padding: '48px 52px',
              borderRadius: '16px',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: '#ffffff',
                color: '#000000',
                padding: '6px 14px',
                borderRadius: '14px',
                fontSize: '0.65rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>Unexplored</div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '20px',
                opacity: 0.6,
                textAlign: 'center'
              }}>Level 1 — Strategy</div>
              <h3 style={{
                fontSize: '2.8rem',
                fontWeight: '400',
                marginBottom: '20px',
                lineHeight: '0.9',
                letterSpacing: '-0.02em',
                textAlign: 'center',
                color: '#ffffff'
              }}>
                Strategic Content Leadership
              </h3>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.6',
                opacity: 0.85,
                fontWeight: '400',
                marginBottom: '24px',
                textAlign: 'center',
                color: '#ffffff'
              }}>
                Set voice and disclosure rules for trust moments. Create decision frameworks that tell good sellers enough without educating bad actors. Define what we say, to whom, and where the line is.
              </p>
              <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '5%',
                  height: '100%',
                  backgroundColor: '#9e9e9e',
                  borderRadius: '6px'
                }}></div>
              </div>
            </div>

            {/* Level 2 - Approach */}
            <div className="opportunities-module" style={{
              background: 'linear-gradient(135deg, #f2f2f2 0%, #e0e0e0 100%)',
              padding: '48px 52px',
              borderRadius: '16px',
              color: '#000000',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '14px',
                fontSize: '0.65rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>Just Starting</div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '20px',
                opacity: 0.5,
                textAlign: 'center'
              }}>Level 2 — Approach</div>
              <h3 style={{
                fontSize: '2.8rem',
                fontWeight: '400',
                marginBottom: '20px',
                lineHeight: '0.9',
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}>
                Operational Framework
              </h3>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.6',
                opacity: 0.75,
                fontWeight: '400',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                Intake, prioritize, and govern content requests. Align stakeholders. Scale execution with tools like Risk GPT.
              </p>
              <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '15%',
                  height: '100%',
                  backgroundColor: '#6e6e6e',
                  borderRadius: '6px'
                }}></div>
              </div>
            </div>

            {/* Level 3 - Execution */}
            <div className="opportunities-module" style={{
              background: 'linear-gradient(135deg, #f8f8f8 0%, #ececec 100%)',
              padding: '48px 52px',
              borderRadius: '16px',
              color: '#000000',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '14px',
                fontSize: '0.65rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>Current Focus</div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '20px',
                opacity: 0.5,
                textAlign: 'center'
              }}>Level 3 — Execution</div>
              <h3 style={{
                fontSize: '2.8rem',
                fontWeight: '400',
                marginBottom: '20px',
                lineHeight: '0.9',
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}>
                Applied Writing
              </h3>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.6',
                opacity: 0.75,
                fontWeight: '400',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                Produce and ship the copy at volume. Raise experiences to the 80 percent and 100 percent quality bar.
              </p>
              <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '45%',
                  height: '100%',
                  backgroundColor: '#4a4a4a',
                  borderRadius: '6px'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 9a - Steady: Introducing 80% framework as part of solution */}
      <section id="slide-8a" className="slide motion-steady">
        <div className="slide-content" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
          <h2 className="approach-title" style={{ marginBottom: '40px' }}>Our approach: the 80%<br/>Design Polish framework</h2>
          <p className="approach-description" style={{ fontSize: '1.5rem', lineHeight: '2rem', opacity: 0.8, maxWidth: '800px' }}>
            We evaluate the fidelity of our output by assessing <strong>risk</strong>, <strong>leverage</strong>,
            and <strong>trust</strong> based on their <strong>impact</strong> and <strong>criticality</strong> to
            the seller experience.
          </p>
        </div>
      </section>

      {/* Slide 9c - Steady: 100% moments matrix visualization */}
      <section id="slide-8c" className="slide motion-steady">
        <div className="slide-content" style={{ padding: '5px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <img
            src={matrixSvg}
            alt="Content Quality Matrix"
            className="matrix-image"
            style={{
              maxWidth: '95vw',
              maxHeight: '95vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              marginTop: '-5%'
            }}
          />
        </div>
      </section>

      {/* Slide 9b - Steady: When to go 100% vs 80% */}
      <section id="slide-8b" className="slide motion-steady">
        <div className="slide-content" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '60px 80px' }}>
          <div style={{ maxWidth: '900px' }}>
            <div className="moments-section moments-100" style={{ marginBottom: '50px' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>"100%" moments happen when:</h3>
              <ul style={{ fontSize: '1.3rem', lineHeight: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '12px' }}>• The stakes are high (harm, money, access, trust)</li>
                <li style={{ marginBottom: '12px' }}>• The moment defines the relationship (first-time, celebration, failure)</li>
                <li style={{ marginBottom: '12px' }}>• The interaction repeats at scale (systemic impact)</li>
              </ul>
            </div>
            <div className="moments-section moments-80">
              <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>"80% is okay" moments happen when:</h3>
              <ul style={{ fontSize: '1.3rem', lineHeight: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '12px' }}>• Stakes are low</li>
                <li style={{ marginBottom: '12px' }}>• The moment is reversible</li>
                <li style={{ marginBottom: '12px' }}>• The interaction is peripheral or non-defining</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 10 - Steady: Solution introduction, standard transition */}
      <section id="slide-9" className="slide motion-steady">
        <div className="slide-content">
          <h2>We also built a GPT to<br/>automate the drafting of<br/>our emails</h2>
        </div>
      </section>

      {/* Slide 11 - Sharp: Quick demo moment, micro interaction */}
      <section id="slide-10" className="slide motion-sharp">
        <div className="slide-content gpt-demo">
          <h3 className="gpt-title" style={{
            fontSize: '6rem',
            fontWeight: '400',
            letterSpacing: '-0.02em',
            lineHeight: '0.85',
            marginBottom: '26px'
          }}>Risk GPT</h3>
          <form onSubmit={handleSubmit} style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className="chat-input-wrapper">
              <div className="input-with-cursor">
                <input
                  type="text"
                  className="chat-input-field"
                  value={gptPrompt}
                  onChange={(e) => setGptPrompt(e.target.value)}
                  placeholder="Help me write an email"
                  autoComplete="off"
                />
                {!gptPrompt && <span className="blinking-cursor">|</span>}
              </div>
              <div className="chat-buttons">
                <button
                  type="button"
                  className="chat-button chat-button-clear chat-button-icon"
                  onClick={handleClear}
                  title="Clear"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <button
                  type="submit"
                  className="chat-button chat-button-send chat-button-icon"
                  disabled={!!generatedEmail}
                  title="Send"
                  style={{
                    opacity: generatedEmail ? 0.5 : 1,
                    cursor: generatedEmail ? 'not-allowed' : 'pointer'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div style={{
              marginTop: '32px',
              marginBottom: '24px',
              maxWidth: '600px',
              textAlign: 'left',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              color: 'rgba(0, 0, 0, 0.75)'
            }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <li style={{ paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '0', opacity: 0.6 }}>•</span>
                  Drafts risk seller comms from scenario inputs using standard structure and tone
                </li>
                <li style={{ paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '0', opacity: 0.6 }}>•</span>
                  Enforces guardrails like plain language, clear next steps, and no new promises
                </li>
                <li style={{ paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '0', opacity: 0.6 }}>•</span>
                  Drives consistency by reusing approved patterns for common risk states
                </li>
              </ul>
            </div>

            <a
              href="https://docs.google.com/document/d/1TDRvZddYvfOWeFXZtJE3X-F0KBJqZB9eYIOPTlf7aCA/edit?tab=t.qzb26l4ycx1c"
              target="_blank"
              rel="noopener noreferrer"
              className="gpt-link"
            >
              See GPT
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </form>
        </div>
      </section>

      {/* Slide 12 - Gentle: Email template display with dramatic slide-up */}
      <section id="slide-11" className="slide motion-gentle email-slide">
        <div className="slide-content" style={{ alignItems: 'center', justifyContent: 'center', padding: '40px', display: 'flex' }}>
          <div className="email-output-animated" style={{ width: '100%', maxWidth: '900px', position: 'relative' }}>
            <img
              src={emailImage}
              alt="Email Template"
              style={{ width: '100%', height: 'auto', display: 'block', visibility: 'visible' }}
            />
          </div>
        </div>
      </section>

      {/* Slide 12a - Steady: Before/After email comparison */}
      <section id="slide-11a" className="slide motion-steady">
        <div className="slide-content" style={{ padding: '60px 80px' }}>
          <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>Before & After</h2>
          <div style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            alignItems: 'flex-start',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <div className="before-after-item before-item" style={{ flex: '1', maxWidth: '600px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', textAlign: 'center', fontWeight: '600' }}>Before</h3>
              <img
                src={disputeBeforeImage}
                alt="Before - Old dispute email"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '8px'
                }}
              />
            </div>
            <div className="before-after-item after-item" style={{ flex: '1', maxWidth: '600px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', textAlign: 'center', fontWeight: '600' }}>After</h3>
              <img
                src={disputeAfterImage}
                alt="After - New dispute email"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Slide 13 - Steady: Result statement, standard information delivery */}
      <section id="slide-12" className="slide motion-steady">
        <div className="slide-content">
          <h2>This has helped us<br/>with these emails, but it still<br/>requires manual edit and review</h2>
        </div>
      </section>

      {/* Slide 13a - Steady: Feedback comment example */}
      <section id="slide-12a" className="slide motion-steady">
        <div className="slide-content" style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={feedbackImage}
            alt="Feedback comment example"
            className="feedback-image"
            style={{
              width: '63%',
              maxWidth: '840px',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              margin: '0 auto'
            }}
          />
          <p style={{
            marginTop: '24px',
            fontSize: '1.2rem',
            color: 'rgba(0,0,0,0.7)',
            textAlign: 'center',
            maxWidth: '840px'
          }}>team spends a lot of time resolving these</p>
        </div>
      </section>

      {/* Slide 14 - Steady: The journey of an email - comms process diagram */}
      <section id="slide-13a" className="slide motion-steady">
        <div className="slide-content" style={{ padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '100%' }}>
          <img
            src={commsProcessImage}
            alt="The journey of an email"
            style={{
              width: '110%',
              maxWidth: '1930px',
              height: 'auto',
              objectFit: 'contain',
              marginLeft: '3%'
            }}
          />
        </div>
      </section>

      {/* Slide 14.5 - Steady: Contentful email management */}
      <section id="slide-12b" className="slide motion-steady">
        <div className="slide-content" style={{ padding: '40px', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ marginBottom: '40px', textAlign: 'center', fontSize: '1.5rem' }}>Team is managing 350+ emails</h2>
          <img
            src={contentfulImage}
            alt="Contentful email management dashboard"
            className="contentful-image"
            style={{
              width: '100%',
              maxWidth: '1600px',
              height: 'auto',
              objectFit: 'contain',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              margin: '0 auto'
            }}
          />
        </div>
      </section>

      {/* Slide 14b - Steady: The real challenge */}
      <section id="slide-12b-challenge" className="slide motion-steady">
        <div className="slide-content">
          <h2 className="ai-challenge-title" style={{ maxWidth: '900px', lineHeight: '0.85', letterSpacing: '-0.02em' }}>AI can write the words.<br/>Humans need to define the<br/>underlying concepts.</h2>
          <p className="ai-challenge-description" style={{ fontSize: '1.4rem', marginTop: '40px', opacity: 0.7, maxWidth: '800px' }}>The identity team is thinking through how we design flows that match how complex businesses actually think about ownership, control, and structure.</p>
        </div>
      </section>

      {/* Slide 15 - Steady: Section transition into projects */}
      <section id="slide-13" className="slide motion-steady">
        <div className="slide-content">
          <h2>...and we have a lot more<br/>content only projects<br/>in flight...</h2>
        </div>
      </section>

      {/* Slide 15 - Fast: Quick scan of additional items, Sharp accent for list */}
      <section id="slide-14" className="slide motion-fast">
        <div className="slide-content" style={{
          padding: '70px 80px',
          justifyContent: 'flex-start',
          maxWidth: '1200px',
          margin: '0',
          textAlign: 'left',
          alignItems: 'flex-start'
        }}>
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: '400',
            lineHeight: '0.9',
            letterSpacing: '-0.02em',
            marginBottom: '60px',
            textAlign: 'left'
          }}>Active Content Projects</h2>

          <ol style={{
            listStyle: 'none',
            padding: '0',
            margin: '0',
            counterReset: 'project-counter',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            width: '100%',
            textAlign: 'left'
          }}>
            <li style={{
              counterIncrement: 'project-counter',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: '16px',
              alignItems: 'flex-start',
              fontSize: '1.1rem',
              lineHeight: '1.5'
            }}>
              <span style={{
                fontSize: '1rem',
                opacity: '0.4',
                fontWeight: '500',
                textAlign: 'right'
              }}>01</span>
              <div>
                <a href="https://linear.app/dashboard-and-labs/project/dispute-communications-updates-35c9627ccd05" target="_blank" rel="noopener noreferrer" style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontWeight: '500',
                  borderBottom: '1px solid rgba(0,0,0,0.3)'
                }}>Dispute Communications Updates</a>
                <span style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginLeft: '12px',
                  display: 'inline-block'
                }}>Code Red</span>
                <p style={{
                  margin: '8px 0 0 0',
                  opacity: '0.7',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>Updated in app dispute copy, SMS templates, and email templates to increase seller responses</p>
              </div>
            </li>
            <li style={{
              counterIncrement: 'project-counter',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: '16px',
              alignItems: 'flex-start',
              fontSize: '1.1rem',
              lineHeight: '1.5'
            }}>
              <span style={{
                fontSize: '1rem',
                opacity: '0.4',
                fontWeight: '500',
                textAlign: 'right'
              }}>02</span>
              <div>
                <a href="https://linear.app/dashboard-and-labs/project/refund-controls-d3bd8be18d8b" target="_blank" rel="noopener noreferrer" style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontWeight: '500',
                  borderBottom: '1px solid rgba(0,0,0,0.3)'
                }}>Refund Controls</a>
                <p style={{
                  margin: '8px 0 0 0',
                  opacity: '0.7',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>New seller facing email templates and in product copy for refund fraud controls</p>
              </div>
            </li>
            <li style={{
              counterIncrement: 'project-counter',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: '16px',
              alignItems: 'flex-start',
              fontSize: '1.1rem',
              lineHeight: '1.5'
            }}>
              <span style={{
                fontSize: '1rem',
                opacity: '0.4',
                fontWeight: '500',
                textAlign: 'right'
              }}>03</span>
              <div>
                <a href="https://linear.app/dashboard-and-labs/project/sq-debit-card-funnel-improvements-4e88823f0a56" target="_blank" rel="noopener noreferrer" style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontWeight: '500',
                  borderBottom: '1px solid rgba(0,0,0,0.3)'
                }}>Square Debit Card Funnel</a>
                <span style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginLeft: '12px',
                  display: 'inline-block'
                }}>Code Red</span>
                <p style={{
                  margin: '8px 0 0 0',
                  opacity: '0.7',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>Revised identity check challenge screen copy, email copy, and help content to reduce drop off</p>
              </div>
            </li>
            <li style={{
              counterIncrement: 'project-counter',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: '16px',
              alignItems: 'flex-start',
              fontSize: '1.1rem',
              lineHeight: '1.5'
            }}>
              <span style={{
                fontSize: '1rem',
                opacity: '0.4',
                fontWeight: '500',
                textAlign: 'right'
              }}>04</span>
              <div>
                <a href="https://linear.app/dashboard-and-labs/project/square-risk-deactivation-emails-f22a3f6f760f" target="_blank" rel="noopener noreferrer" style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontWeight: '500',
                  borderBottom: '1px solid rgba(0,0,0,0.3)'
                }}>Risk Deactivation Emails</a>
                <span style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginLeft: '12px',
                  display: 'inline-block'
                }}>Code Red</span>
                <p style={{
                  margin: '8px 0 0 0',
                  opacity: '0.7',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>Updated deactivation email templates with clearer outcomes, funds timing, and reactivation steps</p>
              </div>
            </li>
            <li style={{
              counterIncrement: 'project-counter',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: '16px',
              alignItems: 'flex-start',
              fontSize: '1.1rem',
              lineHeight: '1.5'
            }}>
              <span style={{
                fontSize: '1rem',
                opacity: '0.4',
                fontWeight: '500',
                textAlign: 'right'
              }}>05</span>
              <div>
                <a href="https://linear.app/dashboard-and-labs/project/risk-comms-improvements-fed14f758f3a" target="_blank" rel="noopener noreferrer" style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontWeight: '500',
                  borderBottom: '1px solid rgba(0,0,0,0.3)'
                }}>Risk Comms Improvements</a>
                <p style={{
                  margin: '8px 0 0 0',
                  opacity: '0.7',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>Standardized message framework, reusable templates, and tone guidelines across channels and markets</p>
              </div>
            </li>
            <li style={{
              counterIncrement: 'project-counter',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: '16px',
              alignItems: 'flex-start',
              fontSize: '1.1rem',
              lineHeight: '1.5'
            }}>
              <span style={{
                fontSize: '1rem',
                opacity: '0.4',
                fontWeight: '500',
                textAlign: 'right'
              }}>06</span>
              <div>
                <a href="https://linear.app/dashboard-and-labs/project/dormant-account-email-de5c7544028a" target="_blank" rel="noopener noreferrer" style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontWeight: '500',
                  borderBottom: '1px solid rgba(0,0,0,0.3)'
                }}>Dormant Account Email</a>
                <p style={{
                  margin: '8px 0 0 0',
                  opacity: '0.7',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>Best practice research, Figma email design, and finalized dormant account email copy</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Slide 20 - Steady: Content strategy framework */}
      <section id="slide-18" className="slide motion-steady">
        <div className="slide-content" style={{ padding: '70px 80px', justifyContent: 'flex-start' }}>
          <h2 style={{
            marginBottom: '70px',
            fontSize: '3.5rem',
            fontWeight: '400',
            letterSpacing: '-0.02em',
            lineHeight: '0.85'
          }}>Where we'd like to be</h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            maxWidth: '1100px',
            margin: '0',
            width: '100%'
          }}>
            {/* Level 1 - Strategy */}
            <div className="opportunities-module" style={{
              background: '#000000',
              padding: '48px 52px',
              borderRadius: '16px',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: '#ffffff',
                color: '#000000',
                padding: '6px 14px',
                borderRadius: '14px',
                fontSize: '0.65rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>Leading</div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '20px',
                opacity: 0.6,
                textAlign: 'center'
              }}>Level 1 — Strategy</div>
              <h3 style={{
                fontSize: '2.8rem',
                fontWeight: '400',
                marginBottom: '20px',
                lineHeight: '0.9',
                letterSpacing: '-0.02em',
                textAlign: 'center',
                color: '#ffffff'
              }}>
                Strategic Content Leadership
              </h3>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.6',
                opacity: 0.85,
                fontWeight: '400',
                marginBottom: '24px',
                textAlign: 'center',
                color: '#ffffff'
              }}>
                Set voice and disclosure rules for trust moments. Create decision frameworks that tell good sellers enough without educating bad actors. Define what we say, to whom, and where the line is.
              </p>
              <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '95%',
                  height: '100%',
                  backgroundColor: '#9e9e9e',
                  borderRadius: '6px'
                }}></div>
              </div>
            </div>

            {/* Level 2 - Approach */}
            <div className="opportunities-module" style={{
              background: 'linear-gradient(135deg, #f2f2f2 0%, #e0e0e0 100%)',
              padding: '48px 52px',
              borderRadius: '16px',
              color: '#000000',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '14px',
                fontSize: '0.65rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>Excelling</div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '20px',
                opacity: 0.5,
                textAlign: 'center'
              }}>Level 2 — Approach</div>
              <h3 style={{
                fontSize: '2.8rem',
                fontWeight: '400',
                marginBottom: '20px',
                lineHeight: '0.9',
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}>
                Operational Framework
              </h3>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.6',
                opacity: 0.75,
                fontWeight: '400',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                Intake, prioritize, and govern content requests. Align stakeholders. Scale execution with tools like Risk GPT.
              </p>
              <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '90%',
                  height: '100%',
                  backgroundColor: '#6e6e6e',
                  borderRadius: '6px'
                }}></div>
              </div>
            </div>

            {/* Level 3 - Execution */}
            <div className="opportunities-module" style={{
              background: 'linear-gradient(135deg, #f8f8f8 0%, #ececec 100%)',
              padding: '48px 52px',
              borderRadius: '16px',
              color: '#000000',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '14px',
                fontSize: '0.65rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>Mastered</div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '20px',
                opacity: 0.5,
                textAlign: 'center'
              }}>Level 3 — Execution</div>
              <h3 style={{
                fontSize: '2.8rem',
                fontWeight: '400',
                marginBottom: '20px',
                lineHeight: '0.9',
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}>
                Applied Writing
              </h3>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.6',
                opacity: 0.75,
                fontWeight: '400',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                Produce and ship the copy at volume. Raise experiences to the 80 percent and 100 percent quality bar.
              </p>
              <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#4a4a4a',
                  borderRadius: '6px'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 21 - Gentle: Final slide with goals */}
      <section id="slide-19" className="slide motion-gentle slide-with-back-to-top">
        <div className="slide-content" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          height: '100vh',
          padding: '60px 60px 50px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          <div style={{ flex: '0 0 auto' }}></div>

          <div style={{ flex: '0 0 auto' }}>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              opacity: 0.5,
              marginBottom: '20px'
            }}>Goals for today</div>

            <h2 style={{
              fontSize: '3.8rem',
              fontWeight: '400',
              lineHeight: '0.9',
              letterSpacing: '-0.02em',
              marginBottom: '0',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              Align on the content landscape
            </h2>

            <div style={{
              fontSize: '3.8rem',
              fontWeight: '400',
              lineHeight: '0.9',
              letterSpacing: '-0.02em',
              opacity: 0.4,
              marginTop: '10px',
              maxWidth: '900px',
              margin: '10px auto 0'
            }}>
              and discuss the support needed to strengthen it.
            </div>
          </div>

          <a
            href="#slide-0"
            className="back-to-top"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('slide-0')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            style={{
              flex: '0 0 auto'
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
            <span>Back to top</span>
          </a>
        </div>
      </section>
    </div>
  )
}

export default SlideDeck

import { useEffect, useState } from 'react'
import './SlideDeck.css'
import emailImage from '../images/emailtemplate.png'
import trustLogo from '../images/trust design logo.svg'

const SlideDeck = () => {
  const [gptPrompt, setGptPrompt] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState<{subject: string, body: string} | null>(null)

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

          // Show/hide fixed left text for slides 1, 1b, 1c
          const fixedLeftText = document.querySelector('.fixed-left-text')
          if (fixedLeftText) {
            if (entry.target.id === 'slide-1' || entry.target.id === 'slide-1b' || entry.target.id === 'slide-1c') {
              fixedLeftText.classList.add('visible')
            } else {
              fixedLeftText.classList.remove('visible')
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
        slides[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        slides[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      slides.forEach(slide => observer.unobserve(slide))
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="slide-deck">
      <img src={trustLogo} alt="Trust Design Team" className="trust-logo" />

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
          <span className="keyboard-hint">Use arrow keys to navigate</span>
        </div>
      </section>

      {/* Slide 2a - Steady: First critical flow - animate both columns */}
      <section id="slide-1" className="slide motion-steady">
        <div className="slide-content two-column">
          <div className="column-left" style={{ visibility: 'hidden' }}>
            <h2>The Trust team handles some of the most critical flows</h2>
          </div>
          <div className="column-right">
            <h2>Establishing<br/>your identity</h2>
          </div>
        </div>
      </section>

      {/* Slide 2b - Steady: Second critical flow - keep left fixed */}
      <section id="slide-1b" className="slide motion-steady slide-fixed-left">
        <div className="slide-content two-column">
          <div className="column-left fixed-text" style={{ visibility: 'hidden' }}>
            <h2>The Trust team handles some of the most critical flows</h2>
          </div>
          <div className="column-right">
            <h2>Handling<br/>problems</h2>
          </div>
        </div>
      </section>

      {/* Slide 2c - Steady: Third critical flow - keep left fixed */}
      <section id="slide-1c" className="slide motion-steady slide-fixed-left">
        <div className="slide-content two-column">
          <div className="column-left fixed-text" style={{ visibility: 'hidden' }}>
            <h2>The Trust team handles some of the most critical flows</h2>
          </div>
          <div className="column-right">
            <h2>Getting help</h2>
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

      {/* Slide 6 - Steady: Continuation of thought, standard pace */}
      <section id="slide-3" className="slide motion-steady">
        <div className="slide-content">
          <h2>They matter<br/><span style={{ opacity: 0.3 }}>practically.</span></h2>
        </div>
      </section>

      {/* Slide 5 - Fast: Short, punchy statement needs immediate impact */}
      <section id="slide-4" className="slide motion-fast">
        <div className="slide-content">
          <h2>They matter<br/><span style={{ opacity: 0.3 }}>legally.</span></h2>
        </div>
      </section>

      {/* Slide 8 - Soft: Emotional weight needs room to breathe */}
      <section id="slide-5" className="slide motion-soft">
        <div className="slide-content">
          <h2>They matter<br/><span style={{ opacity: 0.3 }}>emotionally.</span></h2>
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
          <p className="stat-description">of our product design time is copy only projects like emails and notifs</p>
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

      {/* Slide 9a - Steady: Introducing 80% framework as part of solution */}
      <section id="slide-8a" className="slide motion-steady">
        <div className="slide-content" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
          <h2 style={{ marginBottom: '40px' }}>Our approach: the 80%<br/>Design Polish framework</h2>
          <p style={{ fontSize: '1.5rem', lineHeight: '2rem', opacity: 0.8, maxWidth: '800px' }}>
            We evaluate the fidelity of our output by assessing <strong>risk</strong>, <strong>leverage</strong>,
            and <strong>trust</strong> based on their <strong>impact</strong> and <strong>criticality</strong> to
            the seller experience.
          </p>
        </div>
      </section>

      {/* Slide 9b - Steady: When to go 100% vs 80% */}
      <section id="slide-8b" className="slide motion-steady">
        <div className="slide-content" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '60px 80px' }}>
          <div style={{ maxWidth: '900px' }}>
            <div style={{ marginBottom: '50px' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>"100%" moments happen when:</h3>
              <ul style={{ fontSize: '1.3rem', lineHeight: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '12px' }}>• The stakes are high (harm, money, access, trust)</li>
                <li style={{ marginBottom: '12px' }}>• The moment defines the relationship (first-time, celebration, failure)</li>
                <li style={{ marginBottom: '12px' }}>• The interaction repeats at scale (systemic impact)</li>
              </ul>
            </div>
            <div>
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

      {/* Slide 9c - Steady: Monochrome X/Y axis chart */}
      <section id="slide-8c" className="slide motion-steady">
        <div className="slide-content" style={{ padding: '40px 80px' }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            position: 'relative',
            paddingTop: '40px'
          }}>
            {/* Chart container */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '650px'
            }}>
              {/* Y-axis (vertical) */}
              <div style={{
                position: 'absolute',
                left: '100px',
                top: '40px',
                bottom: '60px',
                width: '2px',
                background: 'rgba(255,255,255,0.4)'
              }}></div>

              {/* X-axis (horizontal) */}
              <div style={{
                position: 'absolute',
                left: '100px',
                right: '40px',
                bottom: '60px',
                height: '2px',
                background: 'rgba(255,255,255,0.4)'
              }}></div>

              {/* Y-axis label */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%) rotate(-90deg)',
                transformOrigin: 'center',
                fontSize: '0.9rem',
                fontWeight: '500',
                opacity: 0.6,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap'
              }}>
                Low Criticality ← → High Criticality
              </div>

              {/* X-axis label */}
              <div style={{
                position: 'absolute',
                left: '50%',
                bottom: '10px',
                transform: 'translateX(-50%)',
                fontSize: '0.9rem',
                fontWeight: '500',
                opacity: 0.6,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap'
              }}>
                Low Impact ← → High Impact
              </div>

              {/* Bottom Left Quadrant - Optimize later */}
              <div style={{
                position: 'absolute',
                left: '110px',
                bottom: '70px',
                width: '42%',
                height: '42%',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '4px',
                padding: '20px',
                background: 'rgba(255,255,255,0.02)'
              }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: '600' }}>Optimize later</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Low Impact × Low Criticality
                </p>
                <ul style={{ fontSize: '0.85rem', lineHeight: '1.5rem', listStyle: 'none', paddingLeft: 0, marginBottom: '12px' }}>
                  <li>• Admin settings</li>
                  <li>• Rarely used tools</li>
                  <li>• Internal-only flows</li>
                </ul>
                <p style={{ fontSize: '0.8rem', opacity: 0.6, fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px' }}>
                  80% is good enough. Revisit only if signals change.
                </p>
              </div>

              {/* Top Left Quadrant - Quick wins */}
              <div style={{
                position: 'absolute',
                left: '110px',
                top: '50px',
                width: '42%',
                height: '42%',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '4px',
                padding: '20px',
                background: 'rgba(255,255,255,0.02)'
              }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: '600' }}>Quick wins</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Low Impact × High Criticality
                </p>
                <ul style={{ fontSize: '0.85rem', lineHeight: '1.5rem', listStyle: 'none', paddingLeft: 0, marginBottom: '12px' }}>
                  <li>• First-time feature tours</li>
                  <li>• Success confirmations</li>
                  <li>• Delight moments</li>
                  <li>• Brand storytelling</li>
                </ul>
                <p style={{ fontSize: '0.8rem', opacity: 0.6, fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px' }}>
                  Invest deeply in experience and narrative, but avoid over-engineering.
                </p>
              </div>

              {/* Bottom Right Quadrant - Scale & reliability */}
              <div style={{
                position: 'absolute',
                right: '50px',
                bottom: '70px',
                width: '42%',
                height: '42%',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '4px',
                padding: '20px',
                background: 'rgba(255,255,255,0.02)'
              }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: '600' }}>Scale & reliability first</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  High Impact × Low Criticality
                </p>
                <ul style={{ fontSize: '0.85rem', lineHeight: '1.5rem', listStyle: 'none', paddingLeft: 0, marginBottom: '12px' }}>
                  <li>• Repeated flows everyone must do</li>
                  <li>• Compliance steps</li>
                  <li>• Payments setup used constantly</li>
                </ul>
                <p style={{ fontSize: '0.8rem', opacity: 0.6, fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px' }}>
                  Thoughtful, scalable design matters more than polish.
                </p>
              </div>

              {/* Top Right Quadrant - Trust-defining moments (emphasized) */}
              <div style={{
                position: 'absolute',
                right: '50px',
                top: '50px',
                width: '42%',
                height: '42%',
                border: '2px solid rgba(255,255,255,0.6)',
                borderRadius: '4px',
                padding: '20px',
                background: 'rgba(255,255,255,0.05)'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: '700' }}>Trust-defining moments</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  High Impact × High Criticality
                </p>
                <ul style={{ fontSize: '0.9rem', lineHeight: '1.6rem', listStyle: 'none', paddingLeft: 0, marginBottom: '12px' }}>
                  <li>• Account deactivation</li>
                  <li>• Funds frozen</li>
                  <li>• First-time onboarding</li>
                  <li>• Fraud, disputes, identity verification</li>
                </ul>
                <p style={{ fontSize: '0.85rem', opacity: 0.8, fontStyle: 'italic', fontWeight: '500', borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '12px' }}>
                  Precision, clarity, edge cases, accessibility, and failure states matter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 9d - Soft: Addressing craft and quality */}
      <section id="slide-8d" className="slide motion-soft">
        <div className="slide-content" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '80px' }}>
          <h2 style={{ marginBottom: '40px' }}>What about craft, taste,<br/>and design quality?</h2>
          <p style={{ fontSize: '1.4rem', lineHeight: '2.2rem', opacity: 0.9, maxWidth: '900px' }}>
            In practice, <strong>Low Impact × Low Criticality</strong> becomes our baseline bar for the
            Square experience. It should be good enough to live in our experience for the foreseeable
            future, without burdening our core experience, reliability, or brand perception.
          </p>
        </div>
      </section>

      {/* Slide 10 - Steady: Solution introduction, standard transition */}
      <section id="slide-9" className="slide motion-steady">
        <div className="slide-content">
          <h2>So we built a GPT to<br/>automate the drafting of<br/>our emails</h2>
        </div>
      </section>

      {/* Slide 11 - Sharp: Quick demo moment, micro interaction */}
      <section id="slide-10" className="slide motion-sharp">
        <div className="slide-content gpt-demo">
          <h3 className="gpt-title">Risk GPT</h3>
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

      {/* Slide 13 - Steady: Result statement, standard information delivery */}
      <section id="slide-12" className="slide motion-steady">
        <div className="slide-content">
          <h2>This has helped us<br/>with these emails, but it still<br/>requires manual edit and review</h2>
        </div>
      </section>

      {/* Slide 14 - Steady: Section transition into projects */}
      <section id="slide-13" className="slide motion-steady">
        <div className="slide-content">
          <h2>...and we have a lot more<br/>content only projects<br/>in flight...</h2>
        </div>
      </section>

      {/* Slide 15 - Steady: First project detail */}
      <section id="slide-14" className="slide motion-steady">
        <div className="slide-content">
          <h3>Dispute Communications Updates</h3>
          <p>Improving in-app, SMS, and email communications to increase seller response rates</p>
        </div>
      </section>

      {/* Slide 17 - Steady: Second project, consistent with previous */}
      <section id="slide-15" className="slide motion-steady">
        <div className="slide-content">
          <h3>Refund Controls</h3>
          <p>Email-heavy fraud prevention initiative reducing $400K in losses</p>
        </div>
      </section>

      {/* Slide 18 - Steady: Third project, maintaining rhythm */}
      <section id="slide-16" className="slide motion-steady">
        <div className="slide-content">
          <h3>Square Debit Card Funnel</h3>
          <p>Document identity verification messaging improvements</p>
        </div>
      </section>

      {/* Slide 19 - Fast: Quick scan of additional items, Sharp accent for list */}
      <section id="slide-17" className="slide motion-fast">
        <div className="slide-content slide-list">
          <h2>Additional projects</h2>
          <ol>
            <li>Risk Deactivation Emails - Updated policies, clearer reactivation paths</li>
            <li>Risk Comms Improvements - Standardizing across channels and markets</li>
            <li>Dormant Account Email - Best practices research & design</li>
            <li>Identity Verification Flows - Compliance-friendly messaging</li>
            <li>Fraud Alert Communications - Empathetic, action-oriented voice</li>
          </ol>
        </div>
      </section>

      {/* Slide 20 - Soft: Reflective question, pause for thought */}
      <section id="slide-18" className="slide motion-soft">
        <div className="slide-content">
          <h2>The question today is:<br/>is this good enough?</h2>
        </div>
      </section>

      {/* Slide 21 - Gentle: Final dramatic moment, key decision point needs weight */}
      <section id="slide-19" className="slide motion-gentle slide-with-back-to-top">
        <div className="slide-content">
          <h2>The question today is: is<br/>this the best use of our<br/>product design time?</h2>
          <a
            href="#slide-0"
            className="back-to-top"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('slide-0')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

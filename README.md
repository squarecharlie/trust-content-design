# Trust Content Design Presentation

A scrollable presentation website showcasing the Trust Content Design team's projects and GPT automation at Square.

## Features

- 21 interactive slides with smooth scroll-snap navigation
- Cash Sans typography from Cash App design system
- Interactive Risk GPT demo with email generation
- Animated slide transitions using spring-based motion tokens
- Fixed left column on slides 2-4 for progressive reveal
- Keyboard navigation (arrow keys)
- Mobile responsive design
- Email template showcase

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS3 with custom animations
- Cash Sans font family (WOFF2)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:squarecharlie/trust-content-design.git

# Navigate to project directory
cd trust-content-design

# Install dependencies
npm install
```

### Development

```bash
# Start development server on port 3000
npm run dev

# The app will be available at http://localhost:3000
```

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
trust-content-design/
├── src/
│   ├── components/
│   │   ├── SlideDeck.tsx          # Main presentation component
│   │   ├── SlideDeck.css          # Slide styling and animations
│   │   ├── SlideCounter.tsx       # Slide counter component
│   │   └── AnimatedTwoColumnModule.tsx # Two-column carousel
│   ├── images/
│   │   ├── emailTemplate.svg      # Email template image
│   │   └── trust design logo.svg  # Trust Design Team logo
│   ├── styles/
│   │   ├── fonts.css              # Cash Sans font declarations
│   │   └── CashSans_WOFF2/        # Font files
│   ├── App.tsx                    # App wrapper
│   ├── index.css                  # Global styles
│   └── main.tsx                   # Entry point
├── vite.config.ts                 # Vite configuration
└── package.json
```

## Navigation

- **Arrow Keys**: Navigate up/down between slides
- **Mouse Wheel**: Scroll through slides
- **Keyboard**: Up/Down arrows work on all slides including when input is focused

## Slides Overview

1. Opening title slide
2-4. Two-column progressive reveal (The Trust team handles...)
5. Words matter in these spaces
6. They matter practically
7. They matter legally
8. They matter emotionally
9. 40% stat slide
10. 100% stat slide
11. 0 content designers stat
12. "But we've done a pretty good job"
13. We built a GPT to automate emails
14. Risk GPT interactive demo
15. Email template display
16. This has helped us with these emails
17. We have more projects in flight
18. Dispute Communications Updates
19. Refund Controls
20. Square Debit Card Funnel
21. Additional projects list
22. Final question slide with back to top

## Typography

The presentation uses **Cash Sans** from the Cash App design system with the following weights:
- Regular (400)
- Medium (500)
- Semibold (600)
- Bold (700)

## Motion Design

Spring-based motion tokens:
- **Gentle** (400ms): Dramatic moments, big reveals
- **Soft** (350ms): Reflective beats, breathing room
- **Steady** (280ms): Default, standard transitions
- **Fast** (200ms): Quick responsiveness
- **Sharp** (120ms): Micro interactions

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS scroll-snap support
- Optimized for desktop viewing

## Contributing

This is a presentation website for the Trust Content Design team at Square.

## License

Proprietary - Square, Inc.

## Credits

Built with assistance from Claude Sonnet 4.5

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

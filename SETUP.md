# Setup Instructions

## Quick Start

Follow these steps to run the Trust Design presentation:

### 1. Install Dependencies

```bash
cd /Users/chart/trust-content-presentation
npm install
```

This will install:
- React 18.2.0
- React DOM 18.2.0
- TypeScript 5.2.2
- Vite 5.0.8
- @vitejs/plugin-react
- Type definitions for React

### 2. Start Development Server

```bash
npm run dev
```

The presentation will be available at `http://localhost:5173`

### 3. Navigate the Presentation

**Methods:**
- **Mouse/Trackpad**: Scroll up and down to navigate between slides
- **Navigation Dots**: Click dots on the right side to jump to specific slides
- **Arrow Buttons**: Use up/down arrow buttons on the right
- **Keyboard**: Arrow keys or Page Up/Down also work

### 4. Build for Production (Optional)

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

To preview the production build:

```bash
npm run preview
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port.

### Dependencies Not Installing

Make sure you have Node.js 16+ installed:

```bash
node --version
npm --version
```

### TypeScript Errors

If you see TypeScript errors during development, they won't prevent the app from running. You can fix them later or ignore them if the app works correctly.

## Project Structure

```
/Users/chart/trust-content-presentation/
├── public/                     # Static assets (if needed)
├── src/
│   ├── components/
│   │   ├── Slide.tsx          # Reusable slide wrapper
│   │   ├── Slide.css
│   │   ├── Navigation.tsx     # Navigation dots, arrows, counter
│   │   ├── Navigation.css
│   │   ├── SquareLogo.tsx     # Animated Square logo
│   │   └── SquareLogo.css
│   ├── App.tsx                # Main app with all 7 slides
│   ├── App.css                # Slide-specific styles
│   ├── main.tsx              # React entry point
│   ├── index.css             # Global styles & CSS variables
│   └── vite-env.d.ts         # TypeScript declarations
├── index.html                 # HTML entry point
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── tsconfig.node.json        # TypeScript config for Vite
├── vite.config.ts            # Vite configuration
├── .gitignore               # Git ignore rules
├── README.md                 # Project documentation
└── SETUP.md                  # This file
```

## Customization Tips

### Change Colors

Edit `/Users/chart/trust-content-presentation/src/index.css`:

```css
:root {
  --cash-green: #00E013;
  --dark-slate: #2c2c2c;
  --azure: #66CFFF;
  --violet: #BFB0FF;
}
```

### Add/Remove Slides

1. Edit `/Users/chart/trust-content-presentation/src/App.tsx`
2. Add or remove `<Slide>` components
3. Update `totalSlides` constant in App.tsx

### Modify Content

All slide content is in `/Users/chart/trust-content-presentation/src/App.tsx`. Each slide is clearly commented.

### Adjust Responsive Breakpoints

Edit `/Users/chart/trust-content-presentation/src/App.css` media queries:
- 1400px - Large desktops
- 1024px - Tablets
- 768px - Mobile devices

## Features Included

- **Smooth scroll-snap behavior** - Slides snap into place
- **Navigation system** - Dots, arrows, and counter
- **Responsive design** - Works on desktop, tablet, and mobile
- **Cash App design system** - Colors and aesthetic
- **Square branding** - Custom SVG logo with animation
- **TypeScript** - Type safety throughout
- **Hot Module Replacement** - Instant updates during development

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the dist/ folder to Netlify
```

### Deploy to GitHub Pages

```bash
npm run build
# Configure GitHub Pages to serve from dist/ folder
```

## Support

For issues or questions about the presentation, contact the Trust Design team at Square.

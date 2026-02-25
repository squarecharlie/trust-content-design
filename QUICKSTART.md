# Quick Start Guide

## Get Up and Running in 3 Steps

### Step 1: Navigate to Project
```bash
cd /Users/chart/trust-content-presentation
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React 18.2.0
- React DOM 18.2.0
- TypeScript 5.2.2
- Vite 5.0.8
- Plugin and type definitions

**Expected install time:** 30-60 seconds

### Step 3: Start Development Server
```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Open in browser:** http://localhost:5173

## What You'll See

### Slide 1: Title Slide
- Animated Square logo in Cash Green
- Main title and subtitle
- Gradient dark background

### Slide 2-7: Content Slides
- Scroll down (or click navigation dots) to see:
  - The Stakes (Slide 2)
  - The Problem (Slide 3)
  - Active Projects Part 1 (Slide 4)
  - Active Projects Part 2 (Slide 5)
  - Our Workaround (Slide 6)
  - The Question (Slide 7)

## Navigation Tips

**Multiple Ways to Navigate:**

1. **Scroll** - Use mouse wheel or two-finger swipe
   - Slides snap into place automatically

2. **Navigation Dots** (right side)
   - Click any dot to jump to that slide
   - Active slide is highlighted in green

3. **Arrow Buttons** (right side)
   - Up arrow: Previous slide
   - Down arrow: Next slide

4. **Keyboard**
   - Arrow keys: Up/Down
   - Page Up/Down: Previous/Next slide
   - Space: Next slide

5. **Slide Counter** (right side)
   - Shows current position (e.g., "3 / 7")

## Troubleshooting

### "npm: command not found"
Install Node.js from https://nodejs.org/ (version 16 or higher)

### "Port 5173 already in use"
Vite will automatically try the next available port (5174, 5175, etc.)

### Dependencies won't install
Try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors during development
These won't prevent the app from running. The presentation will work fine.

### Page is blank
Check the browser console (F12) for errors and ensure all files were created correctly.

## Making Changes

### Edit Slide Content
Open `/Users/chart/trust-content-presentation/src/App.tsx` and modify the JSX content within each `<Slide>` component.

### Change Colors
Edit `/Users/chart/trust-content-presentation/src/index.css`:
```css
:root {
  --cash-green: #00E013;   /* Your color here */
  --dark-slate: #2c2c2c;   /* Your color here */
  --azure: #66CFFF;        /* Your color here */
  --violet: #BFB0FF;       /* Your color here */
}
```

### Add/Remove Slides
1. Edit `/Users/chart/trust-content-presentation/src/App.tsx`
2. Add/remove `<Slide>` components
3. Update `totalSlides` constant (line 9)

## Building for Production

### Create Production Build
```bash
npm run build
```

Output: `/Users/chart/trust-content-presentation/dist/`

### Preview Production Build
```bash
npm run preview
```

### Deploy

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
- Drag and drop the `dist/` folder to Netlify

**GitHub Pages:**
- Push `dist/` folder to gh-pages branch

## File Organization

```
trust-content-presentation/
├── 📄 Configuration
│   ├── package.json          # Dependencies
│   ├── tsconfig.json         # TypeScript config
│   ├── vite.config.ts        # Vite config
│   └── index.html            # HTML entry
│
├── 📂 Source Files
│   ├── src/
│   │   ├── main.tsx          # React entry
│   │   ├── App.tsx           # Main app + slides
│   │   ├── index.css         # Global styles
│   │   ├── App.css           # Slide styles
│   │   │
│   │   └── components/
│   │       ├── Slide.tsx     # Slide wrapper
│   │       ├── Navigation.tsx # Nav controls
│   │       └── SquareLogo.tsx # Logo SVG
│   │
└── 📚 Documentation
    ├── README.md             # Full documentation
    ├── SETUP.md              # Detailed setup
    ├── DESIGN_SYSTEM.md      # Design reference
    ├── CHECKLIST.md          # Implementation checklist
    └── QUICKSTART.md         # This file
```

## Design System Colors

- **Cash Green** (`#00E013`) - Primary accent, logo, highlights
- **Dark Slate** (`#2c2c2c`) - Background, primary surface
- **Azure** (`#66CFFF`) - Secondary accent, navigation
- **Violet** (`#BFB0FF`) - Tertiary accent, special sections
- **White** (`#ffffff`) - Primary text

## Key Features

- ✓ Full-screen scrollable slides
- ✓ Smooth scroll-snap behavior
- ✓ Multi-method navigation
- ✓ Responsive design (desktop/tablet/mobile)
- ✓ Cash App design system aesthetics
- ✓ Square branding with animated logo
- ✓ TypeScript for type safety
- ✓ Fast development with Vite HMR

## Support

For detailed information:
- Full docs: `README.md`
- Setup guide: `SETUP.md`
- Design reference: `DESIGN_SYSTEM.md`
- Checklist: `CHECKLIST.md`

## Next Steps

1. **Review content** - Check all 7 slides for accuracy
2. **Customize** - Adjust colors, fonts, content as needed
3. **Test** - Try on different devices and browsers
4. **Present** - Share with stakeholders
5. **Deploy** - Put it live for wider access

---

**Quick Reference:**
- Start dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- URL: http://localhost:5173

**Need help?** Check the other documentation files or contact the Trust Design team.

# Design System Reference

## Color Palette

### Primary Colors

**Cash Green** - `#00E013`
- Usage: Primary accent, highlights, call-to-action elements, active states
- Components: Logo background, slide borders, highlights, checkmarks
- Accessibility: High contrast on dark backgrounds

**Dark Slate Gray** - `#2c2c2c`
- Usage: Primary background, main surface color
- Components: Slide backgrounds, logo icon elements
- Accessibility: Provides strong contrast with light text

### Accent Colors

**Azure** - `#66CFFF`
- Usage: Secondary accent, informational elements, subtle highlights
- Components: Subtitle text, bullet points, navigation dots, borders
- Accessibility: Good contrast on dark backgrounds

**Violet** - `#BFB0FF`
- Usage: Tertiary accent, special sections
- Components: Workaround slide theme, decorative elements
- Accessibility: Suitable for accent use

### Supporting Colors

**White** - `#ffffff`
- Usage: Primary text color, high-contrast elements
- Components: Headings, body text, card text
- Accessibility: Maximum contrast on dark backgrounds

**Light Gray** - `#f5f5f5`
- Usage: Subtle backgrounds, secondary text
- Components: Card hover states, muted text
- Note: Use sparingly for best contrast

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

**Fallback order:**
1. San Francisco (macOS/iOS)
2. Segoe UI (Windows)
3. Roboto (Android)
4. System sans-serif

### Type Scale

**Display/Hero Text**
- Main title: `4rem` (64px) - Desktop
- Main title: `3rem` (48px) - Tablet
- Main title: `2rem` (32px) - Mobile
- Weight: 700 (Bold)
- Line height: 1.2

**Headings**
- H2 (Slide titles): `3rem` (48px) - Desktop
- H2 (Slide titles): `2.5rem` (40px) - Tablet
- H2 (Slide titles): `1.8rem` (28.8px) - Mobile
- Weight: 700 (Bold)
- Line height: 1.3

**Subheadings**
- H3 (Card titles): `1.8rem` (28.8px)
- H3 (Options): `2rem` (32px)
- Weight: 600 (Semi-bold) to 700 (Bold)
- Line height: 1.3

**Body Text**
- Large: `1.8rem` (28.8px) - Bullet points, important text
- Medium: `1.5rem` (24px) - Feature items
- Regular: `1.3rem` (20.8px) - Card descriptions
- Small: `0.9rem` (14.4px) - Badges, labels
- Weight: 400 (Regular)
- Line height: 1.5-1.6

### Text Styling

**Line Heights**
- Headlines: 1.2
- Headings: 1.3
- Body: 1.5
- Long-form: 1.6

**Letter Spacing**
- Default: normal
- Badges/Labels: 0.5px (uppercase)

## Spacing System

### Base Unit: `1rem` = 16px

**Spacing Scale:**
- xs: `0.5rem` (8px)
- sm: `1rem` (16px)
- md: `1.5rem` (24px)
- lg: `2rem` (32px)
- xl: `3rem` (48px)
- 2xl: `4rem` (64px)
- 3xl: `6rem` (96px)

**Common Uses:**
- Card padding: `2rem` to `3rem`
- Section padding: `4rem` to `6rem`
- Element gaps: `1.5rem` to `2rem`
- Bullet margins: `2rem`
- Logo margin: `4rem`

## Layout

### Container Widths

**Max Widths:**
- Content containers: `1200px`
- Text blocks: `1000px`
- Subtitle text: `800px` to `900px`
- Options: `1400px`

**Breakpoints:**
- Large desktop: `1400px` and up
- Desktop: `1024px` to `1399px`
- Tablet: `768px` to `1023px`
- Mobile: `767px` and below

### Grid System

**Stats Grid:**
- Desktop: 2 columns
- Mobile: 1 column
- Gap: `2rem`

**Projects List:**
- Single column (vertical stack)
- Gap: `1.5rem`

**Features Grid:**
- Single column (vertical stack)
- Gap: `2rem`

**Options Layout:**
- Desktop: Horizontal (flex-row)
- Mobile: Vertical (flex-column)
- Gap: `3rem`

## Components

### Cards

**Base Style:**
```css
background: rgba(255, 255, 255, 0.05);
padding: 2rem to 3rem;
border-radius: 12px to 16px;
border: 2px to 3px solid (varies by type);
```

**Card Types:**

**Stat Cards:**
- Border: Azure (`rgba(102, 207, 255, 0.2)`)
- Hover: Brighter border, translate up
- Critical variant: Green background tint

**Project Cards:**
- Border-left: 6px solid (varies)
- Default: Azure border
- Code Red: Red border (`#ff4444`)
- Completed: Green border

**Feature Cards:**
- Background: Violet tint (`rgba(191, 176, 255, 0.05)`)
- Border: Violet (`rgba(191, 176, 255, 0.2)`)

**Option Cards:**
- Border: 3px Azure
- Hover: Green border, scale up, green tint
- Large padding for emphasis

### Badges

**Style:**
```css
padding: 0.4rem 1rem;
border-radius: 20px;
font-size: 0.9rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.5px;
```

**Variants:**
- Code Red: Red background, white text
- Completed: Green background, dark text

### Navigation

**Dots:**
- Size: 12px (default), 16px (active)
- Border: 2px solid Azure
- Active: Green fill
- Hover: Azure fill, scale up

**Arrows:**
- Size: 40px circle
- Border: 2px solid Azure
- Background: Dark with blur backdrop
- Hover: Azure background, dark text

**Counter:**
- Background: Dark with blur backdrop
- Text: Azure
- Padding: 0.5rem 1rem
- Border radius: 20px

### Logo

**Square Logo:**
- Size: 180x180px
- Background: Circular, Cash Green
- Icon: Dark geometric square
- Animation: Float (3s ease-in-out infinite)

## Interactions

### Hover States

**Cards:**
```css
transform: translateY(-4px) or translateX(8px);
transition: all 0.3s ease;
```

**Navigation:**
```css
transform: scale(1.1) or scale(1.3);
transition: all 0.3s ease;
```

**Options:**
```css
transform: scale(1.05);
border-color: var(--cash-green);
```

### Transitions

**Standard Duration:** `0.3s`
**Easing:** `ease` or `ease-in-out`
**Properties:** `all` or specific properties

### Scroll Behavior

**Scroll Snap:**
```css
scroll-snap-type: y mandatory;
scroll-snap-align: start;
scroll-snap-stop: always;
scroll-behavior: smooth;
```

## Animation

### Logo Float Animation
```css
@keyframes float {
  0%, 100%: translateY(0px)
  50%: translateY(-10px)
}
Duration: 3s
Easing: ease-in-out
Loop: infinite
```

### Recommended Animations
- Subtle hover effects (scale, translate)
- Smooth color transitions
- Fade-in on load (optional)
- Avoid overly flashy animations

## Accessibility

### Color Contrast

**WCAG AAA (Preferred):**
- White on Dark Slate: 15.8:1 ✓
- Cash Green on Dark Slate: 4.8:1 (AA)
- Azure on Dark Slate: 5.2:1 ✓

**Text Sizes:**
- Minimum for body: 16px (1rem)
- Larger text for presentation: 20px+ (1.25rem+)

### Interactive Elements

**Requirements:**
- Minimum touch target: 40x40px
- ARIA labels on all buttons
- Keyboard navigation support
- Focus visible styles

### Semantic HTML

- Proper heading hierarchy (h1 → h2 → h3)
- Button elements for interactions
- List elements for lists
- Semantic HTML5 tags

## Best Practices

### Do's
- Use CSS variables for consistency
- Maintain spacing rhythm
- Keep animations subtle
- Ensure high contrast
- Test on all breakpoints
- Use semantic HTML

### Don'ts
- Don't use pure black (`#000000`)
- Don't mix too many accent colors
- Don't overuse animations
- Don't ignore mobile viewport
- Don't forget hover states
- Don't skip accessibility features

## CSS Variables Reference

```css
:root {
  --cash-green: #00E013;
  --dark-slate: #2c2c2c;
  --azure: #66CFFF;
  --violet: #BFB0FF;
  --white: #ffffff;
  --light-gray: #f5f5f5;
}
```

**Usage:**
```css
color: var(--cash-green);
background: var(--dark-slate);
border-color: var(--azure);
```

## File Locations

- Global variables: `/Users/chart/trust-content-presentation/src/index.css`
- Component styles: `/Users/chart/trust-content-presentation/src/App.css`
- Navigation styles: `/Users/chart/trust-content-presentation/src/components/Navigation.css`
- Logo styles: `/Users/chart/trust-content-presentation/src/components/SquareLogo.css`

---

**Design System Version:** 1.0
**Last Updated:** 2026-02-24
**Maintainer:** Square Trust Design Team

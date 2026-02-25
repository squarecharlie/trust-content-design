# AnimatedTwoColumnModule

A state machine-driven animated two-column module for progressive content reveal with proper timing control and accessibility support.

## Architecture

### State Machine
The component uses a clean state machine with these states:
- `idle` - Module not yet in viewport
- `enter` - Module sliding up into view
- `cycling` - Cycling through right column phrases
- `exit` - Module sliding up out of view
- `complete` - Animation finished

### How It Works
1. **IntersectionObserver** detects when the module enters the viewport
2. **State machine** controls transitions between states
3. **Left column** remains visually fixed throughout (no animation after initial entry)
4. **Right column phrases** crossfade with precise timing
5. **Module transitions** slide entire module up/down between modules

## Usage

```tsx
import AnimatedTwoColumnModule from './components/AnimatedTwoColumnModule'

<AnimatedTwoColumnModule
  modules={[
    {
      leftColumn: "The Trust team handles some of the most critical flows",
      rightPhrases: [
        { text: "Establishing<br/>your identity", html: true },
        { text: "Handling<br/>problems", html: true },
        { text: "Getting help", html: true }
      ]
    }
  ]}
  phraseDisplayDuration={1600}  // Optional: ms to show each phrase
  crossfadeDuration={300}        // Optional: ms for crossfade transition
  slideUpDuration={600}          // Optional: ms for module transitions
/>
```

## Props

### `modules` (required)
Array of module data objects:
```typescript
interface ModuleData {
  leftColumn: string              // Text for left column (stays fixed)
  rightPhrases: Phrase[]          // Array of phrases for right column
}

interface Phrase {
  text: string                    // Phrase text
  html?: boolean                  // Optional: render as HTML (for <br/> tags)
}
```

### `phraseDisplayDuration` (optional, default: 1600ms)
How long each phrase displays before crossfading to the next.

**Tuning guide:**
- 1200ms - Fast paced, energetic
- 1600ms - Balanced (recommended)
- 2000ms - Slower, more contemplative
- 2400ms - Very slow, dramatic emphasis

### `crossfadeDuration` (optional, default: 300ms)
Duration of the opacity transition between phrases.

**Tuning guide:**
- 200ms - Sharp, immediate
- 300ms - Smooth (recommended)
- 400ms - Gentle
- 500ms - Very gradual

### `slideUpDuration` (optional, default: 600ms)
Duration for the module slide up/down transitions.

**Tuning guide:**
- 400ms - Quick, energetic
- 600ms - Balanced (recommended)
- 800ms - Slower, more dramatic
- 1000ms - Very slow, cinematic

## Adding Multiple Modules

To create a carousel of modules (each with their own left/right content):

```tsx
<AnimatedTwoColumnModule
  modules={[
    {
      leftColumn: "First fixed text",
      rightPhrases: [
        { text: "Phrase 1" },
        { text: "Phrase 2" },
        { text: "Phrase 3" }
      ]
    },
    {
      leftColumn: "Second fixed text",
      rightPhrases: [
        { text: "Another phrase 1" },
        { text: "Another phrase 2" }
      ]
    }
  ]}
/>
```

The module will:
1. Slide up into view
2. Cycle through all phrases in module 1
3. Slide module 1 up out of view
4. Slide module 2 up into view
5. Cycle through all phrases in module 2
6. Stay on the last phrase of the last module

## Accessibility

The component automatically respects `prefers-reduced-motion`:
- When enabled, animations are simplified
- Module appears immediately without slide-up
- Phrase crossfades use faster timing (150ms)
- No transform animations

## Timing Calculation

Total time for a module:
```
totalTime = (phraseCount * phraseDisplayDuration) +
            ((phraseCount - 1) * crossfadeDuration) +
            slideUpDuration
```

Example with 3 phrases:
```
totalTime = (3 * 1600ms) + (2 * 300ms) + 600ms
          = 4800ms + 600ms + 600ms
          = 6000ms (6 seconds)
```

## CSS Customization

Key CSS variables you can adjust in `AnimatedTwoColumnModule.css`:

```css
/* Typography */
.column-left h2,
.right-phrase h2 {
  font-size: 80px;           /* Adjust text size */
  font-weight: 400;          /* Adjust weight */
  line-height: 1.1;          /* Adjust line height */
}

/* Layout */
.module-content {
  gap: 80px;                 /* Space between columns */
  max-width: 1400px;         /* Maximum content width */
  padding: 0 80px;           /* Horizontal padding */
}

/* Easing curves */
.right-phrase {
  transition: opacity 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

@keyframes slideModuleUp {
  /* Adjust enter/exit easing here */
}
```

## Troubleshooting

### Left column is animating
- Check that you're not applying global animation classes to the module
- Verify the `.column-left` has no animation/transition CSS
- The left column should only animate during the initial `enter` state

### Phrases change too quickly/slowly
- Adjust `phraseDisplayDuration` prop
- Remember: this includes time for reading + crossfade

### Module transitions feel abrupt
- Increase `slideUpDuration` prop
- Adjust easing curve in `@keyframes slideModuleUp`

### Crossfades are jarring
- Increase `crossfadeDuration` prop
- Verify opacity transitions are using correct easing curve

## Technical Details

- **No pile of timeouts**: Single `useEffect` with state machine logic
- **IntersectionObserver**: Viewport detection, not scroll listeners
- **Proper cleanup**: All timers cleared on unmount
- **Type-safe**: Full TypeScript support
- **Accessible**: Respects user motion preferences
- **Performant**: CSS transforms and opacity (GPU accelerated)

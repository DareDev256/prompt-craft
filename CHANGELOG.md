# Changelog

## [0.6.1] - 2026-03-13

### Added
- Vitest test infrastructure — `vitest.config.ts`, `npm test` and `npm run test:watch` scripts
- 19 unit tests for the COSTAR scoring engine covering: tier boundary classification (bad/ok/good/excellent at 0, 9, 10, 18, 24), specificity bonus penalties and rewards at character boundaries (20/150), individual dimension keyword detection and case-insensitivity, HIT_SCORE mapping verification (1→2, 2→3, 3→4, 4+→5), total score clamping to [0, 30], and return value shape contracts

## [0.6.0] - 2026-03-13

### Changed
- Extracted SelectPhase into its own component (`components/game/SelectPhase.tsx`), completing the phase extraction pattern started in v0.4.0 — all 4 game phases now have dedicated components
- Extracted auto-select logic into `useQuickForge` hook (`hooks/useQuickForge.ts`) — encapsulates `?quick=true` URL detection, ref guard, and deferred category selection
- PlayContent is now a pure state machine orchestrator with zero inline rendering — each phase delegates to its own component
- Removed unused `useSearchParams`, `motion`, `Button`, `categories`, `TEXT`, `MOTION` imports from play page

## [0.5.0] - 2026-03-11

### Added
- COSTAR radar chart visualization on the result phase — animated SVG hexagon that maps each of the 6 scoring dimensions as axes, expanding from center on reveal
- Dimension labels color-code by score (amber for strong, gold for mid, red for weak) providing instant visual feedback
- Full ARIA labeling for screen reader accessibility on the chart

### Changed
- Result phase replaces the flat 3×2 number grid with the radar chart for a more intuitive "shape of your prompt" visualization

## [0.4.0] - 2026-03-10

### Changed
- Extracted PromptPhase and ResultPhase from the 261-line `play/page.tsx` monolith into dedicated components (`components/game/PromptPhase.tsx`, `components/game/ResultPhase.tsx`)
- `PlayContent` now acts as a lean state machine orchestrator (~160 lines) instead of mixing state management with phase rendering
- Removed unused `AnimatePresence`, `DIMENSION_LABELS`, `TIER_COLORS`, `TIER_LABELS`, `BOX` imports from the play page — each phase component imports only what it needs
- Each phase component has a clean props interface, making them independently testable and reusable

## [0.3.1] - 2026-03-09

### Fixed
- Game timer now starts when a category is selected, not on component mount — previously inflated elapsed time by including time spent browsing categories
- Victory screen no longer shows a blank page if results haven't populated yet — displays "TALLYING RESULTS..." loading state as fallback
- XP bar no longer shows empty (0/100 XP) at exact level boundaries — displays full bar (100/100 XP) so players see completion before the next level

## [0.3.0] - 2026-03-08

### Changed
- Centralized tier display config (TIER_COLORS, TIER_LABELS) into `costar.ts` — single source of truth for forge tier metadata
- Extracted shared style tokens (`TEXT`, `BOX`, `MOTION`) into `lib/styles.ts` — eliminates 15+ repeated className strings across `play/page.tsx`
- Replaced duplicated state-reset logic in victory callbacks with a `resetGame()` helper
- Simplified `scoreDimension` if/else chain with a `HIT_SCORE` lookup table
- All Framer Motion transition presets now live in `MOTION` constants for consistent animation timing

## [0.2.1] - 2026-03-06

### Fixed
- "QUICK FORGE" button now auto-selects a random category and skips the selection screen, delivering on its promise of a fast-start experience
- Previously both landing page buttons routed to the same category selection screen with no behavioral difference

## [0.2.0] - 2026-02-21

### Added
- COSTAR scoring engine — evaluates prompts on 6 dimensions (Context, Objective, Style, Tone, Audience, Response format) with keyword detection and specificity bonuses
- 10 curriculum items across 2 categories: Basic Prompts (5) and Context Setting (5)
- Each item includes goal, master prompt, and 4-tier pre-written AI responses (bad/ok/good/excellent)
- Full game loop: category select → prompt input → COSTAR score → simulated response → master prompt reveal → victory screen
- Forge-themed result tiers: Raw Ore, Rough Cast, Forged Steel, Master Craft
- Educational enrichment on every item (why it matters, real-world example, pro tip)
- Forge spark CSS animations (ember-rise, forge-glow)
- Cyberpunk forge landing page with themed copy and navigation

### Changed
- Landing page buttons updated to forge-themed labels ("Enter the Forge")
- Loading state now reads "Heating the Forge..."
- Decorative corners widened with secondary color for industrial feel

## [0.1.0] - 2026-02-20

### Added
- Initial scaffold from Passionate Learning template
- Landing page with pixel art aesthetic
- UI components: Button, Logo, StreakBadge, XPBar
- Game components: Timer, VictoryScreen
- Hooks: useProgress, useGameStats, useSoundEffects
- localStorage persistence layer with FSRS-ready architecture
- ESLint 9 flat config

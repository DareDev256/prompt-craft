# Changelog

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

# Changelog

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

# CLAUDE.md — Prompt Craft

## Project: Passionate Learning Game #1
A web-based educational game that teaches prompt engineering through gameplay.

## Game Identity
- **Title**: PROMPT CRAFT
- **Subtitle**: Master the Art of Talking to AI
- **Tagline**: CRAFT PROMPTS. SHAPE AI.
- **Storage key prefix**: `prompt_craft`

## Full Spec
Read `/Users/tdot/Documents/Projects/passionate-learning/specs/01-prompt-craft.md` for the complete game specification including mechanics, curriculum structure, UI elements, and sample content.

## Tech Stack
- Next.js 16 + React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first `@theme inline`)
- Framer Motion for animations
- localStorage persistence (SSR-safe)
- Deploy: Vercel

## Template
This project was scaffolded from the Passionate Learning shared template at `/Users/tdot/Documents/Projects/passionate-learning/template/`. Shared components, hooks, types, and storage layer are already in place.

## Theme Colors (override in globals.css :root)
```css
--game-primary: #ff8c00;   /* amber */
--game-secondary: #ff4500; /* deep orange */
--game-accent: #ffd700;    /* gold */
--game-dark: #1a0f00;
```

## Core Mechanic
Player sees a goal → writes a prompt → scored on COSTAR dimensions → sees simulated AI response at quality tier matching score.

## Build Priority
1. Landing page with theme applied
2. Core prompt input + COSTAR scoring engine
3. Simulated response display (pre-written tiers: bad/ok/good/excellent)
4. Progression system (categories, levels, mastery gates)
5. COSTAR radar chart visualization
6. Full curriculum (200 items across 8 categories)
7. Polish (animations, mobile responsive, sound effects)

## Quality Bar
- Production-grade. No placeholders.
- Zero API keys required — all AI responses are pre-written.
- Mobile responsive.
- Consistent with TypeMaster AI quality level.

## Commands
```bash
npm run dev    # Development server
npm run build  # Production build
npm run lint   # ESLint check
```

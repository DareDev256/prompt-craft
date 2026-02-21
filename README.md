# ⚒ PROMPT CRAFT

**Master the Art of Talking to AI**

An educational browser game that teaches prompt engineering through the COSTAR framework. Write prompts, get scored on 6 dimensions, and see how prompt quality directly affects AI output — all without any API keys.

> Part of the **Passionate Learning** series by DareDev256

## 🎮 How It Works

1. **Choose a category** — Basic Prompts or Context Setting (more coming)
2. **Read the goal** — e.g., "Get AI to write a haiku about coding"
3. **Craft your prompt** — Write the best prompt you can
4. **Get scored** — COSTAR engine evaluates 6 dimensions (0-5 each, max 30)
5. **See the result** — Pre-written AI response at the quality tier matching your score
6. **Learn the master prompt** — See the ideal version with educational insights

## 🔥 COSTAR Scoring

| Dimension | What It Measures |
|-----------|-----------------|
| **C**ontext | Background and situation setting |
| **O**bjective | Clear task definition |
| **S**tyle | Writing style specification |
| **T**one | Emotional tone direction |
| **A**udience | Target reader identification |
| **R**esponse format | Output structure specification |

## 🏗 Tech Stack

- **Next.js 16** + React 19 + TypeScript (strict)
- **Tailwind CSS v4** — CSS-first `@theme inline`
- **Framer Motion** — Animations and micro-interactions
- **ts-fsrs** — Spaced repetition scheduling (ready for Phase 2)
- **localStorage** — SSR-safe persistence, zero backend
- **Zero API keys** — All AI responses are pre-written

## 🚀 Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Production build
npm run lint    # ESLint check
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page (forge theme)
│   └── play/page.tsx     # Core game loop
├── components/
│   ├── ui/               # Button, Logo, StreakBadge, XPBar
│   └── game/             # Timer, VictoryScreen
├── data/
│   └── curriculum.ts     # 10 prompt challenges with 4-tier responses
├── hooks/                # useProgress, useGameStats, useSoundEffects
├── lib/
│   ├── costar.ts         # COSTAR scoring engine
│   └── storage.ts        # localStorage persistence layer
└── types/
    └── game.ts           # Shared type definitions
```

## 🎨 Aesthetic

**Cyberpunk forge** — Amber/orange neon on dark backgrounds. Anvil imagery, sparks, molten metal glow. The player is a "prompt smith" forging prompts at their workbench.

## 📋 Current Content

- **Basic Prompts** (5 items) — Single clear instructions
- **Context Setting** (5 items) — Adding background for better outputs
- 8 categories planned, 200 total items

---

*Passionate Learning by DareDev256*

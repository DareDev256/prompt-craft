// ─── Shared Style Tokens ───
// Reusable className constants for the forge UI.
// Keeps play/page.tsx and future components DRY.

/** Pixel-font label styles used across phases */
export const TEXT = {
  /** Category headers, section labels */
  label: "font-pixel text-[8px] text-game-accent/60",
  /** Smaller sub-labels (COSTAR breakdown cells) */
  labelSm: "font-pixel text-[7px] text-game-accent/50",
  /** Muted hint text (char count, COSTAR reminder) */
  hint: "font-pixel text-[8px] text-game-primary/30",
  /** Subtle accent hint */
  hintAccent: "font-pixel text-[8px] text-game-accent/30",
  /** Section heading (secondary color) */
  sectionHead: "font-pixel text-[8px] text-game-secondary mb-2",
  /** Progress counter (e.g. 2/5) */
  progress: "font-pixel text-[8px] text-game-primary/60",
} as const;

/** Common container/box patterns */
export const BOX = {
  /** Goal card, master prompt reveal */
  panel: "p-4 border-2 border-game-secondary/40 bg-game-dark/30",
  /** COSTAR breakdown cell */
  cell: "p-2 border border-game-primary/20 bg-game-dark/30 text-center",
  /** Simulated AI response block */
  response: "p-4 border-2 border-game-primary/20 bg-game-black/80 whitespace-pre-wrap font-pixel text-[9px] text-white/80 leading-relaxed max-h-60 overflow-y-auto",
  /** Enrichment/pro-tip block */
  enrichment: "mt-2 p-3 border border-game-primary/10 bg-game-dark/20",
} as const;

/** Reusable Framer Motion transition presets */
export const MOTION = {
  fadeUp: { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 } },
  fadeIn: (delay = 0) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay } }),
  springPop: { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { type: "spring", bounce: 0.4 } },
  slideUp: (delay = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay } }),
} as const;

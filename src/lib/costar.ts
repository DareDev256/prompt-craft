// ─── COSTAR Scoring Engine ───
// Evaluates prompts on 6 dimensions: Context, Objective, Style, Tone, Audience, Response format

export interface COSTARScore {
  context: number;      // 0-5
  objective: number;
  style: number;
  tone: number;
  audience: number;
  responseFormat: number;
  total: number;         // 0-30
  tier: "bad" | "ok" | "good" | "excellent";
}

const KEYWORDS: Record<string, string[]> = {
  context: ["you are", "given that", "context:", "background:", "scenario:", "imagine", "suppose", "as a", "working on", "situation"],
  objective: ["write", "explain", "create", "generate", "summarize", "analyze", "list", "describe", "help me", "translate", "compare", "design"],
  style: ["formal", "casual", "technical", "simple", "concise", "detailed", "academic", "conversational", "professional", "creative", "brief"],
  tone: ["friendly", "professional", "enthusiastic", "serious", "humorous", "empathetic", "confident", "warm", "neutral", "encouraging"],
  audience: ["for a", "aimed at", "targeting", "beginner", "expert", "child", "student", "developer", "manager", "non-technical", "audience"],
  responseFormat: ["bullet points", "paragraph", "list", "step by step", "table", "json", "markdown", "numbered", "format:", "structured as", "in the form of"],
};

function scoreDimension(input: string, dimension: string): number {
  const lower = input.toLowerCase();
  const keys = KEYWORDS[dimension] || [];
  const hits = keys.filter(k => lower.includes(k)).length;
  // 0 hits = 0, 1 = 2, 2 = 3, 3 = 4, 4+ = 5
  if (hits === 0) return 0;
  if (hits === 1) return 2;
  if (hits === 2) return 3;
  if (hits === 3) return 4;
  return 5;
}

// Bonus for length/specificity: short prompts (<20 chars) get penalized
function specificityBonus(input: string): number {
  if (input.length < 20) return -1;
  if (input.length > 150) return 1;
  return 0;
}

export function scorePrompt(input: string): COSTARScore {
  const c = scoreDimension(input, "context");
  const o = scoreDimension(input, "objective");
  const s = scoreDimension(input, "style");
  const t = scoreDimension(input, "tone");
  const a = scoreDimension(input, "audience");
  const r = scoreDimension(input, "responseFormat");
  const raw = c + o + s + t + a + r + specificityBonus(input);
  const total = Math.max(0, Math.min(30, raw));
  const tier = total >= 24 ? "excellent" : total >= 18 ? "good" : total >= 10 ? "ok" : "bad";
  return { context: c, objective: o, style: s, tone: t, audience: a, responseFormat: r, total, tier };
}

export const DIMENSION_LABELS: Record<string, string> = {
  context: "CONTEXT",
  objective: "OBJECTIVE",
  style: "STYLE",
  tone: "TONE",
  audience: "AUDIENCE",
  responseFormat: "FORMAT",
};

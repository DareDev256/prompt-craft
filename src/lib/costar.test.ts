import { describe, it, expect } from "vitest";
import { scorePrompt } from "./costar";

// ─── Helper ───
const score = (input: string) => scorePrompt(input);

describe("COSTAR Scoring Engine", () => {
  // ─── Tier Boundaries ───
  describe("tier classification", () => {
    it("scores empty string as 'bad' with all zeros", () => {
      const r = score("");
      expect(r.total).toBe(0);
      expect(r.tier).toBe("bad");
      expect(r.context).toBe(0);
      expect(r.objective).toBe(0);
    });

    it("clamps negative totals to 0 (short input, no keywords)", () => {
      // < 20 chars = -1 specificity, 0 keyword hits → raw = -1 → clamped to 0
      const r = score("hi");
      expect(r.total).toBe(0);
      expect(r.tier).toBe("bad");
    });

    it("'bad' tier at score 9", () => {
      // "write" → objective 2, short penalty → total ≤ 9
      const r = score("write a poem");
      expect(r.tier).toBe("bad");
      expect(r.total).toBeLessThanOrEqual(9);
    });

    it("'ok' tier boundary at score 10", () => {
      // Craft a prompt hitting enough keywords to land at 10-17
      const r = score(
        "you are a helpful assistant. write a detailed explanation for a beginner student"
      );
      expect(r.total).toBeGreaterThanOrEqual(10);
      expect(r.tier).toBe("ok");
    });

    it("'good' tier boundary at score 18", () => {
      const r = score(
        "you are a senior developer. given that we use React, create a detailed technical guide in a professional tone for a beginner developer. use bullet points and step by step format."
      );
      expect(r.total).toBeGreaterThanOrEqual(18);
      expect(["good", "excellent"]).toContain(r.tier);
    });

    it("'excellent' tier at score 24+", () => {
      const r = score(
        "you are a senior developer working on a cloud situation. given that the background: involves microservices, imagine the scenario: of scaling. create and design a detailed technical academic guide in a professional enthusiastic encouraging tone for a beginner expert non-technical audience. format: bullet points and step by step, structured as a numbered list in the form of a table."
      );
      expect(r.total).toBeGreaterThanOrEqual(24);
      expect(r.tier).toBe("excellent");
    });
  });

  // ─── Specificity Bonus ───
  describe("specificity bonus", () => {
    it("penalizes prompts under 20 characters", () => {
      const short = score("write poem");      // 10 chars, objective:2, penalty:-1 → 1
      const longer = score("write a poem about nature in spring"); // >20 chars
      // Short gets -1 penalty, longer doesn't
      expect(short.total).toBeLessThan(longer.total);
    });

    it("rewards prompts over 150 characters", () => {
      const base = "write a formal explanation for a beginner";
      const padded = base + ". ".repeat(60); // push past 150 chars
      const short_r = score(base);
      const long_r = score(padded);
      expect(long_r.total).toBe(short_r.total + 1);
    });

    it("no bonus or penalty between 20-150 chars", () => {
      const a = score("write a formal explanation for beginners"); // ~40 chars
      // Same keywords, same dimension scores — just verify no unexpected bonus
      expect(a.total).toBe(a.context + a.objective + a.style + a.tone + a.audience + a.responseFormat);
    });
  });

  // ─── Dimension Scoring ───
  describe("individual dimensions", () => {
    it("detects context keywords (you are, given that, background:)", () => {
      const r = score("you are a teacher. given that the background: is math, imagine a classroom situation");
      // 5 hits: "you are", "given that", "background:", "imagine", "situation" → score 5
      expect(r.context).toBe(5);
    });

    it("detects objective keywords", () => {
      const r = score("write and explain a concept, then create and generate examples");
      // 4 hits: write, explain, create, generate → score 5
      expect(r.objective).toBe(5);
    });

    it("scores 0 for dimensions with no matching keywords", () => {
      const r = score("write something"); // only objective hit
      expect(r.style).toBe(0);
      expect(r.tone).toBe(0);
      expect(r.audience).toBe(0);
      expect(r.responseFormat).toBe(0);
    });

    it("caps dimension score at 5 even with many keyword hits", () => {
      const r = score(
        "write explain create generate summarize analyze list describe help me translate compare design"
      );
      // 12 objective hits but HIT_SCORE caps at index 4 → score 5
      expect(r.objective).toBe(5);
    });

    it("keyword matching is case-insensitive", () => {
      const lower = score("YOU ARE a FRIENDLY expert DEVELOPER");
      const upper = score("you are a friendly expert developer");
      expect(lower.context).toBe(upper.context);
      expect(lower.tone).toBe(upper.tone);
      expect(lower.audience).toBe(upper.audience);
    });

    it("HIT_SCORE mapping: 1 hit → 2, 2 hits → 3, 3 hits → 4", () => {
      // 1 hit: "write" → 2
      expect(score("write something for testing this feature").objective).toBe(2);
      // 2 hits: "write" + "explain" → 3
      expect(score("write and explain something for testing").objective).toBe(3);
      // 3 hits: "write" + "explain" + "create" → 4
      expect(score("write explain create something for testing").objective).toBe(4);
    });
  });

  // ─── Total Clamping ───
  describe("total score clamping", () => {
    it("never exceeds 30", () => {
      // Max possible: 6 dimensions × 5 = 30, plus +1 specificity = 31 → clamped
      const r = score(
        "you are given that context: background: scenario: imagine suppose as a working on situation. write explain create generate summarize analyze list describe help me translate compare design. formal casual technical simple concise detailed academic conversational professional creative brief. friendly professional enthusiastic serious humorous empathetic confident warm neutral encouraging. for a aimed at targeting beginner expert child student developer manager non-technical audience. bullet points paragraph list step by step table json markdown numbered format: structured as in the form of"
      );
      expect(r.total).toBeLessThanOrEqual(30);
    });

    it("never goes below 0", () => {
      const r = score("x"); // 1 char → -1 penalty, no hits → raw = -1
      expect(r.total).toBe(0);
    });
  });

  // ─── Return Shape ───
  describe("return value shape", () => {
    it("returns all 8 expected properties", () => {
      const r = score("test prompt");
      const keys = Object.keys(r).sort();
      expect(keys).toEqual(
        ["audience", "context", "objective", "responseFormat", "style", "tier", "tone", "total"].sort()
      );
    });

    it("all dimension scores are integers between 0 and 5", () => {
      const r = score("you are a friendly expert. write a formal guide with bullet points");
      for (const dim of ["context", "objective", "style", "tone", "audience", "responseFormat"] as const) {
        expect(r[dim]).toBeGreaterThanOrEqual(0);
        expect(r[dim]).toBeLessThanOrEqual(5);
        expect(Number.isInteger(r[dim])).toBe(true);
      }
    });
  });
});

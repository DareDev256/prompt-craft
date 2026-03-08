"use client";

import { Suspense, useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { VictoryScreen } from "@/components/game/VictoryScreen";
import { categories, items, PromptItem } from "@/data/curriculum";
import { scorePrompt, COSTARScore, DIMENSION_LABELS, TIER_COLORS, TIER_LABELS } from "@/lib/costar";
import { TEXT, BOX, MOTION } from "@/lib/styles";
import { useProgress } from "@/hooks/useProgress";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { GameResults } from "@/types/game";

type Phase = "select" | "prompt" | "result" | "victory";

// Suspense wrapper — required by Next.js for useSearchParams during static generation
export default function PlayPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-pixel text-xs text-game-primary animate-pulse-neon">HEATING THE FORGE...</p>
      </main>
    }>
      <PlayContent />
    </Suspense>
  );
}

function PlayContent() {
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<Phase>("select");
  const [categoryId, setCategoryId] = useState("");
  const [queue, setQueue] = useState<PromptItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState<COSTARScore | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const startTimeRef = useRef(0);
  useEffect(() => { startTimeRef.current = Date.now(); }, []);
  const { earnXP } = useProgress();
  const { playCorrect, playIncorrect, playCelebration } = useSoundEffects();

  const item = queue[current] as PromptItem | undefined;

  const selectCategory = useCallback((id: string) => {
    setCategoryId(id);
    const catItems = items.filter(i => i.category === id) as PromptItem[];
    setQueue(catItems.slice(0, 5));
    setCurrent(0);
    setPhase("prompt");
  }, []);

  // Auto-select: ?quick=true picks a random category and skips selection
  const didAutoSelect = useRef(false);
  useEffect(() => {
    if (didAutoSelect.current) return;
    if (searchParams.get("quick") === "true" && categories.length > 0) {
      didAutoSelect.current = true;
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      // Deferred to satisfy react-hooks/set-state-in-effect — batched on next frame
      requestAnimationFrame(() => selectCategory(randomCat.id));
    }
  }, [searchParams, selectCategory]);

  const submitPrompt = useCallback(() => {
    if (!input.trim() || !item) return;
    const result = scorePrompt(input);
    setScore(result);
    setScores(prev => [...prev, result.total]);
    if (result.total >= 10) playCorrect();
    else playIncorrect();
    setPhase("result");
  }, [input, item, playCorrect, playIncorrect]);

  const [finalResults, setFinalResults] = useState<GameResults | null>(null);

  /** Reset all mutable game state — shared by "play again" and "back to menu" */
  const resetGame = useCallback(() => {
    setScores([]);
    setCurrent(0);
    setInput("");
    setScore(null);
    setFinalResults(null);
  }, []);

  const computeResults = useCallback(() => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const passing = scores.filter(s => s >= 10).length;
    const xp = Math.round(avg * 2);
    earnXP(xp);
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    setFinalResults({ xp, accuracy: Math.round((passing / scores.length) * 100), speed: elapsed, correctAnswers: passing, totalQuestions: scores.length });
  }, [scores, earnXP]);

  const nextItem = useCallback(() => {
    if (current + 1 >= queue.length) {
      playCelebration();
      computeResults();
      setPhase("victory");
    } else {
      setCurrent(prev => prev + 1);
      setInput("");
      setScore(null);
      setPhase("prompt");
    }
  }, [current, queue.length, playCelebration, computeResults]);

  // ─── SELECT PHASE ───
  if (phase === "select") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
        <h1 className="font-pixel text-lg text-game-primary neon-glow">SELECT YOUR FORGE</h1>
        <p className={TEXT.label}>Choose a category to begin crafting</p>
        <div className="flex flex-col gap-4 w-full max-w-md">
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => selectCategory(cat.id)}
              className="p-4 border-2 border-game-primary/40 bg-game-dark/50 text-left hover:border-game-primary hover:bg-game-primary/5 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,140,0,0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-pixel text-sm text-game-primary">{cat.icon} {cat.title}</span>
              <p className={`${TEXT.labelSm} mt-2`}>{cat.description}</p>
            </motion.button>
          ))}
        </div>
        <Button href="/" variant="ghost">← BACK</Button>
      </main>
    );
  }

  // ─── VICTORY PHASE ───
  if (phase === "victory" && finalResults) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <VictoryScreen
          results={finalResults}
          onPlayAgain={() => { resetGame(); setPhase("prompt"); }}
          onBackToMenu={() => { resetGame(); setPhase("select"); }}
          speedLabel="Time (s)"
        />
      </main>
    );
  }

  if (!item) return null;

  // ─── PROMPT PHASE ───
  if (phase === "prompt") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 gap-6 max-w-2xl mx-auto">
        <div className="w-full flex justify-between items-center">
          <span className={TEXT.labelSm}>{categoryId.replace("-", " ").toUpperCase()}</span>
          <span className={TEXT.progress}>{current + 1}/{queue.length}</span>
        </div>

        <motion.div
          className={`w-full ${BOX.panel}`}
          {...MOTION.fadeUp}
        >
          <p className={TEXT.sectionHead}>⚒ YOUR GOAL</p>
          <p className="font-pixel text-xs text-white leading-relaxed">{item.goal}</p>
        </motion.div>

        <div className="w-full">
          <label htmlFor="prompt-input" className={`${TEXT.label} block mb-2`}>
            CRAFT YOUR PROMPT
          </label>
          <textarea
            id="prompt-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your prompt here... Be specific about context, objective, style, tone, audience, and format."
            className="w-full h-40 bg-game-black border-2 border-game-primary/30 p-4 font-pixel text-[10px] text-white placeholder:text-game-primary/20 focus:border-game-primary focus:outline-none resize-none transition-colors"
            autoFocus
          />
          <div className="flex justify-between mt-1">
            <span className={TEXT.hint}>{input.length} chars</span>
            <span className={TEXT.hintAccent}>COSTAR: Context · Objective · Style · Tone · Audience · Response format</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={submitPrompt} variant="primary" disabled={!input.trim()}>
            ⚒ FORGE IT
          </Button>
          <Button onClick={() => setPhase("select")} variant="ghost">BACK</Button>
        </div>
      </main>
    );
  }

  // ─── RESULT PHASE ───
  if (phase === "result" && score) {
    const response = item.responses[score.tier];

    return (
      <main className="min-h-screen flex flex-col items-center p-6 gap-6 max-w-2xl mx-auto overflow-y-auto">
        {/* Score header */}
        <AnimatePresence>
          <motion.div className="text-center" {...MOTION.springPop}>
            <p className={`font-pixel text-2xl ${TIER_COLORS[score.tier]} neon-glow`}>{TIER_LABELS[score.tier]}</p>
            <p className="font-pixel text-[10px] text-game-accent/60 mt-2">{score.total}/30 COSTAR SCORE</p>
          </motion.div>
        </AnimatePresence>

        {/* COSTAR breakdown */}
        <motion.div className="w-full grid grid-cols-3 gap-2" {...MOTION.fadeIn(0.3)}>
          {Object.entries(DIMENSION_LABELS).map(([key, label]) => {
            const val = score[key as keyof COSTARScore] as number;
            return (
              <div key={key} className={BOX.cell}>
                <p className={TEXT.labelSm}>{label}</p>
                <p className={`font-pixel text-sm mt-1 ${val >= 3 ? "text-game-primary" : val >= 1 ? "text-game-warning" : "text-game-error/60"}`}>{val}/5</p>
              </div>
            );
          })}
        </motion.div>

        {/* Simulated AI Response */}
        <motion.div className="w-full" {...MOTION.slideUp(0.5)}>
          <p className={TEXT.sectionHead}>⚡ SIMULATED AI RESPONSE</p>
          <div className={BOX.response}>
            {response}
          </div>
        </motion.div>

        {/* Master prompt reveal */}
        <motion.details className="w-full" {...MOTION.fadeIn(0.7)}>
          <summary className={`${TEXT.label} cursor-pointer hover:text-game-accent transition-colors`}>
            ★ REVEAL MASTER PROMPT
          </summary>
          <div className="mt-2 p-4 border border-game-accent/20 bg-game-dark/30 font-pixel text-[9px] text-game-accent/80 leading-relaxed">
            {item.masterPrompt}
          </div>
          {item.enrichment && (
            <div className={BOX.enrichment}>
              <p className="font-pixel text-[7px] text-game-primary/60 mb-1">💡 {item.enrichment.whyItMatters}</p>
              {item.enrichment.proTip && <p className={`${TEXT.labelSm} text-game-accent/40 mt-1`}>★ PRO TIP: {item.enrichment.proTip}</p>}
            </div>
          )}
        </motion.details>

        <Button onClick={nextItem} variant="primary">
          {current + 1 >= queue.length ? "🏆 SEE RESULTS" : "NEXT ⚒"}
        </Button>
      </main>
    );
  }

  return null;
}

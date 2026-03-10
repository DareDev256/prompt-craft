"use client";

import { Suspense, useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { VictoryScreen } from "@/components/game/VictoryScreen";
import { PromptPhase } from "@/components/game/PromptPhase";
import { ResultPhase } from "@/components/game/ResultPhase";
import { categories, items, PromptItem } from "@/data/curriculum";
import { scorePrompt, COSTARScore } from "@/lib/costar";
import { TEXT, MOTION } from "@/lib/styles";
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
  const { earnXP } = useProgress();
  const { playCorrect, playIncorrect, playCelebration } = useSoundEffects();

  const item = queue[current] as PromptItem | undefined;

  const selectCategory = useCallback((id: string) => {
    setCategoryId(id);
    const catItems = items.filter(i => i.category === id) as PromptItem[];
    setQueue(catItems.slice(0, 5));
    setCurrent(0);
    startTimeRef.current = Date.now();
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
  if (phase === "victory") {
    if (!finalResults) {
      return (
        <main className="min-h-screen flex items-center justify-center p-6">
          <p className="font-pixel text-xs text-game-primary animate-pulse-neon">TALLYING RESULTS...</p>
        </main>
      );
    }
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
      <PromptPhase
        item={item}
        categoryId={categoryId}
        current={current}
        total={queue.length}
        input={input}
        onInputChange={setInput}
        onSubmit={submitPrompt}
        onBack={() => setPhase("select")}
      />
    );
  }

  // ─── RESULT PHASE ───
  if (phase === "result" && score) {
    return (
      <ResultPhase
        item={item}
        score={score}
        isLast={current + 1 >= queue.length}
        onNext={nextItem}
      />
    );
  }

  return null;
}

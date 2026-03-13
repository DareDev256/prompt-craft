"use client";

import { Suspense, useState, useCallback, useRef } from "react";
import { VictoryScreen } from "@/components/game/VictoryScreen";
import { PromptPhase } from "@/components/game/PromptPhase";
import { ResultPhase } from "@/components/game/ResultPhase";
import { SelectPhase } from "@/components/game/SelectPhase";
import { items, PromptItem } from "@/data/curriculum";
import { scorePrompt, COSTARScore } from "@/lib/costar";
import { useProgress } from "@/hooks/useProgress";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useQuickForge } from "@/hooks/useQuickForge";
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
  useQuickForge(selectCategory);

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
    return <SelectPhase onSelect={selectCategory} />;
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

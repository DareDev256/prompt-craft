"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PromptItem } from "@/data/curriculum";
import { COSTARScore, DIMENSION_LABELS, TIER_COLORS, TIER_LABELS } from "@/lib/costar";
import { TEXT, BOX, MOTION } from "@/lib/styles";

interface ResultPhaseProps {
  item: PromptItem;
  score: COSTARScore;
  isLast: boolean;
  onNext: () => void;
}

export function ResultPhase({ item, score, isLast, onNext }: ResultPhaseProps) {
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
        <div className={BOX.response}>{response}</div>
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

      <Button onClick={onNext} variant="primary">
        {isLast ? "🏆 SEE RESULTS" : "NEXT ⚒"}
      </Button>
    </main>
  );
}

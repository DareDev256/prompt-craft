"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PromptItem } from "@/data/curriculum";
import { TEXT, BOX, MOTION } from "@/lib/styles";

interface PromptPhaseProps {
  item: PromptItem;
  categoryId: string;
  current: number;
  total: number;
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function PromptPhase({
  item,
  categoryId,
  current,
  total,
  input,
  onInputChange,
  onSubmit,
  onBack,
}: PromptPhaseProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 gap-6 max-w-2xl mx-auto">
      <div className="w-full flex justify-between items-center">
        <span className={TEXT.labelSm}>{categoryId.replace("-", " ").toUpperCase()}</span>
        <span className={TEXT.progress}>{current + 1}/{total}</span>
      </div>

      <motion.div className={`w-full ${BOX.panel}`} {...MOTION.fadeUp}>
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
          onChange={e => onInputChange(e.target.value)}
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
        <Button onClick={onSubmit} variant="primary" disabled={!input.trim()}>
          ⚒ FORGE IT
        </Button>
        <Button onClick={onBack} variant="ghost">BACK</Button>
      </div>
    </main>
  );
}

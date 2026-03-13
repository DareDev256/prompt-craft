"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/curriculum";
import { TEXT } from "@/lib/styles";

interface SelectPhaseProps {
  onSelect: (categoryId: string) => void;
}

/** Category picker — the forge where you choose your crafting discipline. */
export function SelectPhase({ onSelect }: SelectPhaseProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      <h1 className="font-pixel text-lg text-game-primary neon-glow">SELECT YOUR FORGE</h1>
      <p className={TEXT.label}>Choose a category to begin crafting</p>
      <div className="flex flex-col gap-4 w-full max-w-md">
        {categories.map(cat => (
          <motion.button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
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

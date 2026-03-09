"use client";

interface XPBarProps {
  xp: number;
  level: number;
}

export function XPBar({ xp, level }: XPBarProps) {
  const xpInLevel = xp % 100;
  // At exact level boundaries (xp=100,200,...), show full bar briefly
  // so the player sees completion before it resets on next XP gain
  const isLevelBoundary = xp > 0 && xpInLevel === 0;
  const displayXP = isLevelBoundary ? 100 : xpInLevel;
  const displayPercent = isLevelBoundary ? 100 : xpInLevel;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="font-pixel text-[10px] text-game-accent">
          LVL {level}
        </span>
        <span className="font-pixel text-[10px] text-game-accent">
          {displayXP}/100 XP
        </span>
      </div>
      <div className="h-3 bg-game-dark border border-game-primary/30">
        <div
          className="h-full bg-game-primary xp-fill"
          style={{ width: `${displayPercent}%` }}
        />
      </div>
    </div>
  );
}

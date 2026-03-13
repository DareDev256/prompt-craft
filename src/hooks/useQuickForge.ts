import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data/curriculum";

/**
 * Detects `?quick=true` in the URL and auto-selects a random category,
 * skipping the selection screen for a fast-start "Quick Forge" experience.
 *
 * Uses a ref guard to ensure the auto-select fires at most once per mount,
 * and defers the state update via `requestAnimationFrame` to satisfy
 * React's rules around setting state during effects.
 */
export function useQuickForge(selectCategory: (id: string) => void) {
  const searchParams = useSearchParams();
  const didFire = useRef(false);

  useEffect(() => {
    if (didFire.current) return;
    if (searchParams.get("quick") !== "true" || categories.length === 0) return;

    didFire.current = true;
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    requestAnimationFrame(() => selectCategory(randomCat.id));
  }, [searchParams, selectCategory]);
}

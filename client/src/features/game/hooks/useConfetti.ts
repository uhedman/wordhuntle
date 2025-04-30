import { useAppSelector } from "@/shared/hooks";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export const useConfetti = () => {
  const found = useAppSelector((state) => state.progress.found);
  const word = useAppSelector((state) => state.game.word);
  const hasCelebrated = useRef(false);

  useEffect(() => {
    if (word && found.includes(word) && !hasCelebrated.current) {
      confetti({
        particleCount: 300,
        spread: 120,
        startVelocity: 45,
        origin: { y: 0.6 },
      });
      hasCelebrated.current = true;
    }
  }, [found, word]);
};

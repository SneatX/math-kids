import { useCallback, useRef } from "react";

export function useFeedbackSounds() {
  const correctRef = useRef<HTMLAudioElement | null>(null);
  const wrongRef = useRef<HTMLAudioElement | null>(null);

  if (typeof window !== "undefined" && !correctRef.current) {
    correctRef.current = new Audio("/sounds/correct-sound-effect.mp3");
    wrongRef.current = new Audio("/sounds/wrong-sound-effect.mp3");
  }

  const playCorrect = useCallback(() => {
    correctRef.current?.play();
  }, []);

  const playWrong = useCallback(() => {
    wrongRef.current?.play();
  }, []);

  return { playCorrect, playWrong };
}

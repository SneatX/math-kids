"use client";
import { useRouter } from "next/navigation";

export default function AleatoryGameButton({
  gameLinks,
}: {
  gameLinks: string[];
}) {
  const router = useRouter();
  const randomIndex = Math.floor(Math.random() * gameLinks.length);
  const gameLink = gameLinks[randomIndex];

  return (
    <button
      className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-colors text-sm font-medium hover:shadow-lg cursor-pointer"
      onClick={() => router.push(gameLink)}
    >
      ¡Empezar a Jugar!
    </button>
  );
}

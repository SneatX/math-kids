"use client";

import { useEffect, useState } from "react";
import Mascot from "@/app/components/Mascot";
import Link from "next/link";
import { useFeedbackSounds } from "@/app/hooks/useFeedbackSounds";

type Emotion = "happy" | "sad" | "excited" | "thinking";
type Shape = "Circle" | "Square" | "Triangle" | "Rectangle";

const allShapes: Shape[] = ["Circle", "Square", "Triangle", "Rectangle"];

export default function ShapesGamePage() {
  const { playCorrect, playWrong } = useFeedbackSounds();
  const [currentShape, setCurrentShape] = useState<Shape>("Circle");
  const [answerOptions, setAnswerOptions] = useState<Shape[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Shape | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [mascotEmotion, setMascotEmotion] = useState<Emotion>("happy");
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const storedScore = parseInt(sessionStorage.getItem("score_shapes") || "0");
    const storedAttempts = parseInt(
      sessionStorage.getItem("score_attempts_shapes") || "0"
    );
    setScore(storedScore);
    setAttempts(storedAttempts);

    generateRound();
  }, []);

  function generateRound() {
    const idx = Math.floor(Math.random() * allShapes.length);
    const shape = allShapes[idx];
    setCurrentShape(shape);

    const opts = new Set<Shape>([shape]);
    while (opts.size < 4) {
      opts.add(allShapes[Math.floor(Math.random() * allShapes.length)]);
    }
    setAnswerOptions(Array.from(opts).sort(() => Math.random() - 0.5));

    setSelectedAnswer(null);
    setIsCorrect(null);
    setMascotEmotion("thinking");
  }

  function checkAnswer(answer: Shape) {
    const correct = answer === currentShape;
    setIsCorrect(correct);
    setSelectedAnswer(answer);

    let newScore = score;
    let newStreak = streak;
    if (correct) {
      playCorrect();
      newScore += 1;
      newStreak += 1;
      sessionStorage.setItem("score_shapes", newScore.toString());
    } else {
      playWrong();
      newStreak = 0;
    }

    const newAttempts = attempts + 1;
    sessionStorage.setItem("score_attempts_shapes", newAttempts.toString());

    setScore(newScore);
    setStreak(newStreak);
    setAttempts(newAttempts);
    setMascotEmotion(correct ? (newStreak >= 3 ? "excited" : "happy") : "sad");

    setTimeout(generateRound, 1500);
  }

  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-4xl">
        {/* Header */}
        <article className="bg-white rounded-2xl p-6 mb-8 shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <Mascot emotion={mascotEmotion} size="medium" />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-indigo-700">
                ¿Qué figura es?
              </h2>
              <p className="text-gray-600">
                {isCorrect === true && "¡Muy bien! ¡Sigue así!"}
                {isCorrect === false && "¡Inténtalo de nuevo! ¡Tú puedes!"}
                {isCorrect === null && "¿Cómo se llama esta figura?"}
              </p>
            </div>
          </div>
          <div className="bg-indigo-100 px-4 py-2 rounded-full space-x-4">
            <span className="font-bold text-indigo-700">Puntos: {score}</span>
            <span className="font-bold text-indigo-700">
              Intentos: {attempts}
            </span>
          </div>
        </article>

        {/* Muestra de la figura */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 flex justify-center">
          {currentShape === "Circle" && (
            <div className="w-32 h-32 bg-blue-400 rounded-full" />
          )}
          {currentShape === "Square" && (
            <div className="w-32 h-32 bg-green-400" />
          )}
          {currentShape === "Triangle" && (
            <div
              className="w-0 h-0 border-l-16 border-r-16 border-b-32 border-transparent border-b-red-400"
              style={{
                borderLeftWidth: 64,
                borderRightWidth: 64,
                borderBottomWidth: 128,
              }}
            />
          )}
          {currentShape === "Rectangle" && (
            <div className="w-48 h-24 bg-yellow-400" />
          )}
        </div>

        {/* Opciones de respuesta */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {answerOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => checkAnswer(opt)}
              disabled={selectedAnswer !== null}
              className={`p-6 rounded-xl text-xl font-bold transition-all transform hover:scale-105 ${
                selectedAnswer === opt
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Navegación */}
        <div className="flex justify-between">
          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full transition-colors"
          >
            Volver al Inicio
          </Link>
          <button
            onClick={generateRound}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full transition-colors"
          >
            Nueva Figura
          </button>
        </div>
      </section>
    </main>
  );
}

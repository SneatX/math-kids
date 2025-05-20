"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Mascot from "@/app/components/Mascot";
import Link from "next/link";
import { useFeedbackSounds } from "@/app/hooks/useFeedbackSounds";

type Emotion = "happy" | "sad" | "excited" | "thinking";

export default function TwoNumbersPage() {
  const { operation } = useParams();
  const { playCorrect, playWrong } = useFeedbackSounds();

  // 1) Estados inicializados sin sessionStorage
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const [mascotEmotion, setMascotEmotion] = useState<Emotion>("happy");
  const [streak, setStreak] = useState(0);

  // <-- aquí quitamos la lectura directa de sessionStorage
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const [answerOptions, setAnswerOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // 2) En efecto, leer de sessionStorage SOLO en cliente
  useEffect(() => {
    if (typeof window === "undefined") return;

    const keyScore = sessionStorage.getItem(`score_${operation}`) || "0";
    const keyAttempts =
      sessionStorage.getItem(`score_attempts_${operation}`) || "0";

    setScore(parseInt(keyScore, 10));
    setAttempts(parseInt(keyAttempts, 10));

    generateProblem();
  }, [operation]);

  // Generación de problemas
  function generateProblem() {
    let a = 0,
      b = 0,
      ans = 0;
    if (operation === "addition") {
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      ans = a + b;
    } else if (operation === "subtraction") {
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      if (a < b) [a, b] = [b, a];
      ans = a - b;
    }
    setNum1(a);
    setNum2(b);
    setCorrectAnswer(ans);

    // opciones de respuesta
    const opts = new Set<number>([ans]);
    while (opts.size < 4) {
      let offset = Math.floor(Math.random() * 7) - 3;
      if (offset === 0) offset = 1;
      const w = ans + offset;
      if (w > 0) opts.add(w);
    }
    setAnswerOptions(Array.from(opts).sort(() => Math.random() - 0.5));

    // reset estados
    setSelectedAnswer(null);
    setIsCorrect(null);
    setMascotEmotion("thinking");
  }

  // Comprueba la respuesta
  function checkAnswer(answer: number) {
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    setSelectedAnswer(answer);

    // sonido y puntuación
    if (correct) {
      playCorrect();
      const newScore = score + 1;
      setScore(newScore);
      sessionStorage.setItem(`score_${operation}`, newScore.toString());

      const newStreak = streak + 1;
      setStreak(newStreak);
      setMascotEmotion(newStreak >= 2 ? "excited" : "happy");
    } else {
      playWrong();
      setStreak(0);
      setMascotEmotion("sad");
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    sessionStorage.setItem(
      `score_attempts_${operation}`,
      newAttempts.toString()
    );

    setTimeout(generateProblem, 1500);
  }

  const getSymbol = operation === "addition" ? "+" : "-";
  const title =
    operation === "addition" ? "Sumas Divertidas" : "Restas Mágicas";

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <Mascot emotion={mascotEmotion} size="medium" />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-indigo-700">{title}</h2>
              <p className="text-gray-600">
                {isCorrect === true && "¡Muy bien! ¡Sigue así!"}
                {isCorrect === false && "¡Inténtalo de nuevo! ¡Tú puedes!"}
                {isCorrect === null && "¿Cuál es la respuesta correcta?"}
              </p>
            </div>
          </div>
          <div className="bg-indigo-100 px-4 py-2 rounded-full space-x-4">
            <span className="font-bold text-indigo-700">Puntos: {score}</span>
            <span className="font-bold text-indigo-700">
              Intentos: {attempts}
            </span>
          </div>
        </div>

        {/* Problema */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex justify-center items-center mb-8 text-6xl font-bold">
            <span className="bg-blue-100 text-blue-700 rounded-lg p-4 w-24 h-24 flex justify-center items-center">
              {num1}
            </span>
            <span className="mx-4 text-gray-700">{getSymbol}</span>
            <span className="bg-green-100 text-green-700 rounded-lg p-4 w-24 h-24 flex justify-center items-center">
              {num2}
            </span>
            <span className="mx-4 text-gray-700">=</span>
            <span className="bg-purple-100 text-purple-700 rounded-lg p-4 w-24 h-24 flex justify-center items-center">
              ?
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {answerOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => checkAnswer(opt)}
                disabled={selectedAnswer !== null}
                className={`p-6 rounded-xl text-2xl font-bold transition transform hover:scale-105 ${
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
        </div>

        {/* Navegación */}
        <div className="flex justify-between">
          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full"
          >
            Volver al Inicio
          </Link>
          <button
            onClick={generateProblem}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full"
          >
            Nuevo Problema
          </button>
        </div>
      </div>
    </div>
  );
}

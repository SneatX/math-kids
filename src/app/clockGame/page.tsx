"use client";

import { useEffect, useState } from "react";
import Mascot from "@/app/components/Mascot";
import Link from "next/link";

type Emotion = "happy" | "sad" | "excited" | "thinking";

export default function ClockGamePage() {
  const [hour, setHour] = useState<number>(12);
  const [minute, setMinute] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [emotion, setEmotion] = useState<Emotion>("happy");
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(
    parseInt(sessionStorage.getItem("score_clock") || "0")
  );
  const [attempts, setAttempts] = useState(
    parseInt(sessionStorage.getItem("score_attempts_clock") || "0")
  );

  // Inicializa desde sessionStorage
  function initFromStorage() {
    setScore(parseInt(sessionStorage.getItem("score_clock") || "0"));
    setAttempts(
      parseInt(sessionStorage.getItem("score_attempts_clock") || "0")
    );
  }

  // Genera una nueva ronda
  function generateRound() {
    // Hora aleatoria 1–12
    const h = Math.floor(Math.random() * 12) + 1;
    // Minuto aleatorio múltiplo de 5: 0,5,...,55
    const m = Math.floor(Math.random() * 12) * 5;
    setHour(h);
    setMinute(m);

    // Formatea "H:MM"
    const correct = `${h}:${m.toString().padStart(2, "0")}`;

    // Genera distractores
    const opts = new Set<string>([correct]);
    while (opts.size < 4) {
      const hh = Math.floor(Math.random() * 12) + 1;
      const mm = Math.floor(Math.random() * 12) * 5;
      const s = `${hh}:${mm.toString().padStart(2, "0")}`;
      opts.add(s);
    }

    // Baraja opciones
    setOptions(Array.from(opts).sort(() => Math.random() - 0.5));

    // Reset estado
    setSelected(null);
    setIsCorrect(null);
    setEmotion("thinking");
  }

  // Comprueba la respuesta
  function checkAnswer(answer: string) {
    const correct = answer === `${hour}:${minute.toString().padStart(2, "0")}`;
    setIsCorrect(correct);
    setSelected(answer);

    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      sessionStorage.setItem("score_clock", newScore.toString());

      const newStreak = streak + 1;
      setStreak(newStreak);
      setEmotion(newStreak >= 3 ? "excited" : "happy");
    } else {
      setStreak(0);
      setEmotion("sad");
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    sessionStorage.setItem("score_attempts_clock", newAttempts.toString());

    setTimeout(() => {
      generateRound();
    }, 1500);
  }

  useEffect(() => {
    initFromStorage();
    generateRound();
  }, []);

  // Cálculo de ángulos
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const minuteAngle = minute * 6;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <Mascot emotion={emotion} size="medium" />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-indigo-700">
                La Hora del Reloj
              </h2>
              <p className="text-gray-600">
                {isCorrect === true && "¡Muy bien! ¡Sigue así!"}
                {isCorrect === false && "¡Inténtalo de nuevo! ¡Tú puedes!"}
                {isCorrect === null && "¿Qué hora es?"}
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

        {/* Reloj analógico */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 flex justify-center">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Esfera */}
            <circle
              cx="100"
              cy="100"
              r="95"
              stroke="black"
              strokeWidth="4"
              fill="white"
            />
            {/* Manecilla de hora */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="60"
              stroke="black"
              strokeWidth="4"
              transform={`rotate(${hourAngle} 100 100)`}
            />
            {/* Manecilla de minutos */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="40"
              stroke="black"
              strokeWidth="2"
              transform={`rotate(${minuteAngle} 100 100)`}
            />
            {/* Centro */}
            <circle cx="100" cy="100" r="4" fill="black" />
          </svg>
        </div>

        {/* Opciones digitales */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => checkAnswer(opt)}
              disabled={selected !== null}
              className={`p-6 rounded-xl text-2xl font-bold transition-all transform hover:scale-105
                ${
                  selected === opt
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
            Nueva Hora
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Mascot from "@/app/components/Mascot";
import Link from "next/link";

function TwoNumbersPage() {
  const { operation } = useParams();

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const [mascotEmotion, setMascotEmotion] = useState<
    "happy" | "sad" | "excited" | "thinking"
  >("happy");
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(
    parseInt(sessionStorage.getItem(`score_${operation}`) || "0")
  );
  const [attempts, setAttempts] = useState(
    parseInt(sessionStorage.getItem(`score_attempts_${operation}`) || "0")
  );
  const [answerOptions, setAnswerOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  function setScoreFromsessionStorage() {
    const key = `score_${operation}`;
    const oldScore = parseInt(sessionStorage.getItem(key) || "0");
    setScore(oldScore);
  }

  const generateAnswers = (answer: number) => {
    const options = [answer];
    while (options.length < 4) {
      let offset = Math.floor(Math.random() * 7) - 3;
      if (offset === 0) offset = 1;

      const wrongAnswer = answer + offset;
      if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    setAnswerOptions(options.sort(() => Math.random() - 0.5));
  };

  function generateProblem() {
    let a: number, b: number;
    let correctAnswer: number;
    switch (operation) {
      case "addition":
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        correctAnswer = a + b;
        setCorrectAnswer(correctAnswer);
        break;
      case "subtraction":
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        if (a < b) [a, b] = [b, a];
        correctAnswer = a - b;
        setCorrectAnswer(correctAnswer);
        break;
      default:
        a = 0;
        b = 0;
        correctAnswer = 0;
        break;
    }
    setNum1(a);
    setNum2(b);

    generateAnswers(correctAnswer);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setMascotEmotion("thinking");
  }

  const checkAnswer = (answer: number) => {
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    setSelectedAnswer(answer);
    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      setStreak(streak + 1);
      setMascotEmotion(streak >= 2 ? "excited" : "happy");

      const operationKey = `score_${operation}`;
      sessionStorage.setItem(operationKey, newScore.toString());
    } else {
      setStreak(0);
      setMascotEmotion("sad");
    }

    setAttempts(attempts + 1);
    const attemptsKey = `score_attempts_${operation}`;
    sessionStorage.setItem(attemptsKey, (attempts + 1).toString());

    setTimeout(() => {
      generateProblem();
    }, 1500);
  };

  const getOperationSymbol = () => {
    switch (operation) {
      case "addition":
        return "+";
      case "subtraction":
        return "-";
      default:
        return "+";
    }
  };

  const getGameTitle = () => {
    switch (operation) {
      case "addition":
        return "Sumas Divertidas";
      case "subtraction":
        return "Restas Mágicas";
      default:
        return "Juego Matemático";
    }
  };

  useEffect(() => {
    generateProblem();
    setScoreFromsessionStorage();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Game Header */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <Mascot emotion={mascotEmotion} size="medium" />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-indigo-700">
                {getGameTitle()}
              </h2>
              <p className="text-gray-600">
                {isCorrect === true && "¡Muy bien! ¡Sigue así!"}
                {isCorrect === false && "¡Inténtalo de nuevo! ¡Tú puedes!"}
                {isCorrect === null && "¿Cuál es la respuesta correcta?"}
              </p>
            </div>
          </div>
          <div className="bg-indigo-100 px-4 py-2 rounded-full">
            <span className="font-bold text-indigo-700">Puntos: {score}</span>
            <span className="font-bold text-indigo-700">
              Intentos: {attempts}
            </span>
          </div>
        </div>

        {/* Math Problem */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex justify-center items-center mb-8">
            <div className="text-6xl font-bold text-center flex items-center justify-center">
              <span className="bg-blue-100 text-blue-700 rounded-lg p-4 w-24 h-24 flex items-center justify-center">
                {num1}
              </span>
              <span className="mx-4 text-gray-700">{getOperationSymbol()}</span>
              <span className="bg-green-100 text-green-700 rounded-lg p-4 w-24 h-24 flex items-center justify-center">
                {num2}
              </span>
              <span className="mx-4 text-gray-700">=</span>
              <span className="bg-purple-100 text-purple-700 rounded-lg p-4 w-24 h-24 flex items-center justify-center">
                ?
              </span>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4">
            {answerOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`
                    p-6 rounded-xl text-2xl font-bold transition-all transform hover:scale-105
                    ${
                      selectedAnswer === option
                        ? isCorrect
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                    }
                    `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full transition-colors"
          >
            Volver al Inicio
          </Link>
          <button
            onClick={generateProblem}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full transition-colors"
          >
            Nuevo Problema
          </button>
        </div>
      </div>
    </div>
  );
}

export default TwoNumbersPage;

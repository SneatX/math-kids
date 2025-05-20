import React from "react";
import Link from "next/link";
import { Minus, Triangle, Clock, Plus } from "lucide-react";
import Mascot from "./components/Mascot";
import ProgressSection from "./components/ProgressSection";

function HomePage() {
  const games = [
    {
      id: "addition",
      name: "Sumas Divertidas",
      icon: <Plus className="text-green-500" size={32} />,
      color: "bg-green-100 border-green-300",
      description: "Aprende a sumar con amigos",
      link: "/twonumbers/addition",
    },
    {
      id: "subtraction",
      name: "Restas Mágicas",
      icon: <Minus className="text-blue-500" size={32} />,
      color: "bg-blue-100 border-blue-300",
      description: "Descubre el poder de restar",
      link: "/twonumbers/subtraction",
    },
    {
      id: "figures",
      name: "Figuras Geométricas",
      icon: <Triangle className="text-yellow-500" size={32} />,
      color: "bg-yellow-100 border-yellow-300",
      description: "Conoce las figuras geométricas",
      link: "/shapesGame",
    },
    {
      id: "time",
      name: "La Hora del Reloj",
      icon: <Clock className="text-red-500" size={32} />,
      color: "bg-red-100 border-red-300",
      description: "Aprende a leer el reloj",
      link: "/timeGame",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Welcome Section with Mascot */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg flex items-center">
          <Mascot emotion="happy" size="large" />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-indigo-700">
              ¡Hola amiguito!
            </h2>
            <p className="text-gray-600">
              ¡Vamos a aprender y divertirnos juntos!
            </p>
            <button className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-colors text-sm font-medium">
              ¡Empezar a Jugar!
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-indigo-700 mb-4">
          Juegos Matemáticos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <Link
              href={game.link}
              key={game.id}
              className={`${game.color} border-2 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow`}
            >
              <div className="bg-white p-3 rounded-full mb-2">{game.icon}</div>
              <h3 className="font-bold text-gray-800">{game.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{game.description}</p>
            </Link>
          ))}
        </div>

        <ProgressSection />
      </div>
    </div>
  );
}

export default HomePage;

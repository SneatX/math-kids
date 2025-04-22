"use client";
import { useEffect, useState } from "react";

export default function ProgressSection() {
  const [progress, setProgress] = useState({
    addition: 0,
    subtraction: 0,
  });

  useEffect(() => {
    const additionScore = parseInt(
      localStorage.getItem("score_addition") || "0"
    );
    const additionAttempts = parseInt(
      localStorage.getItem("score_attempts_addition") || "0"
    );

    const subtractionScore = parseInt(
      localStorage.getItem("score_subtraction") || "0"
    );
    const subtractionAttempts = parseInt(
      localStorage.getItem("score_attempts_subtraction") || "0"
    );

    setProgress({
      addition: (additionScore / (additionAttempts || 1)) * 100, // el || 1 es para evitar dividir por 0
      subtraction: (subtractionScore / (subtractionAttempts || 1)) * 100,
    });
  }, []);

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">
        Tus Estadísticas
      </h2>
      <div className="space-y-3">
        {[
          { label: "Sumas", value: progress.addition, color: "green" },
          { label: "Restas", value: progress.subtraction, color: "indigo" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                {stat.label}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(stat.value)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`bg-${stat.color}-500 h-2.5 rounded-full`}
                style={{ width: `${stat.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

type Card = {
  id: number;
  category_id: number;
  question: string;
  answer: string;
};

export default function PlayMode({ cards }: { cards?: Card[] }) {
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  const [mode, setMode] = useState<"random" | "sequential" | null>(null);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  if (!cards || cards.length === 0) {
    return (
      <div className="max-w-lg mx-auto p-6">
        No cards available in this category.
      </div>
    );
  }

  if (!mode) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Choose Play Mode</h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setMode("sequential");
              setUsedIndices([]);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sequential
          </button>
          <button
            onClick={() => {
              const firstIndex = Math.floor(Math.random() * cards.length)
              setMode("random");
              setUsedIndices([]);
              setIndex(firstIndex);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Random
          </button>
        </div>
      </div>
    );
  }

  async function saveAttempt(
    cardId: number,
    categoryId: number,
    isCorrect: boolean
  ) {
    await fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId, categoryId, isCorrect }),
    });
  }

  const currentCard = cards[index];

  async function handleSubmit() {
    const isCorrect =
      userAnswer.trim().toLowerCase() === currentCard.answer.toLowerCase();

    const newStats = isCorrect
      ? { ...stats, correct: stats.correct + 1 }
      : { ...stats, incorrect: stats.incorrect + 1 };
    
    setStats(newStats);
    
    await saveAttempt(currentCard.id, currentCard.category_id!, isCorrect);


    setUserAnswer("");
    setResult(
      isCorrect
        ? "Correct!"
        : `WRONG. Correct answer: ${currentCard.answer}`
    );

    setTimeout(() => {
      nextCard(newStats);
    }, 800);
  }

  function nextCard(newStats: { correct: number; incorrect: number }) {
    if (mode === "sequential") {
      if (index < cards.length - 1) {
        setIndex(index + 1);
        setResult("");
      } else {
        endGame(newStats);
      }
    } else {
      // random
      const updatedUsedCard = usedIndices.includes(index)
        ? usedIndices
        : [...usedIndices, index];
      
      const available = cards
        .map((_, i) => i)
        .filter((i) => !updatedUsedCard.includes(i));

      if (available.length === 0) {
        endGame(newStats);
        return;
      }

      const nextIndex = available[Math.floor(Math.random() * available.length)];
      setUsedIndices(updatedUsedCard);
      setIndex(nextIndex);
      setResult("");
    }
  }

  function endGame(finalStats: { correct: number; incorrect: number }) {
    setTimeout(() => {
      alert(
        `GAME OVER! Correct: ${finalStats.correct}, Incorrect: ${finalStats.incorrect}`
      );
      restartGame();
    }, 200);
  }

  function restartGame() {
    setMode(null);
    setIndex(0);
    setStats({ correct: 0, incorrect: 0 });
    setResult("");
    setUserAnswer("");
    setUsedIndices([]);
  }

  

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Play Mode ({mode})</h1>

      <p className="text-xl font-semibold mb-2">
        Question {mode === "sequential" ? index + 1 : usedIndices.length + 1}/
        {cards.length}
      </p>
      <p className="mb-4">{currentCard.question}</p>

      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Type your answer"
      />

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      <p className="mt-4">{result}</p>

      <div className="mt-6 text-sm text-gray-600">
        Correct: {stats.correct} | Incorrect: {stats.incorrect}
      </div>
    </div>
  );
}

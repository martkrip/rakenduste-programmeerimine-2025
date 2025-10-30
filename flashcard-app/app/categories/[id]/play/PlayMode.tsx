"use client"

import { useState } from "react";

type Card = {
    id: number
    question: string;
    answer: string;
};

export default function PlayMode({ cards }: { cards?: Card[] }) {
    const [index, setIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [result, setResult] = useState("");
    const [stats, setStats] = useState({ correct: 0, incorrect: 0 });

        if (!cards || cards.length === 0) {
          return (
            <div className="max-w-lg mx-auto p-6">
              No cards available in this category.
            </div>
          );
        }

    const currentCard = cards[index];

    function handleSubmit() {
        if (userAnswer.trim().toLowerCase() === currentCard.answer.toLowerCase()) {
            setResult("Correct!");
            setStats({ ...stats, correct: stats.correct + 1 });
        } else {
            setResult(`WRONG. Correct answer is ${currentCard.answer}`);
            setStats({ ...stats, incorrect: stats.incorrect + 1 });
        }
        setUserAnswer("")
    }

    function nextCard() {
        if (index < cards.length - 1) {
            setIndex(index + 1);
            setResult("");
        } else {
            alert(
              `GAME OVER! Correct: ${stats.correct}, Incorrect: ${stats.incorrect}`
            );
        }
    }

    return (
        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Play Mode</h1>

            <p className="text-xl font-semibold mb-2">
                Question {index + 1}/{cards.length}
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
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
                <button onClick={nextCard} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Next
                </button>
            </div>
            
            <p className="mt-4">{result}</p>

            <div className="mt-6 text-sm text-gray-600">
                Correct: {stats.correct} | Incorrect: {stats.incorrect}
            </div>
        </div>
    )
}
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
export default function UpdateCard({
  cardId,
    currentQuestion,
  currentAnswer
}: {
  cardId: number;
        currentQuestion: string;
        currentAnswer: string;
}) {
  const supabase = createClient();
    const [updatedQuestion, setUpdatedQuestion] = useState(currentQuestion);
      const [updatedAnswer, setUpdatedAnswer] = useState(currentAnswer);
  const [isEditing, setIsEditing] = useState(false);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!updatedQuestion.trim() || !updatedAnswer.trim()) return;

    const { error } = await supabase
      .from("cards")
      .update({ question: updatedQuestion, answer: updatedAnswer })
      .eq("id", cardId);

    if (error) console.error("Error updating card:", error);
    else location.reload();
  }

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="bg-violet-500 hover:bg-violet-600 text-white px-3 py-1 rounded"
      >
        Edit
      </button>
    );
  }

  return (
    <form onSubmit={handleUpdate} className="flex gap-2">
      <input
        type="text"
        value={updatedQuestion}
        onChange={(e) => setUpdatedQuestion(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
      />
      <input
        type="text"
        value={updatedAnswer}
        onChange={(e) => setUpdatedAnswer(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
      >
        Save
      </button>
      <button
        type="button"
        onClick={() => setIsEditing(false)}
        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
      >
        Cancel
      </button>
    </form>
  );
}

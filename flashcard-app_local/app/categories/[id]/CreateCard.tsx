"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CreateCard({ categoryId }: {categoryId: number}) {
  const supabase = createClient();
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    if (!newAnswer.trim()) return;
        const categoryIdNum = Number(categoryId);
        if (isNaN(categoryIdNum)) {
          console.error("Invalid categoryId:", categoryId);
          return;
        }
    const { error } = await supabase.from("cards").insert({ question: newQuestion, answer: newAnswer, category_id: categoryIdNum });
    if (error) console.error("Error adding card:", JSON.stringify(error, null, 2));
    else { 
      setNewQuestion("");
      setNewAnswer("")
      location.reload();
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="Write a new question"
        className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
        placeholder="Write a new answer"
        className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Add
      </button>
    </form>
  );
}

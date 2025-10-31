"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CreateCategory() {
  const supabase = createClient();
  const [newCategory, setNewCategory] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategory.trim()) return;

    const { error } = await supabase.from("categories").insert({ name: newCategory });
    if (error) console.error("Error adding category:", error);
    else { 
      setNewCategory("");
      location.reload();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Write a new category..."
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

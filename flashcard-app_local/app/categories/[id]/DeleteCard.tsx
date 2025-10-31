"use client";

import { createClient } from "@/lib/supabase/client";

export default function DeleteCard({ cardId }: { cardId: number }) {
  const supabase = createClient();

  async function handleDelete() {
    const { error } = await supabase.from("cards").delete().eq("id", cardId);
    if (error) console.error("Error deleting card:", error);
    else location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  );
}

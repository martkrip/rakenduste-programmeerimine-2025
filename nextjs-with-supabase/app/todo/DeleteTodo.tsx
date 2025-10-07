"use client";

import { createClient } from "@/lib/supabase/client";

export default function DeleteTodo({ todoId }: { todoId: number }) {
  const supabase = createClient();

  async function handleDelete() {
    const { error } = await supabase.from("todos").delete().eq("id", todoId);
    if (error) console.error("Error deleting task:", error);
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

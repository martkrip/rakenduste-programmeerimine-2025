"use client";

import { deleteRecipe } from "./actions";

export default function DeleteRecipe({ recipeId }: { recipeId: number }) {

  async function handleDelete() {
    await deleteRecipe(recipeId);
    location.reload();
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

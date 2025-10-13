"use client"

import DeleteRecipe from "./DeleteRecipe";
import UpdateRecipe from "./UpdateRecipe";

type Recipe = {
    id: number
    content: string
};

export default function RecipesList({ recipes }: { recipes: Recipe[] }) {
      return (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
          <div className="space-y-4 mt-6">
            {recipes && recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex justify-between items-center bg-white rounded-lg shadow p-4"
                >
                  <span className="text-gray-800">{recipe.content}</span>
                  <UpdateRecipe recipeId={recipe.id} currentRecipe={recipe.content} />
                  <DeleteRecipe recipeId={recipe.id} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No recipes yet to cook.</p>
            )}
          </div>
        </div>
      );
    }
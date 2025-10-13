"use server";

import { createAdminClient } from "@/lib/supabase/server";


export async function createRecipe(formData: FormData) {
    const supabase = await createAdminClient();
    const content = formData.get("content") as string;

    if (!content.trim()) return;

    const { error } = await supabase.from("recipes").insert({ content });
    if (error) console.error("Error adding recipe:", error)
}

export async function deleteRecipe(recipeId: number) {
    const supabase = await createAdminClient();
    const { error } = await supabase.from("recipes").delete().eq("id", recipeId);
    if (error) console.error("Error deleting recipe:", error)
}

export async function updateRecipe(recipeId: number, updatedRecipe: string) {
    const supabase = await createAdminClient();
    const { error } = await supabase
        .from("recipes")
        .update({ content: updatedRecipe })
        .eq("id", recipeId);
    
    
    if (error) console.error("Error updating recipe:", error);
}


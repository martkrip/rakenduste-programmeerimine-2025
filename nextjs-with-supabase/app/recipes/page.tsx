import { createAdminClient } from "@/lib/supabase/server";
import CreateRecipe from "./CreateRecipe";
import RecipesList from "./RecipesList";

export default async function Page() {

  const supabase = await createAdminClient();
  const { data: recipes } = await supabase
    .from("recipes")
    .select("*")
    .order("id", { ascending: true });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <CreateRecipe />
      <RecipesList recipes={recipes || []} />
    </div>
  )
}
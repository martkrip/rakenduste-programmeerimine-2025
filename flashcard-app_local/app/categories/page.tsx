import { createAdminClient } from "@/lib/supabase/server";
import CategoriesList from "./CategoriesList";

export default async function Page() {
  type Category = {
    id: number;
    name: string;
  };
  const supabase = await createAdminClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });
  const categories: Category[] = data || [];

  return <CategoriesList categories={categories} />;
}

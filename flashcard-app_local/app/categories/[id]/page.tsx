import { createAdminClient } from "@/lib/supabase/server";
import CardsList from "./CardsList";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  
  if (!id || isNaN(Number(id))) {
    return <div>Invalid category ID</div>;
  }

  const categoryId = Number(id)

  type Card = {
    id: number,
    question: string;
    answer: string;
    category_id: number;
  }
  const supabase = await createAdminClient();
  const { data } = await supabase
    .from("cards")
    .select("*")
    .eq("category_id", categoryId)
    .order("id", { ascending: true }) as { data: Card[] | null};

  const cards = data || [];
  return (
  <div>
  <h1 className="text-2xl font-bold mb-4">Cards in category {categoryId}</h1>
  <CardsList cards={cards} categoryId={categoryId} />
  </div>
  )
}

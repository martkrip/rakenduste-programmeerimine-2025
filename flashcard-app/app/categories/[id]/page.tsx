import { createAdminClient } from "@/lib/supabase/server";
import CardsList from "./CardsList";

export default async function Page({ params }: { params: { id: string } }) {
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
    .eq("category_id", params.id)
    .order("id", { ascending: true }) as { data: Card[] | null};

  const cards = data || [];
  return (
  <div>
  <h1 className="text-2xl font-bold mb-4">Cards in category {params.id}</h1>
  <CardsList cards={cards} categoryId={Number(params.id)} />
  </div>
  )
}

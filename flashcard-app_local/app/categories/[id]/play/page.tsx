import PlayMode from "./PlayMode";
import { createAdminClient } from "@/lib/supabase/server";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const categoryId = Number(id)
    if (isNaN(categoryId)) {
        return <div>Invalid category ID</div>;
    }

    const supabase = await createAdminClient();
    const { data } = await supabase.from("cards").select("*").eq("category_id", categoryId)
    const cards = data || [];

    return <PlayMode cards={cards} />;
} 
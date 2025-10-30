import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cardId, categoryId, isCorrect } = body;

    const supabase = await createAdminClient();

    const { error } = await supabase.from("stats").insert([
      {
        card_id: cardId,
        category_id: categoryId,
        correct: isCorrect ? 1 : 0,
        incorrect: isCorrect ? 0 : 1,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}

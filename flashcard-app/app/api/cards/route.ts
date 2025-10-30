import { createAdminClient } from "@/lib/supabase/server";
import type { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
    const supabase = await createAdminClient();
    const categoryId = request.nextUrl.searchParams.get("category_id")
  let query = supabase
    .from("cards")
    .select("*")
        .order("id", { ascending: true });
    if (categoryId) query = query.eq("category_id", Number(categoryId));

    const { data, error } = await query
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createAdminClient();
  const { question, answer, category_id } = await request.json();
  const { data, error } = await supabase
    .from("cards")
    .insert({ question, answer, category_id })
    .select();
  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  return new Response(JSON.stringify(data[0]), { status: 201 });
}

// PUT (update) card by id ?id=1
export async function PUT(request: NextRequest) {
  const supabase = await createAdminClient();
  const id = Number(request.nextUrl.searchParams.get("id"));
  const { question, answer } = await request.json();
  const { data, error } = await supabase
    .from("cards")
    .update({ question, answer })
    .eq("id", id)
    .select();
  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  return new Response(JSON.stringify(data[0]), { status: 200 });
}

// DELETE card by id ?id=1
export async function DELETE(request: NextRequest) {
  const supabase = await createAdminClient();
  const id = Number(request.nextUrl.searchParams.get("id"));
  const { data, error } = await supabase
    .from("cards")
    .delete()
    .eq("id", id)
    .select();
  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  return new Response(JSON.stringify(data[0]), { status: 200 });
}

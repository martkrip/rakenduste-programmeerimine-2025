import { createAdminClient } from "@/lib/supabase/server"
import type { NextRequest } from "next/server"
export async function GET() {
    const supabase = await createAdminClient()
    const { data, error } = await supabase.from("recipes").select("*").order("id", { ascending: true })
    if (error) {
        console.log(data, error);
        return new Response(JSON.stringify({ error: error.message }),
            { status: 500 })
    }
    return new Response(JSON.stringify(data),
        { status: 200, headers: { "Content-Type": "application/json" }, })
}

export async function POST(request: NextRequest) {
  const supabase = await createAdminClient();
  const { content } = await request.json();
  const { data, error } = await supabase
    .from("recipes")
    .insert({ content })
    .select();
  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  return new Response(JSON.stringify(data[0]), { status: 201 });
}

export async function PUT(request: NextRequest) {
  const supabase = await createAdminClient();
  const id = Number(request.nextUrl.searchParams.get("id"));
  const { content } = await request.json();
  const { data, error } = await supabase
    .from("recipes")
    .update({ content })
    .eq("id", id)
    .select();
  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  return new Response(JSON.stringify(data[0]), { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createAdminClient();
  const id = Number(request.nextUrl.searchParams.get("id"));
  const { data, error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", id)
    .select();
  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  return new Response(JSON.stringify(data[0]), { status: 200 });
}
import { createClient } from "@/lib/supabase/server"
export async function GET() {
    const supabase = await createClient()
    const { data, error } = await supabase.from("notes").select("*").order("id", { ascending: true })
    if (error) {
        return new Response(JSON.stringify({ error: error.message }),
            { status: 500 })
    }
    return new Response(JSON.stringify(data),
        { status: 200, headers: { "Content-Type": "application/json" }, })
}
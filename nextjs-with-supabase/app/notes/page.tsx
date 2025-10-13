import { createAdminClient } from "@/lib/supabase/server";
import NotesList from "./NotesList";

export default async function Page() {
  type Note = {
    id: number;
    content: string
  }
  const supabase = await createAdminClient();
  const { data } = await supabase
    .from("notes")
    .select("*")
    .order("id", { ascending: true });
  const notes: Note[] = data || [];

  return <NotesList notes={notes} />;
}
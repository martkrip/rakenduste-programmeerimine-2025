import { createAdminClient } from "@/lib/supabase/server";
import CreateNote from "./CreateNote";
import DeleteNote from "./DeleteNote";
import UpdateNote from "./UpdateNote";
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
  const notes: Note[] = data || []
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="'text-2xl font-bold mb-4">Notes</h1>

      <CreateNote />

      <div className="space-y-4 mt-6">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="flex justify-between items-center bg-white rounded-lg shadow p-4"
            >
              <span className="text-gray-800">{note.content}</span>
              <DeleteNote noteId={note.id} />
              <UpdateNote noteId={note.id} currentContent={note.content} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No notes yet.</p>
        )}
      </div>
    </div>
  );
}

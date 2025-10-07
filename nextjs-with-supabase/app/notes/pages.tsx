import { createClient } from "@/lib/supabase/server";
import CreateNote from "./CreateNote";
import DeleteNote from "./DeleteNote";
export default async function Page() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select("*").order("id", { ascending: true });
return (
  <div className="max-w-3x1 mx-auto p-6">
    <h1 className="'text-2x1 font-bold mb-4">Notes</h1>

    <CreateNote />

    <div className="space-y-4 mt-6">
      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <div
          key={note.id}
          className="flex justify-between items-center bg-white rounded-lg shadow p-4">
            <span className="text-gray-800">{note.content}</span>
            <DeleteNote noteId={note.id} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No notes yet.</p>
      )}
      </div>
    </div>
);
}

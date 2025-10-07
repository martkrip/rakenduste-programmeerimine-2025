import { createClient } from "@/lib/supabase/server";
import NoteItem from "./NoteItem";
export default async function Page() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();
return (
  <div className="max-w-3x1 mx-auto p-6">
    <h1 className="'text-2x1 font-bold mb-4">Notes</h1>

    <div className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New note..."
          className="flex-1 border rounded-1g px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-1g">
        Add
        </button>
      </div>
    </div>
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
      </div>
  </div>
)
}

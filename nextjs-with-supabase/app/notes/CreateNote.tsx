"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/server";

export default function CreateNote() {
    const supabase = createClient();
    const [newNote, setNewNote] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!newNote.trim()) return;

        const { error } = await supabase.from("notes").insert({ content: newNote});
        if (error) console.error("Error adding note:", error);
        else {
            setNewNote("")
            location.reload()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write a new note..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Add
                    </button>
        </form>
    )
}
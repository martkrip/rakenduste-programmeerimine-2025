"use client"

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
export default function UpdateTodo({
    todoId,
    currentTask,
}: {
    todoId: number;
    currentTask: string
}) {
    const supabase = createClient()
    const [updatedTask, setUpdatedTask] = useState(currentTask);
    const [isEditing, setIsEditing] = useState(false);

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (!updatedTask.trim()) return;

        const { error } = await supabase.from("notes").update({ content: updatedTask }).eq("id", todoId)
        
        if (error) console.error("Error updating note:", error);
        else location.reload();
    }

    if (!isEditing) {
        return (
            <button
                onClick={() => setIsEditing(true)}
                className="bg-violet-500 hover:bg-violet-600 text-white px-3 py-1 rounded"
            >
                Edit
            </button>
        )
    }

    return (
        <form onSubmit={handleUpdate} className="flex gap-2">
            <input
                type="text"
                value={updatedTask}
                onChange={(e) => setUpdatedTask(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
            />
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
                Save
            </button>
            <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
            >
                Cancel
            </button>
        </form>
    )
}
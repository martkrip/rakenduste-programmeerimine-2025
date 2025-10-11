"use server";

import { createClient } from "@/lib/supabase/server";

export async function createTodo(formData: FormData) {
    const supabase = await createClient();
    const task = formData.get("task") as string;

    if (!task.trim()) return;

    const { error } = await supabase.from("todos").insert({ task });
    if (error) console.error("Error adding task:", error)
}

export async function deleteTodo(todoId: number) {
    const supabase = await createClient();
    const { error } = await supabase.from("todos").delete().eq("id", todoId);
    if (error) console.error("Error deleting task:", error)
}

export async function updateTodo(todoId: number, updatedTask: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("todos")
        .update({ task: updatedTask })
        .eq("id", todoId);
    
    
    if (error) console.error("Error updating task:", error);
}


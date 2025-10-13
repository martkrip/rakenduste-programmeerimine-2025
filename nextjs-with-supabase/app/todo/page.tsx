import { createAdminClient } from "@/lib/supabase/server";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

export default async function Page() {

  const supabase = await createAdminClient();
  const { data: todos } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: true });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <CreateTodo />
      <TodoList todos={todos || []} />
    </div>
  )
}
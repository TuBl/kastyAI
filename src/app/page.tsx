import TodoList from "@/components/TodoList";
import { serverClient } from "./_trpc/serverClient";
export default async function Page() {
  const todos = await serverClient.todo.getTodos();
  return <TodoList initialTodos={todos} />;
}

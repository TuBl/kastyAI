"use client";

import { trpc } from "@/app/_trpc/client";
import serverClient from "@/app/_trpc/serverClient";
import { useState } from "react";

export default function TodoList({
  initialTodos,
}: {
  initialTodos: Awaited<ReturnType<(typeof serverClient.todo)["getTodos"]>>;
}) {
  const getTodos = trpc.todo.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const addTodo = trpc.todo.addTodo.useMutation({
    onSettled: () => getTodos.refetch(),
  });
  const toggleTodo = trpc.todo.toggleTodo.useMutation({
    onSettled: () => getTodos.refetch(),
  });
  const [content, setContent] = useState("");

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <form
        className="flex gap-2 mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (content.length) {
            addTodo.mutate(content);
            setContent("");
          }
        }}
      >
        <input
          type="text"
          id="content"
          className="flex-1 px-3 py-2 border rounded text-black"
          placeholder="Add a new todo..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {getTodos.data && getTodos.data.length > 0 ? (
          getTodos.data.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between px-3 py-2 rounded border ${
                todo.done ? "bg-green-50" : "bg-gray-50"
              }`}
            >
              <label className="flex items-center gap-2 cursor-pointer w-full">
                <input
                  type="checkbox"
                  checked={!!todo.done}
                  onChange={() =>
                    toggleTodo.mutate({ id: todo.id, done: !todo.done })
                  }
                  className="accent-blue-600 h-5 w-5"
                />
                <span
                  className={`flex-1 ${
                    todo.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.content}
                </span>
              </label>
            </li>
          ))
        ) : (
          <li className="text-gray-400 text-center">No todos yet.</li>
        )}
      </ul>
    </div>
  );
}

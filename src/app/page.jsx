"use client";

import { use, useEffect, useState } from "react";
import TodoList from "./_components/TodoList";
import { fetchTodos } from "../api/todos.js";
import { useQuery } from "@tanstack/react-query";
import TodoForm from "./_components/TodoForm";

export default function Home() {
  // const [todos, setTodos] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const loadTodos = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     const todos = await fetchTodos();
  //     setTodos(todos);
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">투두리스트</h1>
      <div className="max-w-md mx-auto mt-8">
        <TodoForm />
        {/* <TodoForm loadTodos={loadTodos} /> */}
        <h2 className="text-2xl font-bold mb-4">할 일 목록</h2>

        <TodoList />
      </div>
    </div>
  );
}

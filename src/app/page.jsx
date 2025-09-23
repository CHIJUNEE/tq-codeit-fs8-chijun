"use client";

import { use, useEffect, useState } from "react";
import TodoList from "./_components/TodoList";
import { fetchTodos } from "../api/todos.js";
const initialTodos = [
  {
    id: 1,
    title: "할 일 1",
    completed: false,
  },
  {
    id: 2,
    title: "할 일 2",
    completed: true,
  },
  {
    id: 3,
    title: "할 일 3",
    completed: false,
  },
];

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadTodos = async () => {
    // TODO: 할 일 목록을 가져오는 로직 추가
    // - initialTodos 제거하고 초기값 빈 배열 [] 적용
    // - useEffect 콜백 함수 내에서 사용
    // - fetchTodos 함수 호출
    try {
      setIsLoading(true);
      setError(null);
      const todos = await fetchTodos();
      setTodos(todos);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">로딩 중...</div>
    );
  } else if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">투두리스트</h1>
      <div className="max-w-md mx-auto mt-8">
        {/* <TodoForm loadTodos={loadTodos} /> */}
        <h2 className="text-2xl font-bold mb-4">할 일 목록</h2>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import TodoItem from "@/app/_components/TodoItem";
import { fetchTodos } from "@/api/todos";
import { useQuery } from "@tanstack/react-query";

export default function TodoList() {
  const {
    data: todos,
    isPending: isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    enabled: false,
    select: function (testobject) {
      return testobject.filter((t) => t.completed);
    },
    // staleTime: 5000,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <button
          className="bg-blue-400 text-white px-4 py-2 rounded-md"
          onClick={refetch}
        >
          버튼
        </button>
        로딩 중...
      </div>
    );
  } else if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }
  return (
    <div className="border">
      {todos.length === 0 ? (
        <div className="p-4 text-center">할 일이 없습니다.</div>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
}

"use client";

import { addTodo } from "@/api/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState("");

  const todoAdd = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => {
      alert("할 일을 추가하는데 실패했습니다.", err);
    },
  });
  const queryClient = useQueryClient();
  const handleAddTodo = async (title) => {
    try {
      todoAdd.mutate(title);
      // await queryClient.invalidateQueries({ queryKey: ["todos"] });
      // TODO: 할 일 추가 후 목록 다시 불러오기
    } catch (err) {
      console.error("할 일 추가 중 오류 발생:", err);
      setError("할 일을 추가하는데 실패했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await handleAddTodo(title);
      setTitle(""); // 입력 필드 초기화
    } catch (err) {
      console.error("할 일 추가 중 오류 발생:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="flex-grow p-2 border"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          추가
        </button>
      </div>
    </form>
  );
}

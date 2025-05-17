"use client";

import {
  Moon,
  Sun,
  Pencil,
  Trash2,
  Check,
  X,
  CheckCircle,
  Circle,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  interface Todo {
    id: number;
    text: string;
    date: Date;
    completed: boolean;
  }

  const [todo, setTodo] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const savedTodo = localStorage.getItem("todo");
      if (savedTodo) {
        return JSON.parse(savedTodo).map((todo: any) => ({
          ...todo,
          date: new Date(todo.date),
        }));
      }
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [todoId, setTodoId] = useState(1);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: todoId,
        text: newTodo,
        date: new Date(),
        completed: false,
      };
      setTodo([...todo, newTodoItem]);
      setNewTodo("");
      setTodoId(todoId + 1);
    }
  };

  const deleteTodo = (id: number) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const startEditing = (task: Todo) => {
    setEditingTaskId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editingTaskId !== null && editText.trim()) {
      setTodo(
        todo.map((task) =>
          task.id === editingTaskId ? { ...task, text: editText } : task
        )
      );
      setEditingTaskId(null);
    }
  };

  const toggleTodo = (id: number) => {
    setTodo(
      todo.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDarkTheme ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="w-full max-w-[500px] m-auto border rounded-sm mt-20 min-h-[300px] p-4 flex flex-col shadow-xl gap-2">
        <div className="flex items-center justify-between">
          <h1
            className={`text-2xl font-semibold text-center ${
              isDarkTheme ? "text-white" : "text-black"
            }`}
          >
            TodoList
          </h1>
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="cursor-pointer p-1 rounded-[50%] text-xs bg-gray-600"
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            name="title"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter task"
            className={`p-2 outline-none rounded-sm w-full ${
              isDarkTheme ? "bg-white text-black" : "bg-gray-300 text-black"
            }`}
          />
          <button
            onClick={addTodo}
            className="bg-green-500 p-2 w-[150px] rounded-sm"
          >
            Add
          </button>
        </div>
        <div
          className={`border min-h-[300px] rounded-sm p-2 flex flex-col gap-2  ${
            isDarkTheme ? "" : "text-black"
          }`}
        >
          {/* Todo list */}

          {todo.length < 0 ? (
            <h1>No Todo</h1>
          ) : (
            todo.map((item) => (
              <div
                key={item?.id}
                className={`w-full min-h-[40px] rounded-sm flex justify-between items-center px-2 py-1 ${
                  isDarkTheme ? "bg-white text-black" : "bg-gray-300"
                } `}
              >
                {editingTaskId === item?.id ? (
                  <div className="flex items-center gap-40">
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className={`p-2 outline-none rounded-sm w-full ${
                        isDarkTheme
                          ? "bg-gray-300 text-black border-slate-600"
                          : "bg-white text-black"
                      }`}
                      autoFocus
                    />
                    <div className="flex space-x-1">
                      <button
                        onClick={saveEdit}
                        className={`h-8 w-8 ${
                          isDarkTheme
                            ? "text-green-400 hover:text-green-300"
                            : "text-green-600 hover:text-green-500"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className={`h-8 w-8 ${
                          isDarkTheme
                            ? "text-red-400 hover:text-red-300"
                            : "text-red-600 hover:text-red-500"
                        }`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleTodo(item?.id)}
                        className={`h-8 w-8 cursor-pointer ${
                          item.completed
                            ? isDarkTheme
                              ? "text-green-400 hover:text-green-300"
                              : "text-green-600 hover:text-green-500"
                            : isDarkTheme
                            ? "text-slate-400 hover:text-slate-300"
                            : "text-slate-600 hover:text-slate-500"
                        }`}
                      >
                        {item?.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </button>
                      <p
                        className={`flex-grow ${
                          item.completed ? "line-through text-opacity-70" : ""
                        }`}
                      >
                        {item?.text}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-xs text-gray-500">
                        {item.date.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => startEditing(item)}
                          className={`h-8 w-8 cursor-pointer flex items-center justify-center hover:bg-gray-200 rounded-[50%] ${
                            isDarkTheme
                              ? "text-blue-400 hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-500"
                          }`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteTodo(item?.id)}
                          className={`h-8 w-8 cursor-pointer flex items-center justify-center hover:bg-gray-200 rounded-[50%] ${
                            isDarkTheme
                              ? "text-red-400 hover:text-red-300"
                              : "text-red-600 hover:text-red-500"
                          }`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

'use client';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import React, { useState, useEffect } from 'react';
import { api } from '../../../../convex/_generated/api';

interface Todo {
  id: number;
  text: string;
  description: string;
}

const TodoApp: React.FC = () => {
    const createTodoMutation = useMutation(api.todo.createTodo)
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [descriptionValue, setDescriptionValue] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedText, setEditedText] = useState<string>('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value);
  };

const handleAddTodo = async () => {
    if (inputValue.trim() !== '') {
        const newTodo: Todo = {
            id: todos.length + 1,
            text: inputValue.trim(),
            description: descriptionValue,
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
        setDescriptionValue('');
        await createTodoMutation({ name: inputValue.trim(), description: descriptionValue });
    }
};

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };


  const handleEditTodo = (id: number) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setEditingId(id);
      setEditedText(todoToEdit.text);
    }
  };

  const handleUpdateTodo = () => {
    if (editedText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editedText.trim() } : todo
      ));
      setEditingId(null);
      setEditedText('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <div className="flex mb-4">
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          className="w-full mr-2 p-2 border border-gray-300 rounded"
          value={inputValue}
          onChange={handleInputChange}
        />
        <textarea className="bg-transparent w-full p-2 border border-gray-300 rounded" type='text' value={descriptionValue} onChange={handleDescriptionChange}></textarea>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
        </div>
        </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between mb-2">
            {editingId === todo.id ? (
              <Input
                type="text"
                className="w-full mr-2 p-2 border border-gray-300 rounded"
                value={editedText}
                onChange={handleEditInputChange}
              />
            ) : (
              todo.text
            )}
            <div>
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                onClick={() => handleEditTodo(todo.id)}
              >
                Edit
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </Button>
              {editingId === todo.id && (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded ml-2"
                  onClick={handleUpdateTodo}
                >
                  Update
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

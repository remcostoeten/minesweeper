'use client';
import React, { useState, useEffect } from 'react';
import AddTodoForm from '../add';
import EditTodoModal from '../edit';
import { Todo } from '../todo';

const TODOS_KEY = 'todos';

function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem(TODOS_KEY);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (title: string, description?: string) => {
    setTodos([
      ...todos,
      {
        id: Math.random().toString(36).substring(2, 15),
        title,
        description,
        completed: false,
      },
    ]);
  };

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (id: string) => {
    setEditTodoId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSave = (id: string, title: string, description?: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Todo List</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      import { Todo } from '../todo'; // Import the Todo component

      {todos.length > 0 && (
        <ul className="list-none">
          {todos.map((todo) => (
            <li key={todo.id} className="mb-2">
              <Todo // Use the Todo component as a value
                todo={todo}
                onToggleComplete={() => handleToggleComplete(todo.id)}
                onEdit={() => handleEdit(todo.id)}
                onDelete={() => handleDelete(todo.id)}
              />
            </li>
          ))}
        </ul>
      )}
      <EditTodoModal
        isOpen={isEditModalOpen}
        todo={todos.find((todo) => todo.id === editTodoId) || { id: '', title: '', description: '', completed: false }}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default HomePage;

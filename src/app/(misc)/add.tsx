'use client'
import { Button } from '@/components/ui';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

interface AddTodoFormProps {
  onAddTodo: (title: string, description?: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTodo(title, description.trim());
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 space-x-2">
      <Input
        type="text"
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
      />
      <Input
        type="text"
        placeholder="Optional description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
        />
        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded-md">
          Add Todo
        </Button>
      </form>
    );
  };

  export default AddTodoForm;
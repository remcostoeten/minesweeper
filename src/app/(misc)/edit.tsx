import React, { useState } from 'react';
import { Todo } from './todo';

interface EditTodoModalProps {
  isOpen: boolean;
  todo: Todo;
  onClose: () => void;
  onSave: (title: string, description?: string) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  isOpen,
  todo,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');

  const handleSave = () => {
    onSave(title, description.trim());
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out ${
        !isOpen && 'opacity-0'
      }`}
    >
      <div className="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-md shadow-md p-4">
        <div>
          <h3 className="text-xl font-bold">Edit Todo</h3>
        </div>
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Description (Optional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4">
          <button
            className="px-4 py-2 mr-2 text-white bg-red-500 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;

import React from 'react';
import { Todo } from './todo';

interface TodoProps {
    todo: Todo;
    onToggleComplete: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onToggleComplete, onEdit, onDelete }) => {
    const todoClassName = todo.completed ? 'bg-gray-200 line-through' : 'bg-white';

    return (
        <div className={`flex items-center justify-between p-4 mb-2 rounded-md ${todoClassName}`}>
            <div>
                <h3 className="font-bold">{todo.title}</h3>
                {todo.description && <p className="text-gray-600">{todo.description}</p>}
            </div>
            <div className="flex items-center space-x-2">
                <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onToggleComplete(todo.id)}
                >
                    {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                    type="button"
                    className="text-green-500 hover:text-green-700"
                    onClick={() => onEdit(todo.id)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(todo.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Todo;

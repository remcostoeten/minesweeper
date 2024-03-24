'use client';
import { Input } from '@ui/index';
import React, { useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

const initialNotes = [
    { id: 1, title: 'First Note', content: 'This is the first note.' },
    { id: 2, title: 'Second Note', content: 'This is the second note.' },
];

function NotesApp() {
    const [notes, setNotes] = useState(initialNotes);
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const [editId, setEditId] = useState(null);
    const [editNote, setEditNote] = useState({ title: '', content: '' });
    const destroy = useMutation(api.note.destroy);

    const handleAddNote = () => {
        const noteToAdd = { ...newNote, id: Date.now() };
        setNotes([...notes, noteToAdd]);
        setNewNote({ title: '', content: '' }); // Reset new note Input
    };

    const handleUpdateNote = () => {
        setNotes(notes.map(note => (note.id === editId ? { ...note, ...editNote } : note)));
        setEditId(null); // Exit edit mode
    };

    const handleDeleteNote = async () => {
        const noteToDelete = notes.find((note) => note.id === editId);
        await destroy({ id: noteToDelete.id });
        setNotes(notes.filter((note) => note.id !== editId));
        setEditId(null); // Exit edit mode
    };

    return (
        <div className="p-4 space-y-4">
            {/* Add and Edit Note UI */}
            {notes.map((note) => (
                <div key={note.id} className="border p-4 rounded flex justify-between items-center">
                    {editId === note.id ? (
                        // Edit Note Form
                        <>
                            {/* Edit Note Inputs */}
                            <Input
                                type="text"
                                value={editNote.title}
                                onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                                className="border p-2 rounded mr-2"
                            />
                            <Input
                                type="text"
                                value={editNote.content}
                                onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                                className="border p-2 rounded mr-2"
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleUpdateNote}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setEditId(null)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                              <div>
                                <h3 className="font-bold">{note.title}</h3>
                                <p>{note.content}</p>
                            </div>
                            <div>
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => {
                                        setEditId(note.id);
                                        setEditNote({ title: note.title, content: note.content });
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteNote}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
            {/* Add Note Form */}
            <div className="flex space-x-2">
                <Input
                    type="text"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="Title"
                    className="border p-2 rounded"
                />
                <Input
                    type="text"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Content"
                    className="border p-2 rounded"
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddNote}
                >
                    Add Note
                </button>
            </div>
        </div>
    );
}

export default NotesApp;

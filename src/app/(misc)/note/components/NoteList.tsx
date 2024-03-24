'use client';
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export default function NotesList() {
    const notes = useQuery(api.note.get)
    if (!notes) return <div>Loading...</div>;

  return (
    <div className="space-y-2">
      {notes.map((note) => (
        <div key={note._id} className="card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span>{note.category}</span>
        </div>
      ))}
    </div>
  );
}
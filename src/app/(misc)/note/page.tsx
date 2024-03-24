'use client';

import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import NotesList from "./components/NoteList";

export default function page() {
    const createNote = useMutation(api.note.createNote)

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, content, category } = event.target.elements;
    createNote({
      title: title.value,
      content: content.value,
      category: category.value,
    });
  };

  return (
    <><form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Title" className="input" />
          <textarea name="content" placeholder="Content" className="textarea" />
          <input name="category" placeholder="Category" className="input" />
          <button type="submit" className="btn">Create Note</button>
      </form><NotesList /></>
  );
}


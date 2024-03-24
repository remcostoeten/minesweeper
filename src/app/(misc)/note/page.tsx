"use client"

import { CheckCircledIcon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons"
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import SettingsShell from "@/components/settings/SettingsShell";

function Add() {
  const create = useMutation(api.todo.create);
  const [todo, setTodo] = useState("");

  const createTodo = () => create({ text: todo }).then(() => { setTodo("") })

  return (
    <SettingsShell title="Todo">
      <Input type="text"
        className="bg-transparent border border-slate-600 rounded p-2 w-full"
        placeholder="..."
        onChange={(e) => { setTodo(e.target.value) }}
        value={todo}/>

<Button onClick={createTodo}  >      <PlusCircledIcon width={20} height={20}/> Add
      </Button>
    </SettingsShell>
  )
}
function List() {
  const destroy = useMutation(api.todo.destroy);
  const todos = useQuery(api.todo.get)
  const update = useMutation(api.todo.update);

  return (
    <div className="flex flex-col gap-2">
      {todos?.map(({_id, text, is_complete}) => (
        <div key={_id} className="...">
          <span className={is_complete ? 'line-through' : ''}>{text}</span>

          <div className="flex gap-2 items-center">
            {!is_complete && (
              <button type="button"
                  onClick={() => { update({ id: _id }) }}
                  className="...">
                  <CheckCircledIcon width={20} height={20}/>
              </button>
            )}
            <button type="button"
                onClick={() => { destroy({ id: _id }) }}
                className="...">
                <TrashIcon width={20} height={20}/>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default function TodoApp() {
  return (
    <div>
      <h1 className="text-2xl font-light mb-2 text-slate-400">Todo App</h1>
      <Add/>
      <hr className="block my-4 border-slate-600"/>
      <List/>
    </div>
  )
}
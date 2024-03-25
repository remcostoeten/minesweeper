"use client"

import { useState } from "react"
import {
  CheckCircledIcon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons"
import { Button } from "@ui/button"
import { Input } from "@ui/input"
import { useMutation, useQuery } from "convex/react"

import SettingsShell from "@/components/settings/SettingsShell"

import { api } from "../../../../convex/_generated/api"

function Add() {
  const create = useMutation(api.todo.create)
  const [todo, setTodo] = useState("")
  const [priority, setPriority] = useState("")

  const createTodo = () =>
    create({
      text: todo,
      priority: Number(priority),
    }).then(() => {
      setTodo("")
      setPriority("")
    })

  return (
    <SettingsShell title="Todo">
      <Input
        type="text"
        className="bg-transparent border border-slate-600 rounded p-2 w-full"
        placeholder="..."
        onChange={(e) => {
          setTodo(e.target.value)
        }}
        value={todo}
      />
      <Input
        type="number"
        className="bg-transparent border border-slate-600 rounded p-2 w-full"
        placeholder="Priority"
        onChange={(e) => {
          setPriority(e.target.value)
        }}
        value={priority}
      />
      <Button onClick={createTodo}>
        <PlusCircledIcon width={20} height={20} /> Add
      </Button>
    </SettingsShell>
  )
}

function List({ filter }) {
  const destroy = useMutation(api.todo.destroy)
  const todos = useQuery(api.todo.get)
  const update = useMutation(api.todo.update)

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "all") return true
    if (filter === "active") return !todo.is_complete
    if (filter === "completed") return todo.is_complete
  })

  return (
    <div className="flex flex-col gap-2">
      {filteredTodos?.map(({ _id, text, is_complete }) => (
        <div key={_id} className="...">
          <span className={is_complete ? "line-through" : ""}>{text}</span>

          <div className="flex gap-2 items-center">
            {!is_complete && (
              <button
                type="button"
                onClick={() => {
                  update({ id: _id })
                }}
                className="..."
              >
                <CheckCircledIcon width={20} height={20} />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                destroy({ id: _id })
              }}
              className="..."
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => setFilter("all")}
        className="bg-transparent border border-slate-600 text-slate-400"
      >
        All
      </Button>
      <Button
        onClick={() => setFilter("active")}
        className="bg-transparent border border-slate-600 text-slate-400"
      >
        Active
      </Button>
      <Button
        onClick={() => setFilter("completed")}
        className="bg-transparent border border-slate-600 text-slate-400"
      >
        Completed
      </Button>{" "}
      <Button
        onClick={() => setFilter("priority")}
        className="bg-transparent border border-slate-600 text-slate-400"
      >
        Priority
      </Button>
    </div>
  )
}

export default function TodoApp() {
  const [filter, setFilter] = useState("all")

  return (
    <div>
      <h1 className="text-2xl font-light mb-2 text-slate-400">Todo App</h1>

      <Add />
      <hr className="block my-4 border-slate-600" />
      <Filter filter={filter} setFilter={setFilter} />
      <List filter={filter} />
    </div>
  )
}

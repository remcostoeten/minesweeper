'use client';

import { CheckCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

function List() {
  const destroy = useMutation(api.todo.destroy);
  const update = useMutation(api.todo.update);
  const todos = useQuery(api.todo.get);

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
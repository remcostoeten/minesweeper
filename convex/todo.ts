import { v } from "convex/values"

import { mutation, query } from "./_generated/server"

type prioritiesList = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export const create = mutation({
  args: { text: v.string(), priority: v.number() },
  handler: async (ctx, args) => {
    const { text } = args
    const { priority } = args
    const id = await ctx.db.insert("todo", {
      text,
      is_complete: false,
      priority,
    })
    return id
  },
})

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("todo").collect()
  },
})

export const destroy = mutation({
  args: { id: v.id("todo") },
  handler: async (ctx, args) => {
    const { id } = args
    await ctx.db.delete(id)
  },
})

export const update = mutation({
  args: { id: v.id("todo") },
  handler: async (ctx, args) => {
    const { id } = args
    await ctx.db.patch(id, { is_complete: true })
  },
})

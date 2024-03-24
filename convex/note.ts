import { v } from "convex/values"

import { mutation } from "./_generated/server"

export const createNote = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    category: v.string(),

  },
  async handler(ctx, args) {
    await ctx.db.insert("notes", {
      title: args.title,
      content: args.content,
      category: args.category,
    })
  },
})

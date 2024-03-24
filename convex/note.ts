import { v } from "convex/values"

import { mutation, query } from "./_generated/server"

export const createNote = mutation({
  args: {
    id: v.any(),
    title: v.string(),
    content: v.string(),
    category: v.string(),

  },
  async handler(ctx, args) {
    await ctx.db.insert("notes", {
      id: args.id,
      title: args.title,
      content: args.content,
      category: args.category,
    })
  },
})

export const destroy = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
  },
});

export const update = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.patch(id, { is_complete: true });
  },
});
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notes").collect()
  },
})
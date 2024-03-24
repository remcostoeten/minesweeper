import { v } from "convex/values"

import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const { text } = args;
    const id = await ctx.db.insert("todo", { text, is_complete: false });
    return id;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("todo").collect();
  },
});

export const destroy = mutation({
  args: { id: v.id("todo") },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
  },
});


export const update = mutation({
  args: { id: v.id("todo") },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.patch(id, { is_complete: true });
  },
});
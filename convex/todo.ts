import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createTodo = mutation({
  args: {
    name: v.string(),
    description: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("todos", {
      name: args.name,
      description: args.description,
    });
  },
});
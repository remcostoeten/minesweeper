import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";

export const setBetsize = mutation({
  args: {
    betsize: v.number(),
  },
  async handler(ctx, args) {
    await ctx.db.insert('betsize', {
      setBetsize: args.betsize,
    });
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("betsize").collect();
  },
});
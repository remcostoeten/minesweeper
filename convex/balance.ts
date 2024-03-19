import { v } from "convex/values"

import { mutation, query } from "./_generated/server"

export const setBalance = mutation({
  args: {
    balance: v.number(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("balance", {
      setBalance: args.balance,
    })
  },
})

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("balance").collect()
  },
})

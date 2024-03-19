import { v } from "convex/values"

import { mutation } from "./_generated/server"

export const createBet = mutation({
  args: {
    amount: v.number(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("bets", {
      amount: args.amount,
    })
  },
})

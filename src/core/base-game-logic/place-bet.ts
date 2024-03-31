import { useMutation, useQuery } from "convex/react"
import { toast } from "sonner"

import { api } from "../../../convex/_generated/api"
import { useSubstractFromBalance } from "./useSubstractFromBalance"

export const usePlaceBet = (bet: number) => {
  const setBetAmount = useMutation(api.bet.createBet)
  const getBalance = useQuery(api.balance.get)
  const balance = getBalance?.[getBalance.length - 1]?.setBalance.toFixed(2)
  const { subtractFromBalance } = useSubstractFromBalance()

  const handlePlaceBet = async () => {
    await setBetAmount({ amount: bet })

    if (balance < bet) {
      toast(
        "I'm sorry, but it seems your balance isn't sufficient to place that bet. Please consider topping up your balance or adjusting your bet amount. 😔"
      )
      return
    }

    if (bet <= 0) {
      toast("dawg.. we're not charging you to play.. so bet more than €0,- 💰")
      setTimeout(() => {
        toast(
          "at least... I don't think so, it would be a good idea to charge you to play though... 👽"
        )
      }, 5500)
      return
    }

    toast(`Bet of ${bet} placed.`)
    subtractFromBalance(bet)
  }

  return handlePlaceBet
}

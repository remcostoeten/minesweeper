/**
 * `useSubtractFromBalance` is a custom hook that provides functionality to subtract a certain amount from the balance.
 *
 * It returns an object with the following properties:
 *
 * - `balance`: The current balance.
 * - `subtractFromBalance`: A function that subtracts the `amount` from the `balance` when called.
 * - `amount`: The amount to subtract from the balance. This is a state variable, and its initial value is 0.
 * - `setAmount`: A function to update the `amount`.
 *
 * Here's an example of how to use this hook in a component:
 *
 * ```typescriptreact
 * import { useSubtractFromBalance } from "./useSubtractFromBalance"
 *
 * function SomeComponent() {
 *   const { balance, subtractFromBalance, amount, setAmount } = useSubtractFromBalance()
 *
 *   return (
 *     <div>
 *       <p>{balance}</p>
 *       <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
 *       <button onClick={subtractFromBalance}>Subtract from balance</button>
 *     </div>
 *   )
 * }
 *
 * export default SomeComponent
 * ```

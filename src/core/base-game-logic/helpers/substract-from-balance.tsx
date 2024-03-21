import { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useSubtractFromBalance = () => {
    const getBalance = useQuery(api.balance.get);
    const setBalance = useMutation(api.balance.setBalance);
    const balance = getBalance?.[getBalance.length - 1]?.setBalance.toFixed(2);
    const [amount, setAmount] = useState(0);

    const subtractFromBalance = async () => {
        try {
            const newBalance = balance - amount;
            await setBalance({ balance: newBalance });
            console.log(`New balance: ${newBalance}`);
        } catch (err) {
            console.error(err);
        }
    };

    return { balance, subtractFromBalance, amount, setAmount };
};

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
 *
 * In this example, an input field and a button are rendered. The value of the input field is bound to `amount`, and `setAmount` is used to update `amount` when the input value changes. When the button is clicked, `subtractFromBalance` is called, which subtracts `amount` from `balance`.
 */
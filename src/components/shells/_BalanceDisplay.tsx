// deprecated ? useless ? to be deleted ?

import React from "react"

const BalanceDisplay = ({
  balance,
  profitLoss,
}: {
  balance: number
  profitLoss: number
}) => {
  const profitLossClass = profitLoss > 0 ? "profit" : "loss"
  return (
    <div className="balance-display">
      <p>Balance:</p>
      <span className="balance-amount">{balance}</span>
      <p className={`profit-loss ${profitLossClass}`}>
        {profitLoss > 0 ? "+" : ""} {profitLoss}
      </p>
    </div>
  )
}

export default BalanceDisplay

// import { useBalance } from '@/core/useBalance';
// import React from 'react';

// const BalanceDisplay = ({ profitLoss }: { profitLoss: number }) => {
//   const { balance, handleChange, handleSubmit } = useBalance();
//   console.log(balance)
//   const profitLossClass = profitLoss > 0 ? 'profit' : 'loss';

//   return (
//     <div className="balance-display">
//       <p>Balance:</p>
//       <span className="balance-amount">{balance?.setBalance}</span>
//             <p className={`profit-loss ${profitLossClass}`}>
//         {profitLoss > 0 ? '+' : ''} {profitLoss}
//       </p>
//     </div>
//   );
// };

// export default BalanceDisplay;

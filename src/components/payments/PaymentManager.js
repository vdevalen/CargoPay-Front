import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { processPayment } from '../services/api';

const PaymentManager = () => {
  const { token } = useContext(AuthContext);
  const [cardId, setCardId] = useState('');
  const [amount, setAmount] = useState('');

  const handleProcessPayment = async () => {
    try {
      await processPayment(cardId, amount, token);
      alert('Payment processed successfully');
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <h2>Payment Processing</h2>
      <input
        type="text"
        placeholder="Card ID"
        value={cardId}
        onChange={(e) => setCardId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleProcessPayment}>Process Payment</button>
    </div>
  );
};

export default PaymentManager;

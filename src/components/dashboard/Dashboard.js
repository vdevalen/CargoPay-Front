// Dashboard.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createCard, getCardDetails, getCardBalance, processPayment } from '../services/api';

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const handleCreateCard = async () => {
    try {
      const newCard = await createCard('123456789012345', 100, token);
      setMessage(`Card created: ${newCard.cardNumber} with balance ${newCard.balance}`);
    } catch (error) {
      setMessage('Error creating card');
    }
  };

  const handleGetCardDetails = async () => {
    try {
      const cardDetails = await getCardDetails('123456789012345', token);
      setMessage(`Card: ${cardDetails.cardNumber}, Balance: ${cardDetails.balance}`);
    } catch (error) {
      setMessage('Error fetching card details');
    }
  };

  const handleGetCardBalance = async () => {
    try {
      const balance = await getCardBalance('123456789012345', token);
      setMessage(`Balance: ${balance}`);
    } catch (error) {
      setMessage('Error fetching card balance');
    }
  };

  const handleProcessPayment = async () => {
    try {
      const result = await processPayment(3008, 50, token);
      setMessage(`Payment processed. New Balance: ${result.balance}`);
    } catch (error) {
      setMessage('Error processing payment');
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <button onClick={handleCreateCard}>Create Card</button>
      <button onClick={handleGetCardDetails}>Get Card Details</button>
      <button onClick={handleGetCardBalance}>Get Card Balance</button>
      <button onClick={handleProcessPayment}>Process Payment</button>
      <p>{message}</p>
    </div>
  );
}
export default Dashboard;

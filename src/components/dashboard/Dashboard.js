// Dashboard.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createCard, getCardDetails, getCardBalance, processPayment } from '../services/api';

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [cardNumber, setCardNumber] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [existingCardNumber, setExistingCardNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [message, setMessage] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Crear tarjeta nueva
  const handleCreateCard = async () => {
    try {
      const newCard = await createCard(cardNumber, initialBalance, token);
      setMessage(`Tarjeta creada: ${newCard.cardNumber} con saldo ${newCard.balance}`);
    } catch (error) {
      console.error('Error al crear la tarjeta:', error);
      setMessage('Error al crear la tarjeta. Verifique los datos.');
    }
  };

  // Obtener detalles de una tarjeta existente
  const handleGetCardDetails = async () => {
    try {
      const cardDetails = await getCardDetails(existingCardNumber, token);
      setSearchResult(`Tarjeta: ${cardDetails.cardNumber}, Saldo: ${cardDetails.balance}`);
    } catch (error) {
      console.error('Error al obtener los detalles de la tarjeta:', error);
      setSearchResult('Tarjeta no encontrada.');
    }
  };

  // Obtener saldo de una tarjeta existente
  const handleGetCardBalance = async () => {
    try {
      const balance = await getCardBalance(existingCardNumber, token);
      setSearchResult(`Saldo: ${balance}`);
    } catch (error) {
      console.error('Error al obtener el saldo de la tarjeta:', error);
      setSearchResult('Error al obtener el saldo de la tarjeta.');
    }
  };

  const handleProcessPayment = async () => {
    try {
      const result = await processPayment(existingCardNumber, parseFloat(paymentAmount), token); // Asegúrate de que el monto es un número
      setSearchResult(`Pago procesado. Nuevo saldo: ${result.balance}`);
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setSearchResult('Error al procesar el pago.');
    }
  };
  
  return (
    <div>
      <nav>
        <span>Dashboard</span>
        <span className="nav-item" onClick={logout}>Cerrar Sesión</span>
      </nav>
      <div className="container">
        <div className="card-management">
          <h2>Gestión de Tarjetas</h2>
          <input
            type="text"
            placeholder="Número de Tarjeta"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Saldo Inicial"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
          />
          <button onClick={handleCreateCard}>Crear Tarjeta</button>
          <p>{message}</p>
        </div>

        <div className="card-search">
          <h2>Consulta de Tarjetas</h2>
          <input
            type="text"
            placeholder="Buscar Número de Tarjeta"
            value={existingCardNumber}
            onChange={(e) => setExistingCardNumber(e.target.value)}
          />
          <button onClick={handleGetCardDetails}>Obtener Detalles de la Tarjeta</button>
          <button onClick={handleGetCardBalance}>Obtener Saldo de la Tarjeta</button>
          <input
            type="text"
            placeholder="Monto del Pago"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
          <button onClick={handleProcessPayment}>Procesar Pago</button>
          <p>{searchResult}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

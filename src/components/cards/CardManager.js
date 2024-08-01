import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCards, createCard } from '../services/api';

const CardManager = () => {
  const { token } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [initialBalance, setInitialBalance] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getCards(token);
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    fetchCards();
  }, [token]);

  const handleCreateCard = async () => {
    try {
      const response = await createCard(newCardNumber, initialBalance, token);
      setCards([...cards, response.data]);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  return (
    <div>
      <h2>Card Management</h2>
      <input
        type="text"
        placeholder="Card Number"
        value={newCardNumber}
        onChange={(e) => setNewCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Initial Balance"
        value={initialBalance}
        onChange={(e) => setInitialBalance(e.target.value)}
      />
      <button onClick={handleCreateCard}>Create Card</button>
      <ul>
        {cards.map(card => (
          <li key={card.id}>{card.cardNumber} - Balance: {card.balance}</li>
        ))}
      </ul>
    </div>
  );
};

export default CardManager;

// api.js
const baseUrl = 'https://localhost:7295/api';

export const login = async (username, password) => {
  const response = await fetch(`${baseUrl}/Auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed: ' + response.statusText);
  }

  const data = await response.json();
  return data.token;
};

export const createCard = async (cardNumber, initialBalance, token) => {
  const response = await fetch(`${baseUrl}/Card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cardNumber, initialBalance }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create card: ${response.statusText}`);
  }

  return await response.json();
};

export const getCardDetails = async (cardNumber, token) => {
  const response = await fetch(`${baseUrl}/Card/${cardNumber}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch card details: ${response.statusText}`);
  }

  return await response.json();
};

export const getCardBalance = async (cardNumber, token) => {
  const response = await fetch(`${baseUrl}/Card/${cardNumber}/balance`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch card balance: ${response.statusText}`);
  }

  const data = await response.json();
  return data.balance;
};

export const processPayment = async (cardId, amount, token) => {
  console.log('Amount to be sent:', amount); 
  const response = await fetch(`${baseUrl}/Payment/${cardId}/pay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount: parseFloat(amount) }),
  });

  if (!response.ok) {
    throw new Error(`Failed to process payment: ${response.statusText}`);
  }

  return await response.json();
};



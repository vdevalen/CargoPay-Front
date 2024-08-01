// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

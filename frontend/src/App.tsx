import React from 'react';
import './App.css';
import { Main } from './app/main/Main';
import { Navbar } from './app/navbar/Navbar';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Cart } from './app/cart/Cart';
import SignIn from './app/login/Register';
import { AppRoutes } from './app.routes';

function App() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;

import './App.css';
import React from 'react';
import LoginPage from './Pages/LoginPage';
import { Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage';

function App() {




  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;

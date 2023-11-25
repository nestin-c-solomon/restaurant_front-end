// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Landing from './Pages/Landing';
import Cart from './Pages/Cart';
import Menus from './Pages/Menus';

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<Menus />} />
        </Routes>
    </div>
  );
}

export default App;

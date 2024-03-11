import React from "react";
import LoginComponent from "./components/login/Login";
import HomeComponent from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n'; // Asegúrate de que esta línea esté antes de renderizar cualquier componente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent/>} />
        <Route path="/home" element={<HomeComponent/>} />
      </Routes>
    </Router>
  );
}

export default App;

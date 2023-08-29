import { React, useEffect, useState } from "react"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/home/Home"
import Board from "./components/board/Board"
import CardsDeck from "./components/cards/CardsDeck"
import Login from "./components/login/Login"
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./components/login/Protected";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Protected><Home /></Protected>} />
            <Route path="/Board" element={<Protected><Board /></Protected>} />
            <Route path="/CardsDeck" element={<Protected><CardsDeck /></Protected>} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}
export default App;

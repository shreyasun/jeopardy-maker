import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/home/Home"
import Board from "./components/board/Board"
import CardsDeck from "./components/cards/CardsDeck"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Board" element={<Board />} />
          <Route path="/CardsDeck" element={<CardsDeck />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

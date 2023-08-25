import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from "./components/board/Board"
import CardsDeck from "./components/my-decks/CardsDeck"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/CardsDeck" element={<CardsDeck />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

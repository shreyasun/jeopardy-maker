import React, { useEffect, useState } from 'react';
import Help from "../help/Help"
import { Link } from "react-router-dom";
import "./board.css";
import { PiCards } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiSolidShow, BiSolidHelpCircle } from "react-icons/bi";
import { FaRedoAlt } from "react-icons/fa";
import axios from "axios"


const Board = () => {
  // Cards we have so far
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState("");
  const [score, setScore] = useState(0);
  const [currPoints, setCurrPoints] = useState(0);
  const [currQA, setCurrQA] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [clickedCards, setClickedCards] = useState([]);

  // Fetch all added cards for display
  const getCards = async () => {
    try {
      // Get cards from Database and set it to a local deck
      const allCards = await axios.get(`http://localhost:8800/trivia`);
      setCards(allCards.data.message);
      console.log("Current Cards:", allCards.data.message);
      setIsLoading(false);
    } catch(error) {
      // Handle error
      console.error("Error fetching cards", error);
      setIsLoading(false);
    }
  }

  // Render added categories and cards
  useEffect(() => {
    const currScore = JSON.parse(localStorage.getItem('score'));
    if (currScore){
      setScore(currScore);
    }
    const currClickedCards = JSON.parse(localStorage.getItem('clickedCards'));
    if (currClickedCards) {
      setClickedCards(currClickedCards);
    }
    getCards();
  }, [])

  console.log("clickedCards:", clickedCards)

  const categories = [...new Set(cards.map(data => data.category))];

  // create object categorizing each question/answer
  let categorizedTrivia = {};
  categories.forEach(category => {
    categorizedTrivia[category] = cards.filter(card => card.category === category);
  });

  const trivia = Object.values(categorizedTrivia)

  const increaseScore = () => {
    const newScore = score + currPoints;
    setScore(newScore);
    localStorage.setItem('score', JSON.stringify(newScore));
    setMode("");
  }

  const handleCardClick = (cardId) => {
    if (!clickedCards.includes(cardId)) {
      setClickedCards(prevClickedCards => [...prevClickedCards, cardId]);
      localStorage.setItem('clickedCards', JSON.stringify(clickedCards));
    }
  }

  const resetGame = () => {
    setClickedCards([]);
    setScore(0);
    localStorage.removeItem('clickedCards');
    localStorage.removeItem('score');
  }


  return (
    <div className="board">
      {isLoading ? (
        <p>Loading Board...</p>
      ) : (
      <div>
        <div className="header">
          <div style={{display: "flex", gap: "20px"}}>
            <Link to="/CardsDeck" style={{textDecoration: "none"}}><div className="button1"><PiCards />Edit Questions</div></Link>
            <div className='button1' type="submit" onClick = {() => setMode("help")}><BiSolidHelpCircle />Instructions</div>
          </div>
          <div style={{display: "flex", gap: "20px"}}>
            <div className='button1' type="submit" onClick={resetGame}><FaRedoAlt />Reset Game</div>
            <Link to="/myAccount" style={{textDecoration: "none"}}><div className="button1"><CgProfile />My Account</div></Link>
          </div>
        </div>
        <h1>This is Jeopardy!</h1>
        <h3>Score: ${score}</h3>
        <table>
          <thead>
            <tr className='titleCard'>
              {categories.map((category, i) => {
                return <th className="tableCard" key={i}>{category}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {trivia[0].map((qs, currQAIndex) => (
              <tr key={currQAIndex} className='card'>
                {/* iterate through categories and make a cell under the correct category */}
                {trivia.map((category, categoryIndex) => (
                  <td key={categoryIndex} onClick={() => {setMode("popup"); setCurrQA(category[currQAIndex]); setCurrPoints(((currQAIndex + 1) * 200)); handleCardClick((categoryIndex + categories.length * currQAIndex))}} style={{cursor: "pointer", backgroundColor: clickedCards.includes((categoryIndex + categories.length * currQAIndex)) ? '#17179A' : 'darkblue'}}>
                    <h1>${(currQAIndex + 1) * 200}</h1>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      {/* Question/Answer mode - popup card where question is shown */}
      {(mode === "popup") ? (
        <div className='flashcardPopup'>
          <div className="closePopup" onClick={() => {setMode(""); setShowAnswer(false);}}><AiFillCloseCircle style={{color: "gold"}}/></div>
          <h2>{currQA.question}</h2>
          <div className='button3' type="submit" onClick = {() => {setShowAnswer(!showAnswer)}} style={{margin: "0 125px"}}><BiSolidShow />Show Answer</div>
          {showAnswer ? <h3>{currQA.answer}</h3> : ""}
          <div className="card-bottom">
            <div className='button2' type="submit" onClick = {() => setMode("")}><AiFillCloseCircle />Incorrect</div>
            <div className='button2' type="submit" onClick = {increaseScore}><BsFillCheckCircleFill />Correct</div>
          </div>
        </div>
      ) : ""}
      {/* Help mode - popup card where help instructions are shown */}
      {(mode === "help") ? (
        <div className='flashcardPopup'>
          <div className="closePopup" onClick={() => {setMode(""); setShowAnswer(false);}}><AiFillCloseCircle style={{color: "gold"}}/></div>
          <Help />
        </div>
      ) : ""}
      <div style={{display: "flex"}}>
       
      </div>
    </div>
  )
}

export default Board


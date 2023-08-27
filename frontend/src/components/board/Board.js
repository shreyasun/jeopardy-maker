import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./board.css";
import { PiCards } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import axios from "axios"

const Board = () => {
  // Cards we have so far
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    getCards();
  }, [])


  console.log("Cards:", cards)

  const categories = [...new Set(cards.map(data => data.category))];

  console.log("categories:", categories)

  // create object categorizing each question/answer
  let categorizedTrivia = {};
  categories.forEach(category => {
    categorizedTrivia[category] = cards.filter(card => card.category === category);
  });

  console.log("object:", categorizedTrivia)

  const trivia = Object.values(categorizedTrivia)
  console.log("cards:", cards)

  return (
    <div className="board">
      {isLoading ? (
        <p>Loading Board...</p>
      ) : (
      <div>
        <div className="header">
          <Link to="/CardsDeck" style={{textDecoration: "none"}}><div className="button1"><PiCards />My Question Sets</div></Link>
          <h1>This is Jeopardy!</h1>
          <Link to="/myAccount" style={{textDecoration: "none"}}><div className="button1"><CgProfile />My Account</div></Link>
        </div>
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
                  <td key={categoryIndex}>
                    <h1>${(currQAIndex + 1) * 200}</h1>
                    <p>{category[currQAIndex].answer}</p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  )
}

export default Board


import React, { useState } from 'react';
import "./board.css";
import Header from '../header/Header';

var cards = [
  {
    category: "Geography",
    cards: [
      {
        answer: "This small country is located between the borders of France and Spain",
        question: "What is Andorra?", 
      }, 
      {
        answer: "The Big Nickel is located in this city in Canada",
        question: "What is Sudbury?", 
      },
      {
        answer: "q3.1",
        question: "a3.1", 
      },
      {
        answer: "q4.1",
        question: "a4.1", 
      },
      {
        answer: "q5.1",
        question: "a5.1", 
      },
    ]
  }, 
  {
    category: "Science",
    cards: [
      {
        answer: "Exobiology the study of this",
        question: "What is life in outer space?", 
      }, 
      {
        answer: "The crayfish is not a fish - it is actually related to this other sea creature.",
        question: "What is a lobster?", 
      }, 
      {
        answer: "q3.2",
        question: "a3.2", 
      },
      {
        answer: "q4.2",
        question: "a4.2", 
      },
      {
        answer: "q5.2",
        question: "a5.2", 
      },
    ]
  },
  {
    category: "Technology",
    cards: [
      {
        answer: "Moore's law originally stated that the number of transistors on a microprocessor chip would double every",
        question: "What is year?", 
      }, 
      {
        answer: "The numbering system with a radix of 16 is more commonly referred to as",
        question: "What is hexadecimal?", 
      }, 
      {
        answer: "q3.3",
        question: "a3.3", 
      },
      {
        answer: "q4.3",
        question: "a4.3", 
      },
      {
        answer: "q5.3",
        question: "a5.3", 
      },
    ]
  },
  {
    category: "Movies",
    cards: [
      {
        answer: "Forrest Gump's IQ is this.",
        question: "What is 75?", 
      }, 
      {
        answer: "This is Batman's city.",
        question: "What is Gotham?", 
      }, 
      {
        answer: "q3.4",
        question: "a3.4", 
      },
      {
        answer: "q4.4",
        question: "a4.4", 
      },
      {
        answer: "q5.4",
        question: "a5.4", 
      },
    ]
  },
  {
    category: "Sports",
    cards: [
      {
        answer: "The first world cup was won by this country",
        question: "What is Uruguay?", 
      }, 
      {
        answer: "This is the first event in a decathlon.",
        question: "What is a 100 meter dash?", 
      }, 
      {
        answer: "q3.5",
        question: "a3.5", 
      },
      {
        answer: "q4.5",
        question: "a4.5", 
      },
      {
        answer: "q5.5",
        question: "a5.5", 
      },
    ]
  },
  {
    category: "Animals",
    cards: [
      {
        answer: "Under their white fur, this is the color of a polar bear's skin",
        question: "What is black?", 
      }, 
      {
        answer: "This is how much time it takes for a sloth to digest its meal.",
        question: "What is 2 weeks?", 
      }, 
      {
        answer: "q3.6",
        question: "a3.6", 
      },
      {
        answer: "q4.6",
        question: "a4.6", 
      },
      {
        answer: "q5.6",
        question: "a5.6", 
      },
    ]
  }
]

const categories = cards.map(data => data.category);
const trivia = cards.map(data => data.cards);

const Board = () => {
  return (
    <div className='board'>
      <Header />
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
                  {/*<p>{category[currQAIndex].answer}</p>*/}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  )
}

export default Board

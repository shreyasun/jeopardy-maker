import React from 'react'

const Help = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", padding: "10"}}>
        <h2>Instructions</h2>
        <p style={{textAlign: "left"}}>The app will load with a simple homepage with the option to edit questions or play the game.</p>
        <h4>Editing the </h4>
        <ul style={{textAlign: "left"}}>
            <li>The app will load with the game board displaying categories and point values.</li>
            <li>Click on any point value to select a question from that category.</li>
            <li>A popup will appear with the question. Click "Show Answer" to reveal the answer</li>
            <li>Click "Correct" if your answer is correct. The score will be updated.</li>
            <li>Click "Incorrect", which will allow you to proceed in the game without adding to the score.</li>
            <li>Questions that have been clicked will be a different color. But you can stll go back to them and update score if you get them correct.</li>
        </ul>
        <h4>Playing the Game</h4>
        <ul style={{textAlign: "left"}}>
            <li>The app will load with the game board displaying categories and point values.</li>
            <li>Click on any point value to select a question from that category.</li>
            <li>A popup will appear with the question. Click "Show Answer" to reveal the answer</li>
            <li>Click "Correct" if your answer is correct. The score will be updated.</li>
            <li>Click "Incorrect", which will allow you to proceed in the game without adding to the score.</li>
            <li>Questions that have been clicked will be a different color. But you can stll go back to them and update score if you get them correct.</li>
        </ul>
    </div>
  )
}

export default Help

import React from 'react'

const Help = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", padding: "10"}}>
        <h2>Instructions</h2>
        <p style={{textAlign: "left"}}>The app will load with a simple homepage with the option to edit questions or view game instructions.</p>
        <h4>Editing the Questions</h4>
        <ol style={{textAlign: "left"}}>
            <li>If you click on the option to edit questions, a page with the question management system will open up.</li>
            <li>Setting up categories
              <ul>
                <li>The first thing to do is set categories. 6 categories are recommended as that is the standard for Jeopardy games.</li>
                <li>Click on the button to add categories and type in a name. The category will then show up in this section. These categories can be deleted but not edited.</li>
                <li>Below the categories is a section that tracks how many questions/answers have been added to each category, how many cards are needed in total, and how many cards you have so far.</li>
              </ul>
            </li>
            <li>At the top right corner is the add cards button.
              <ul>
                <li>Clicking on this card will render a popup with the option to select a category from the ones you have already added, and enter a question and answer.</li>
                <li>Note that these fields are required, so not properly entering values for them will yield a warning.</li>
                <li>If the maximum number of cards allowed has already been reached, then a warning will be displayed and you will not be allowed to add any more cards.</li>
              </ul>
            </li>
            <li>On the top, click add card to display the added card below.
              <ul>
                <li>If the maximum number of categories has been reached, the card will not be able to be added, so you will have to choose another category.</li>
                <li>If a question already exists among your previously added cards, then you will get a warning and will have to change the question.</li>
              </ul>
            </li>
            <li>The cards!
              <ul>
                <li>Once you have added a card, you will be able to see the card with the category, question, and answer.</li>
                <li>If you click the edit button, you will see a popup with your current values, and you can edit them and save the new values.</li>
                <li>You can also delete the cards, which will remove them from view.</li>
              </ul>
            </li>
            <li>Let's play!
              <ul>
                <li>If you have all the cards, click to play the game. This will take you to the jeopardy board.</li>
                <li>If you don't have enough cards, then you will not be able to play the game just yet.</li>
              </ul>
            </li>
        </ol>
        <h4>Playing the Game</h4>
        <ol style={{textAlign: "left"}}>
            <li>The game board will display categories and point values.</li>
            <li>Click on any point value to select a question from that category.</li>
            <li>A popup will appear with the question. Click "Show Answer" to reveal the answer</li>
            <li>Click "Correct" if your answer is correct. The score will be updated.</li>
            <li>Click "Incorrect", which will allow you to proceed in the game without adding to the score.</li>
            <li>Questions that have been clicked will be a different color. But you can stll go back to them and update score if you get them correct.</li>
        </ol>
        
    </div>
  )
}

export default Help

import React, { useState, useEffect } from 'react'
import "./card.css"
import "./deck.css"
import "../../App.css"
import { BsFillTrashFill, BsFillCheckCircleFill } from "react-icons/bs";
import { LuEdit } from "react-icons/lu";
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai";
import axios from 'axios';


const CardsDeck = () => {

  // Render added categories and cards
  useEffect(() => {
    getCategories();
    getCards();
  }, [])

  // Cards we have so far
  const [currentCards, setCurrentCards] = useState([]);

  // Fetch all added cards for display
  const getCards = async () => {
    try {
      // Get cards from Database and set it to a local deck
      const allCards = await axios.get(`http://localhost:8800/trivia`);
      setCurrentCards(allCards.data.message);
      console.log("Current Cards:", allCards.data.message);
    } catch(error) {
      // Handle error
      console.error("Error fetching cards", error);
    }
  }

  // Categories we have so far
  const [currentCategories, setCurrentCategories] = useState([])

  // New category to be added
  const [addCategory, setAddCategory] = useState("");

  // Fetch all added categories for display
  const getCategories = async () => {
    try {
      // get database values
      const allCategories = await axios.get(`http://localhost:8800/categories`);
      setCurrentCategories(allCategories.data.message);
      console.log("current categories:", currentCategories);
    } catch(error) {
      // Handle error
      console.error("Error fetching categories", error);
    }
  }

  // Trivia Card Features
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [currId, setCurrId] = useState("");

  // Display modes: "edit" to edit existing cards, "add" to create a new card, 
    // "view" to view card without editing it, and "category" to add a category
  const [mode, setMode] = useState("");


  // CATEGORY RENDERING --------------------------------------------------------------------------

  // Function to add category once the category is created
  const addNewCategory = async (e) => {
    // prevents event from stopping for any reason 
    e.preventDefault();
    console.log("Category to Add:", addCategory)

    // Handle duplicate category
    if (currentCategories.find(currCategories => currCategories.value !== "" && currCategories.value === addCategory)){
      window.alert("Duplicate category! Please add a unique category.");
      return;
    }

    // Check if all fields are filled
    if (!addCategory) {
      window.alert("Please fill in all the required fields.");
      return;
    }

    try {
      // Add category to database
      const addedCategory = await axios.post('http://localhost:8800/categories/new/', {
        label: addCategory,
        value: addCategory,
      })
      // Update local cards
      setCurrentCategories([...currentCategories, addedCategory.data.message]);
      // Handle success 
      console.log("New category added successfully!", addedCategory.data.message);
    } catch(error) {
      // Handle error
      console.error("Error adding new category", error);
    }
    // Move out of adding mode
    setMode("view");
    // Reset fields
    setAddCategory("");
  }

  // Function to delete category
  const deleteCategory = async (id) => {
    try {
        // Delete specific category
        const currCategory = await axios.delete(`http://localhost:8800/categories/delete/${id}`)
        console.log("Category deleted successfully!");
        // Remove deleted categories from UI
        setCurrentCategories(currCategories => currCategories.filter(currCategories => currCategories._id !== currCategory._id));
        // Rerender
        getCategories(); 
        setMode("view");
    } catch(error) {
      // Handle error
      console.error("Error deleting category", error);
    }
    // Reset fields
    setCategory("");
    setAddCategory("");
  }

  // CARD RENDERING --------------------------------------------------------------------------

  // Function to add categories based on dropdown selection
  const handleCategoryChange = (e) => {
    console.log("e.target.value:", e.target.value)
    setCategory(e.target.value)
    console.log("category:", category)
  }
  
  // Function to add cards, once the card is created / all fields are inputted
  const addCard = async (e) => {
    // prevents event from stopping for any reason 
    e.preventDefault();

    console.log("question:", question, "answer:", answer, "category:", category)

    // Handle duplicate question
    if (currentCards.find(cards => cards.question !== "" && cards.question === question)){
      window.alert("Duplicate question! Please add a unique question.");
      return;
    }

    // Check if all fields are filled
    if (!category || !question || !answer) {
      window.alert("Please fill in all the required fields.");
      return;
    }

    try {
      // Add card to database
      const newCard = await axios.post('http://localhost:8800/trivia/new/', {
        category: category,
        question: question,
        answer: answer,
      })
      // Update local cards
      setCurrentCards([...currentCards, newCard.data.message]);
      // Handle success 
      console.log("New card added successfully!", newCard.data);
    } catch(error) {
      // Handle error
      console.error("Error adding new card", error);
    }
    // Once added, change to view mode
    setMode("view");
    // Reset fields
    setCategory("");
    setQuestion("");
    setAnswer("");
  }

  // Save original values to show up when editing card
  const setEditValues = (currentCard) => {
    setMode("edit");
    setCategory(currentCard.category);
    setQuestion(currentCard.question);
    setAnswer(currentCard.answer);
    setCurrId(currentCard._id);
  }

  // Function to edit card - can edit any or all fields
  const editCard = async (id) => {
    console.log("question:", question, "answer:", answer, "category:", category)

    // Handle duplicate question
    if (currentCards.find(cards => cards.question !== "" && cards.question != cards.question && cards.question === question)){
      window.alert("Duplicate question! Please add a unique question.");
      return;
    }

    // Check if all fields are filled
    if (!category || !question || !answer) {
      window.alert("Please fill in all the required fields.");
      return;
    }
    try {
      // Update database with edited value of a specific card
      const currDocument = await axios.put(`http://localhost:8800/trivia/update/${id}`, {
        category: category,
        question: question,
        answer: answer,
      })

      // Make sure card is edited in the frontend
      setCurrentCards((updatedCards) => updatedCards.map((currentCard) => {
        if (currentCard._id === id) {
          currentCard = currDocument.data.message;
        }
        return currentCard;
      }))

      // Rerender cardsafter state change
      getCards();

    } catch(error) {
      // Handle error
      console.error("Error updating card", error);
    }
    // reset values
    setMode("view");
    setCategory("");
    setQuestion("");
    setAnswer("");
  }

  // Function to delete card
  const deleteCard = async (id) => {
    try {
        // Delete specific card
        const currDocument = await axios.delete(`http://localhost:8800/trivia/delete/${id}`)
        console.log("Card deleted successfully!");
        // Remove deleted cards from UI
        setCurrentCards(cards => cards.filter(card => card._id !== currDocument._id));
        // Rerender
        getCards(); 
        setMode("view");
    } catch(error) {
      // Handle error
      console.error("Error deleting card", error);
    }
    // Reset fields
    setCategory("");
    setQuestion("");
    setAnswer("");
  }

  
  return (
    <div className='deck'>
      {/* Deck Header - deck name and add card button */}
      <div className="deckHeader">
        <h1>Deck</h1>
        <div className="button1" onClick={() => (setMode("add"))}><AiOutlinePlus />Add Card</div>
      </div>

      { /* Category Selection Section */}
      <div className="categorySelection">
        { /* Category Selection Header */}
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <h4>Category Settings</h4>
          <div className="button3" onClick = {() => setMode("category")}><AiOutlinePlus />Add Category</div>
        </div>      
        {/* Popup to add category */}
        {mode === "category" && <div className='flashcardPopup'>
          <div className="closePopup" onClick={() => setMode("")} ><AiFillCloseCircle style={{color: "gold"}}/></div>
          <h4>Add New Category</h4>
          <form>
            <label><p>New Category</p></label>
            <textArea type="text" placeholder="Add a new, unique category!" onChange={(e) => setAddCategory(e.target.value)} required></textArea>
          </form>
          <div className="card-bottom">
            <div className='button3' type="submit" onClick = {addNewCategory}><BsFillCheckCircleFill />Add!</div>
          </div>
        </div>}
        {/* Display of added categories (with option to delete) */}
        <div className="currentCategories">
          {currentCategories.map((categoryOption) => <div className='button3'><div><BsFillTrashFill style={{cursor:"pointer"}} onClick={() => deleteCategory(categoryOption._id)}/></div>{categoryOption.label}</div>)}
        </div>
        <p>Your board must have {currentCategories.length * currentCategories.length} clues! ({currentCategories.length} per category)</p>
      </div>

      {/* Display of current cards */}
      <h2>Cards</h2>
      <div className="currentCards">
        {/* Render cards added so far in the page in view mode */}
        {currentCards.length > 0 ? currentCards.map(currentCard => (
          <div className='flashcard'>
            <h5>Category: {currentCard.category}</h5>
            <h5>Question: {currentCard.question}</h5>
            <h5>Answer: {currentCard.answer}</h5>
            {/* Delete and edit buttons in bottom of card in view mode */}
            <div className="card-bottom">
              <div className="button2" onClick={() => deleteCard(currentCard._id)}><BsFillTrashFill />Delete</div>
              <div className='button2' onClick={() => setEditValues(currentCard)}><LuEdit />Edit</div>
            </div>
          </div>
        )): (
          <p>You currently have no cards</p>
        )}
      </div>

      {/* Add mode - popup card where user can enter new card information */}
      {(mode === "add") ? (
        <div className='flashcardPopup'>
          <div className="closePopup" onClick={() => setMode("")}><AiFillCloseCircle style={{color: "gold"}}/></div>
          <h4>Add New Question and Answer</h4>
          <p>All fields are required!</p>
          <form>
            <label><p>Category</p></label>
            {/* Display dropdown where user can select category from added options */}
            <select onChange={handleCategoryChange} required> 
              <option value="Select a category">Select a category</option>
              {currentCategories.map((categoryOption) => <option key={categoryOption.label} value={categoryOption.value}>{categoryOption.label}</option>)}
            </select>
            <label><p>Question</p></label>
            <textArea type="text" placeholder="Question in the form of a clue, i.e: This city the capital of the US" onChange={(e) => {setQuestion(e.target.value)}} required></textArea>
            <label><p>Answer</p></label>
            <textArea rows="2" type="text" placeholder="Answer in the form of a question, i.e. What is Washington D.C.?" onChange={(e) => setAnswer(e.target.value)} required></textArea>
          </form>
          {/* Add card button in bottom of card in view mode */}
          <div className="card-bottom">
            <div className='button2' type="submit" onClick = {addCard}><BsFillCheckCircleFill />Add Card!</div>
          </div>
        </div>
      ) : ""}

      {/* Edit mode - where user can update card information */}
      {(mode === "edit") ? (
        <div className='flashcardPopup'>
          <div className="closePopup" onClick={() => setMode("")}><AiFillCloseCircle style={{color: "gold"}}/></div>
          <form >
            <label><p>Category</p></label>
            {/* Display dropdown where user can select category from added options */}
            <select onChange={handleCategoryChange} required> 
              <option value="Select a category">{category}</option>
              {currentCategories.map((categoryOption) => <option key={categoryOption.label} value={categoryOption.value}>{categoryOption.label}</option>)}
            </select>
            <label><p>Question</p></label>
            <textArea type="text" placeholder={question} onChange={(e) => {setQuestion(e.target.value)}}>{question}</textArea>
            <label><p>Answer</p></label>
            <textArea type="text" placeholder={answer} onChange={(e) => {setAnswer(e.target.value)}}>{answer}</textArea>
          </form>
          {/* Delete and save buttons in bottom of card in edit mode */}
          <div className="card-bottom">
            <div className="button2" onClick = {() => deleteCard(currId)}><BsFillTrashFill />Delete</div>
            <div className='button2' type="submit" onClick = {() => editCard(currId)}><BsFillCheckCircleFill />Save Changes</div>
          </div>
        </div>
      ) : ""}
    </div>
  )
}

export default CardsDeck
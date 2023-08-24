require("dotenv").config();

// initialize server and database
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

// initializes instance of an Express application
const app = express();
app.use(cors());
// adds middleware to Express application to parse incoming JSON data in requests
app.use(express.json());

// connect to database
mongoose.connect("mongodb://127.0.0.1:27017/jeopardy-game", { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})
    .then(() => console.log("connected to database!"))
    .catch(console.error);

const Trivia = require("./models/Trivia");

// requests

// get: display question on popup
app.get("/trivia", async (req, res) => {
    try {
        const trivia = await Trivia.find();
        res.json({message: trivia});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// get: one question
app.get("/trivia/one/:id", async (req, res) => {
    try {
        const currId = req.params.id;
        const trivia = await Trivia.findById(currId);
        res.json({message: trivia});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// post: add new question to deck
app.post("/trivia/new/", async (req, res) => {
    try {
        const trivia = new Trivia({
            category: req.body.category,
            question: req.body.question,
            answer: req.body.answer,
        })
        await trivia.save();
        res.json({message: trivia});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// put: edit question in deck
app.put("/trivia/update/:id", async (req, res) => {
    try {
        const trivia = await Trivia.findByIdAndUpdate(
            req.params.id,
            {
                category: req.body.category,
                question: req.body.question,
                answer: req.body.answer
            }
        );
        res.json({message: trivia});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// delete: remove question from deck
app.delete("/trivia/delete/:id", async (req, res) => {
    try {
        const trivia = await Trivia.findByIdAndDelete(req.params.id);
        if (!trivia) {
            res.status(500).json( {error: "Error: question not found, so it can't be deleted"} );
        }
        res.status(200).json({ message: "Trivia deleted successfully." });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// run database
app.listen(8800, ()=>{
    console.log("backend is running!")
})
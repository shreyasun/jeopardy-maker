// database setup for each trivia question
const mongoose = require("mongoose");

const TriviaSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Trivia', TriviaSchema);
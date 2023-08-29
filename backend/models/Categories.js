// database setup for categories
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Categories', CategorySchema);
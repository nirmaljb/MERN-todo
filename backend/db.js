const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/todoApp')


const schema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    completed: Boolean,
})

const Todo = mongoose.model('todos', schema)

module.exports = Todo
const express = require('express')
const { inputMiddleWare, idMiddleWare } = require("./middlewares/inputValidation")
const Todo = require('./db')
const cors = require('cors')
const app = express()

const PORT = 3000
app.use(express.json())
app.use(cors())

// let todos = []

app.get('/todos', async (req, res) => {
    const todos = await Todo.find({})

    res.json(todos)
})

app.post('/todo', inputMiddleWare, async (req, res) => {
    const id = parseFloat((Math.random() * 100).toFixed(4))
    const { title, description } = req.body
    
    // todos.push({id, title, description})
    const todo = new Todo({
        id: id,
        title: title,
        description: description,
        completed: false,
    })

    await todo.save()
    
    res.json({
        msg: 'Item added'
    })
})

app.put('/:id', idMiddleWare, async (req, res) => {
    const id = parseFloat(req.params.id)
    const { title, description } = req.body
    
    const completed = req.body.completed || false
    
    const response = await Todo.findOneAndUpdate({id: id}, 
    {
            title: title,
            description: description,
            completed: completed 

    })

    if(!response) {
        return res.json({
            msg: 'No todo with that ID'
        })
    }

    res.json({
        msg: 'updated the todo'
    })
})

app.delete('/:id', idMiddleWare, async (req, res) => {
    const id = parseFloat(req.params.id)

    const response = await Todo.findOneAndDelete({ id })
    
    if(!response) {
        return res.json({
            msg: 'No todo with that ID'
        })
    }

    res.json({
        msg: 'todo removed'
    })
})

app.use((req, res, next) => {
    res.status(404).json({msg:'404 Not Found'});
});

app.use((err, req, res, next) => {
    console.log(err)
    res.status(404).json({msg:'Internal Server Error'})
})

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})
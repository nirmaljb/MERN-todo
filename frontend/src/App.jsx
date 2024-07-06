import { useState, useEffect } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'


function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let ignore = false
    fetch('http://localhost:3000/todos')
    .then(async (res) => {
      const response = await res.json()
      if(!ignore) {
        setTodos(response)
      }
    })
    return () => {
      ignore = true
    }
  }, todos)

  return (
    <div>
      <CreateTodo />
      <Todos todos={todos}/>
    </div>
  )}

export default App

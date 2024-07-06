import { useState } from 'react'
export function CreateTodo() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return <div>
        title: <input id="title" type="text" onChange={(e) => {
            const value = e.target.value
            // console.log(value)
            setTitle(value)
        }}/>
        <br></br>
        description: <input id="description" type="text" onChange={(e) => {
            const value = e.target.value
            // console.log(value)
            setDescription(value)
        }}/>
        <br></br>
        <button onClick={() => {
            fetch("http://localhost:3000/todo", {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    description: description,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(async (res) => {
              const response = await res.json()
              console.log(response)
            })
        }}>Add+</button>
    </div>
}
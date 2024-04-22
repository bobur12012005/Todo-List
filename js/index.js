import { reloadTodos } from "./ui.js"

let container = document.querySelector('.todo-place')
let form = document.forms.namedItem('todo')
export let baseURL = 'http://localhost:8080'

export function getData() {
    fetch(baseURL + "/todos")
        .then(response => response.json())
        .then(response => reloadTodos(response, container))
}
getData()

form.onsubmit = (event) => {
    event.preventDefault()

    let task = {
        id: String(Math.random()),
        title: new FormData(event.target).get('task'),
        time: new Date().toLocaleTimeString() + ' / ' + new Date().toLocaleDateString(),
        editTime: 'Not given',
        status: false
    }

    if (task.title.length === 0) return

    let configuration = {
        method: "post",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(baseURL + "/todos", configuration)
        .then(response => {
            if (response.status === 200 || response.status === 201) getData()      
    })

    form.reset()
}
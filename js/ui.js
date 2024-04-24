import { baseURL, getData } from "./index.js"

let modal = document.querySelector('#modal')
modal.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'
    }
}

export function reloadTodos(arr, place) {
    place.innerHTML = ""
    let nmbr = 1

    for (let item of arr) {
        let todoRow = document.createElement('div')
        let taskNumber = document.createElement('strong')
        let taskText = document.createElement('span')
        let taskTime = document.createElement('span')
        let taskDeleteButton = document.createElement('button')
        let taskDeleteIcon = document.createElement('img')
        let taskChangeButton = document.createElement('button')
        let taskChangeIcon = document.createElement('img')

        todoRow.classList.add('todoRow')
        taskNumber.classList.add('taskNumber')
        taskText.classList.add('taskText')
        taskTime.classList.add('taskTime')
        taskDeleteButton.classList.add('taskDeleteButton')
        taskDeleteIcon.classList.add('taskDeleteIcon')
        taskChangeButton.classList.add('taskChangeButton')
        taskChangeIcon.classList.add('taskChangeIcon')

        taskNumber.innerHTML = nmbr++
        taskText.innerHTML = item.title
        taskTime.innerHTML = item.time
        taskDeleteIcon.src = './icons/delete.png'
        taskChangeIcon.src = './icons/edit.png'

        place.append(todoRow)
        todoRow.append(taskNumber, taskText, taskTime, taskDeleteButton, taskChangeButton)
        taskDeleteButton.append(taskDeleteIcon)
        taskChangeButton.append(taskChangeIcon)

        taskDeleteButton.onclick = () => {
            let configuration = {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                }
            }

            fetch(baseURL + "/todos/" + item.id, configuration)
                .then(response => {
                    if (response.status === 200 || response.status === 201) getData()
                })
        }

        taskChangeButton.onclick = () => {
            modal.style.display = 'flex'
            let editer = document.querySelector('.editBox input')
            let editerAdmit = document.querySelector('.editBox button')

            editerAdmit.onclick = () => {
                if (editer.value !== '') {
                    let editedTask = {
                        id: item.id,
                        title: editer.value,
                        time: item.time,
                        editTime: new Date().toLocaleTimeString() + ' / ' + new Date().toLocaleDateString(),
                        status: item.status
                    }

                    let configuration = {
                        method: "put",
                        body: JSON.stringify(editedTask),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }

                    fetch(baseURL + "/todos/" + item.id, configuration)
                        .then(response => {
                            if (response.status === 200 || response.status === 201) {
                                getData()
                                modal.style.display = 'none'
                            }
                        })
                }
            }
        }
    }
}
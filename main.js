const addTaskBtn = document.getElementById('btn')
const inputTask = document.getElementById('space__enter')
const todosWrapper = document.querySelector('.task__wrapper')

 let tasks = []

 let todosItems = []

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

function Task(description){
    this.description = description
    this.completed = false
 }


const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

 addTaskBtn.onclick = () => {
     if(inputTask.value != ""){tasks.push(new Task(inputTask.value))
        updateLocal()
        fillHtmlList()
        inputTask.value = ""}
 }

 const createTemplate = (task,index) => {
    return `
    <div class="todo-item" ${task.completed ? 'active' : ''}>
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input onclick = "completeTask(${index})" type="checkbox" class="btn-complete" ${task.completed ? 'checked' : ''}>
                    <button onclick = "deleteTask(${index})"" class="btn-delete"><img src="/images/delete.svg" alt=""></button>
                </div>
            </div>
    `
    
 }

 const fillHtmlList = () => {
     todosWrapper.innerHTML = ""
     if(tasks.length > 0 ){
         tasks.forEach((item, index) =>{
            todosWrapper.innerHTML += createTemplate(item,index)
         })
         todosItems = document.querySelectorAll('.todo-item')
     }  
 }
 updateLocal()
 fillHtmlList()

 const updatePage = () => {
     updateLocal()
     fillHtmlList()
 }

 const completeTask = index => {
     tasks[index].completed = !tasks[index].completed
     if(tasks[index].completed){
        todosItems[index].classList.add('active')
     }else{
        todosItems[index].classList.remove('active')
     }
     updateLocal()
 }

 const deleteTask = index => {
     tasks.splice(index, 1)
     updatePage()
 }
const addTaskBtn = document.getElementById('btn')
const inputTask = document.getElementById('space__enter')
const todosWrapper = document.querySelector('.task__wrapper')
const todosWrapperComplete = document.querySelector('.completed__wrapper')
const lineWrap = document.getElementById('line')

 let tasks = []

 let todosItems = []

 let completeTasks = []

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))
!localStorage.completeTasks ? completeTasks = [] : completeTasks = JSON.parse(localStorage.getItem('completeTasks'))

function Task(description){
    this.description = description
    this.completed = false
 }

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('completeTaks', JSON.stringify(completeTasks))
}

 addTaskBtn.onclick = () => {
     if(inputTask.value != ""){tasks.push(new Task(inputTask.value))
        updateLocal()
        fillHtmlList()
        inputTask.value = ""}
 }

 const createTemplate = (task,index) => {
    return `
    <div class="todo-item ${task.completed ? 'active' : ''}"  >
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
     todosWrapperComplete.innerHTML = ""
     if(tasks.length > 0 ){
         tasks.forEach((item, index) =>{
             tasks[index].completed ? todosWrapperComplete.innerHTML += createTemplate(item,index):todosWrapper.innerHTML += createTemplate(item,index)
         })
         todosItems = document.querySelectorAll('.todo-item')
         if(todosWrapperComplete.innerHTML != "" && todosWrapper.innerHTML != ""){
             todosWrapperComplete.innerHTML += `
             <div class="completed__wrapper">
            <div class="line-arrow"id="line">
                <div class="line" ></div>
            </div>
        </div>`
             lineWrap.classList.add('flexx')
         }else{
            lineWrap.classList.remove('flexx') 
         }
     }  
 }
 updateLocal()
 fillHtmlList()

 const updatePage = () => {
     updateLocal()
     fillHtmlList()

    }

   
    
 const completeTask = (index) => {
     tasks[index].completed = !tasks[index].completed
     if(tasks[index].completed){
        todosItems[index].classList.add('active')
        
     }else{
        todosItems[index].classList.remove('active')
     }
     updatePage()
 }

 const deleteTask = index => {
     if(tasks[index].completed){
        todosItems[index].classList.add('deletedCompleted')
     }else{
        todosItems[index].classList.add('deleted')
     }
    setTimeout(( ) => {
       tasks.splice(index, 1)
     updatePage() 
    } , 300) 
    
 }
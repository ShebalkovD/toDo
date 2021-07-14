const taskBtn = document.getElementById('btn');
const inputText = document.getElementById('space__enter');
const taskWrapper = document.getElementById('task__wrapper')

let todosItems = [];

let tasks = [];

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

function Task(description){
    this.description = description,
    this.completed = false
}

const createTemplate = (task, index) => {
    return `
    <div class="todo-item">
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input onclick = "completeTask(${index})" type="checkbox" class="btn-complete">
                    <button onclick = "deleteTask(${index})"" class="btn-delete"><img src="/images/delete.svg" alt=""></button>
                </div>
            </div>
    `
   
}

const fillHtmlList = () => {
    taskWrapper.innerHTML = "";
    if(tasks.length > 0) {
        tasks.forEach((item, index) =>{
            taskWrapper.innerHTML += createTemplate(item, index);
        });
       todosItems = document.querySelectorAll('.todo-item') 
       
    }
    inputText.value = "";
}

fillHtmlList()

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


taskBtn.onclick = () => {
    tasks.push(new Task(inputText.value));
    updateLocal();
    fillHtmlList();
    
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        todosItems[index].classList.add('active');
        document.querySelector('.btn-complete').innerHTML = '<img src="/images/checked.svg" alt="">'
    }else{
        todosItems[index].classList.remove('active');
        document.querySelector('.btn-complete').innerHTML = ''
    }
    updateLocal();
    
}

const deleteTask = index => {
    todosItems[index].classList.add('deleted')
    setTimeout(() => {
        tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
    }, 100 )
}


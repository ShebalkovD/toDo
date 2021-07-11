const taskBtn = document.getElementById('btn');
const inputText = document.getElementById('space__enter');
const taskWrapper = document.getElementById('task__wrapper')


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
                <input type="checkbox" class="btn-complete">
                <button class="btn__delete">delete</button>
            </div>
        </div>
    `
}

const fillHtmlList = () => {
    taskWrapper.innerHTML = "";
    if(tasks.length > 0) {
        tasks.forEach((item, index) =>{
            taskWrapper.innerHTML += createTemplate(item, index);
        })
    }
}


const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


taskBtn.onclick = () => {
    tasks.push(new Task(inputText.value));
    updateLocal();
    fillHtmlList()
    
}


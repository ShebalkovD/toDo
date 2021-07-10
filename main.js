const taskBtn = document.getElementById('btn');
const inputText = document.getElementById('space__enter');
const taskWrapper = document.getElementsById('task__wrapper');


let tasks = [];

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

function Task(description){
    this.description = description,
    this.completed = false
}

const fillHtmlList = () => {
    taskWrapper.innerHTML = "";
    if(tasks.length > 0) {
        
    }
}


const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


taskBtn.onclick = () => {
    tasks.push(new Task(inputText.value));
    updateLocal();
    
}
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function updateCounter(){
    counter.innerText = `${tasks.length} Task${tasks.length!==1?"s":""}`;
    emptyMessage.style.display = tasks.length===0 ? "block":"none";
}

function displayTasks(){
    taskList.innerHTML="";
    tasks.forEach((task,index)=>{
        const li=document.createElement("li");
        li.innerHTML=`

        <span class="task ${task.completed?"completed":""}">
        ${task.text}
        </span>

        <div class="icons">
            <i class="fa-solid fa-check"></i>
            <i class="fa-solid fa-trash"></i>
        </div>    `;

        const text=li.querySelector(".task");
        const check=li.querySelector(".fa-check");
        const trash=li.querySelector(".fa-trash");
        text.addEventListener("click",function(){

            tasks[index].completed=!tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        check.addEventListener("click",function(){
            tasks[index].completed=!tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        trash.addEventListener("click",function(){
            tasks.splice(index,1);
            saveTasks();
            displayTasks();
        });
        taskList.appendChild(li);
    });
    updateCounter();
}

function addTask(){
    const text=taskInput.value.trim();
    if(text===""){
        alert("Please enter a task");
        return;
    }
    tasks.push({
        text:text,
        completed:false
    });
    saveTasks();
    displayTasks();
    taskInput.value="";
    taskInput.focus();
}

addBtn.addEventListener("click",addTask);
taskInput.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
        addTask();
    }
});
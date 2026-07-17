let todos = [];
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

addBtn.addEventListener("click", addTodo);

input.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        addTodo();
    }
});

function addTodo(){

    const text = input.value.trim();

    if(text==="") return;

    const todo = {

        id: Date.now(),

        text: text,

        done:false

    };

    todos.push(todo);

    saveTodos();

    createTodo(todo);

    input.value="";
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {

    const data = localStorage.getItem("todos");

    if(data){

        todos = JSON.parse(data);

        todos.forEach(todo=>{
            createTodo(todo);
        });

    }

}

function createTodo(todo){

    const li = document.createElement("li");

    const span = document.createElement("span");

    span.textContent = todo.text;

    if(todo.done){
        span.classList.add("done");
    }

    span.onclick = function(){

        todo.done = !todo.done;

        span.classList.toggle("done");

        saveTodos();

    }

    const del = document.createElement("button");

    del.innerHTML="🗑️";

    del.className="delete";

    del.onclick=function(){

        todos = todos.filter(t=>t.id!==todo.id);

        saveTodos();

        li.remove();

    }

    li.appendChild(span);

    li.appendChild(del);

    list.appendChild(li);

}

function updateStats(){

    const total = todos.length;

    const done = todos.filter(todo => todo.done).length;

    const left = total - done;

    document.getElementById("totalCount").textContent = total;

    document.getElementById("doneCount").textContent = done;

    document.getElementById("leftCount").textContent = left;

}
loadTodos();

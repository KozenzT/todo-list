let todos = [];
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");
const themeToggle = document.getElementById("themeToggle");

// 1. เช็กก่อนว่ารอบที่แล้วผู้ใช้เปิด Dark Mode ค้างไว้ไหม
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Light Mode";
}

// 2. ดักจับการคลิกที่ปุ่มสลับโหมด
themeToggle.addEventListener("click", () => {
    // สลับคลาส dark-mode (ถ้าไม่มีก็เติม ถ้ามีก็เอาออก)
    document.body.classList.toggle("dark-mode");
    
    // เช็กสถานะปัจจุบันหลังจากกด เพื่อเปลี่ยนข้อความบนปุ่มและบันทึกลง LocalStorage
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
});

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

    updateStats();

    input.value="";

}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
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

        updateStats();

    }

    const del = document.createElement("button");

    del.innerHTML = "🗑️";

    del.className = "delete";

    del.onclick = function(){

        todos = todos.filter(t => t.id !== todo.id);

        saveTodos();

        li.remove();

        updateStats();

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
function loadTodos() {

    const data = localStorage.getItem("todos");

    if(data){

        todos = JSON.parse(data);

        todos.forEach(todo=>{
            createTodo(todo);
        });

    }

    updateStats();

}
loadTodos();

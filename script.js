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

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    span.onclick = function(){
        span.classList.toggle("done");
    }

    const del = document.createElement("button");
    del.textContent="ลบ";
    del.className="delete";

    del.onclick=function(){
        li.remove();
    }

    li.appendChild(span);
    li.appendChild(del);

    list.appendChild(li);

    input.value="";
}

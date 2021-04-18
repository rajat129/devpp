let todoinput = document.querySelector(".todo-input");
let addbutton = document.querySelector(".add-todo");
let todolist = document.querySelector(".todo-list");

function todo(){
    let todo = todoinput.value;
    
    if(todo){

        let listitem = document.createElement("li");
        listitem.classList.add("todo-item");

        let ptag = document.createElement("p");
        ptag.classList.add("todo");
        ptag.innerHTML = todo;

        let delbutton = document.createElement("button");
        delbutton.classList.add("delete-task");
        delbutton.innerHTML = "delete";

        delbutton.addEventListener("click",function(event){
            event.target.parentNode.remove();
        })

        listitem.append(ptag);
        listitem.append(delbutton);
        todolist.append(listitem);
        todoinput.value = "";
    }
}

addbutton.addEventListener("click",function(){
    todo();

});

todoinput.addEventListener("keypress",function(e){
    if(e.key=="Enter"){
        todo();
    }
});

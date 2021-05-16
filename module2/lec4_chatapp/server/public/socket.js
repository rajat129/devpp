let onlinelist = document.querySelector(".online");


socket.emit("userconnected",username);

socket.on("joined",function(userobj){

    let joindiv = document.createElement("div");
    joindiv.classList.add("joined");
    joindiv.classList.add("chat");
    joindiv.innerHTML = `${userobj.username} joined`;
    chatwindow.append(joindiv);

    addtoonlinelist(userobj);

})

function addtoonlinelist(userobj){

    let div = document.createElement("div");
    div.setAttribute("id",userobj.id);
    div.classList.add("other");
    div.innerHTML = `<div class="name">${userobj.username}</div>
    <div class="image">
        <img src="download.png" alt="">
    </div>`;
    onlinelist.append(div);

}

socket.on("left",function(userobj){

    let leftdiv = document.createElement("div");
    leftdiv.classList.add("left");
    leftdiv.classList.add("chat");
    leftdiv.innerHTML = `${userobj.username} left`;
    chatwindow.append(leftdiv);

    deletefromonlinelsit(userobj);

})

function deletefromonlinelsit(userobj){
    document.querySelector(`#${userobj.id}`).remove();
}

socket.on("chat",function(obj){

    let chatdiv = document.createElement("div");
    chatdiv.classList.add("rest");
    chatdiv.classList.add("chat");
    chatdiv.innerHTML = `${obj.username} ${obj.chat}`;
    chatwindow.append(chatdiv);

})

socket.on("online-list",function(userlist){

    for(let i=0;i<userlist.length;i++){
        if(userlist[i].id!=socket.id){

            let div = document.createElement("div");
            div.setAttribute("id",userlist[i].id);
            div.classList.add("other");
            div.innerHTML = `<div class="name">${userlist[i].username}</div>
            <div class="image">
                <img src="download.png" alt="">
            </div>`;
            onlinelist.append(div);

        }
    }

})
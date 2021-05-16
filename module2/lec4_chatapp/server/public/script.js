let input = document.querySelector(".input");
let chatwindow = document.querySelector(".chat-window");
let mydiv = document.querySelector(".me .name");

let username = prompt("enter your name");

mydiv.textContent = username;

input.addEventListener("keypress",function(e){
    // console.log(e);
    if(e.key=="Enter"){
        // console.log(input.value);
        let msgdiv = document.createElement("div");
        msgdiv.classList.add("chat");
        msgdiv.classList.add("my");
        msgdiv.textContent = username+":"+input.value;
        let msg = input.value;

        chatwindow.append(msgdiv);
        socket.emit("leftchat",{username,chat:msg});

        input.value = "";

    }
})
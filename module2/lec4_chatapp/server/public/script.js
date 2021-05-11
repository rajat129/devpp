let input = document.querySelector(".input");
let chatwindow = document.querySelector(".chat-window");

let username = prompt("enter your name");

input.addEventListener("keypress",function(e){
    // console.log(e);
    if(e.key=="Enter"){
        // console.log(input.value);
        let msgdiv = document.createElement("div");
        msgdiv.classList.add("chat");
        msgdiv.classList.add("my");
        msgdiv.textContent = username+":"+input.value;

        chatwindow.append(msgdiv);

        input.value = "";

    }
})
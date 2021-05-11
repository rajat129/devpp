let input = document.querySelector(".input");
let chatwindow = document.querySelector(".chat-window");

input.addEventListener("keypress",function(e){
    // console.log(e);
    if(e.key=="Enter"){
        // console.log(input.value);
        let msgdiv = document.createElement("div");
        msgdiv.classList.add("chat");
        msgdiv.classList.add("my");
        msgdiv.textContent = input.value;

        chatwindow.append(msgdiv);

        input.value = "";

    }
})
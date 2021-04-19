let filtercodes = {
    "red" :"#ff4d4d",
    "yellow" : "#ffaf40",
    "green" : "#3ae374",
    "blue" : "#7158e2"
}

let allfilter = document.querySelectorAll(".ticket-filter div");
let ticketcontainer = document.querySelector(".ticket-container");
let addticket = document.querySelector(".open-model");
let selectedfilter = "blue";

addticket.addEventListener("click",openmodal);

function openmodal(){

    let modal = document.querySelector(".modal");
    if(modal){
        return;
    }

    let modaldiv = document.createElement("div");
    modaldiv.classList.add("modal");

    modaldiv.innerHTML = `<div class="modal-content" contenteditable="true">
    Enter your text here
</div>
<div class="modal-options">
    <div class="modal-filter red"></div>
    <div class="modal-filter yellow"></div>
    <div class="modal-filter green"></div>
    <div class="modal-filter blue active"></div>
</div>`

    
    ticketcontainer.append(modaldiv);
    let allfilter = document.querySelectorAll(".modal-filter");
    for(let i=0;i<allfilter.length;i++){
        allfilter[i].addEventListener("click",chosemodalfilter);
    }
    document.querySelector(".modal-content").addEventListener("click",handlemodalbox);
    modaldiv.addEventListener("keypress",getticket);

}

function chosemodalfilter(e){
    let selectedmodalfilter = e.target.classList[1];
    
    if(selectedmodalfilter==selectedfilter){
        return;
    }
    selectedfilter = selectedmodalfilter;
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    
}

function getticket(e){

    if(e.key=="Enter"){

        let modaltext = e.target.textContent;

        let ticketdiv = document.createElement("div");
        ticketdiv.classList.add("ticket");
        ticketdiv.innerHTML = `<div class="ticket-filterbar ${selectedfilter}"></div>
        <div class="ticket-id">#exampleid</div>
        <div class="ticket-content">${modaltext}</div>`
        ticketcontainer.append(ticketdiv);
        e.target.parentNode.remove();

        selectedfilter = "blue";
    }

}

function handlemodalbox(e){

    if(e.target.getAttribute("data-typed")=="true"){
        return;
    }
    e.target.innerHTML = "";
    e.target.setAttribute("data-typed","true");

}

for(let i=0;i<allfilter.length;i++){
    allfilter[i].addEventListener("click",choosefilter);
}

function choosefilter(e){
    console.log(e);
    let filter = e.target.classList[1];

    let filtercode = filtercodes[filter];
    console.log(filtercode);

    ticketcontainer.style.background = filtercode;
}
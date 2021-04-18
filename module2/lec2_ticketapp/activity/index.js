let filtercodes = {
    "red" :"#ff4d4d",
    "yellow" : "#ffaf40",
    "green" : "#3ae374",
    "blue" : "#7158e2"
}

let allfilter = document.querySelectorAll(".ticket-filter div");
let ticketcontainer = document.querySelector(".ticket-container");

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
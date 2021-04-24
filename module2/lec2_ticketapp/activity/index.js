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

document.querySelector(".close-modal").addEventListener("click",closemodalbox);

function closemodalbox(e){

    if(document.querySelector(".modal")){
        document.querySelector(".modal").remove();
    }

}

function loadticket(){
    if(localStorage.getItem("alltickets")){
        ticketcontainer.innerHTML = "";
        let alltickets = JSON.parse(localStorage.getItem("alltickets"));
    
        for(let i=0;i<alltickets.length;i++){
            let {ticketfilter,ticketid,tickettext} = alltickets[i];
            let ticketdiv = document.createElement("div");
            ticketdiv.classList.add("ticket");
            ticketdiv.innerHTML = `<div class="ticket-filterbar ${ticketfilter}"></div>
            <div class="ticket-info">
            <div class="ticket-id">${ticketid}</div>
            <div class="delete-ticket">
            <i class="fas fa-trash-alt" id="${ticketid}"></i>
            </div>
            </div>
            <div class="ticket-content">${tickettext}</div>`
            ticketcontainer.append(ticketdiv);
            ticketdiv.querySelector(".delete-ticket i").addEventListener("click",deleteticket);
            ticketdiv.querySelector(".ticket-filterbar").addEventListener("click",togglefilterbar);
        }
        
        
    }
}
loadticket();

function togglefilterbar(e){

    filter = ["red","yellow","green","blue"];
    let curfilter = e.target.classList[1];
    let idx = filter.indexOf(curfilter);
    idx++;
    idx = idx%4;

    let curticket = e.target;
    curticket.classList.remove(curfilter);
    curticket.classList.add(filter[idx]);

    let alltickets = JSON.parse(localStorage.getItem("alltickets"));
    let id = curticket.nextElementSibling.children[0].textContent;

    for(let i=0;i<alltickets.length;i++){
        if(alltickets[i].ticketid==id){
            alltickets[i].ticketfilter = filter[idx];
            break;
        }
    }

    localStorage.setItem("alltickets",JSON.stringify(alltickets));

}

function deleteticket(e){

    let delid = e.target.id;
    let alltickets = JSON.parse(localStorage.getItem("alltickets"));
    let filteredtickets = alltickets.filter(function(temp){
        return temp.ticketid!=delid;
    });

    localStorage.setItem("alltickets",JSON.stringify(filteredtickets));
    loadticket();
}

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
    document.querySelector(".modal-filter.active").classList.remove("active");
    e.target.classList.add("active");
    
}

function getticket(e){

    if(e.key=="Enter"){

        let modaltext = e.target.textContent;
        let id = uid();

        let ticketdiv = document.createElement("div");
        ticketdiv.classList.add("ticket");
        ticketdiv.innerHTML = `<div class="ticket-filterbar ${selectedfilter}"></div>
        <div class="ticket-info">
            <div class="ticket-id">${id}</div>
            <div class="delete-ticket">
            <i class="fas fa-trash-alt" id="${id}"></i>
            </div>
            </div>
        <div class="ticket-content">${modaltext}</div>`
        ticketcontainer.append(ticketdiv);
        e.target.parentNode.remove();
        ticketdiv.querySelector(".delete-ticket i").addEventListener("click",deleteticket);
        ticketdiv.querySelector(".ticket-filterbar").addEventListener("click",togglefilterbar);


        if(!localStorage.getItem("alltickets")){

            let alltickets = [];
            let ticketobj = {};
            ticketobj.ticketfilter = selectedfilter;
            ticketobj.ticketid = id;
            ticketobj.tickettext = modaltext;

            alltickets.push(ticketobj);
            localStorage.setItem("alltickets",JSON.stringify(alltickets));

        }else{

            let alltickets = JSON.parse(localStorage.getItem("alltickets"));
            let ticketobj = {};
            ticketobj.ticketfilter = selectedfilter;
            ticketobj.ticketid = id;
            ticketobj.tickettext = modaltext;

            alltickets.push(ticketobj);
            localStorage.setItem("alltickets",JSON.stringify(alltickets));

        }

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
    // console.log(e);
    if(e.target.classList.contains("active")){
        e.target.classList.remove("active");
        loadticket();
        return;
    }

    if(document.querySelector(".filter.active")){
        document.querySelector(".filter.active").classList.remove("active");
    }
    e.target.classList.add("active");
    let filter = e.target.classList[1];

    
    loadselectedtickets(filter);

    // ticketcontainer.style.background = filtercode;
}

function loadselectedtickets(filter){

    ticketcontainer.innerHTML = "";
    let alltickets = JSON.parse(localStorage.getItem("alltickets"));

    console.log(alltickets);
    console.log(filter);
    let filteredtickets = alltickets.filter(function(temp){
        return temp.ticketfilter == filter;
    });

    console.log(filteredtickets)

    for(let i=0;i<filteredtickets.length;i++){
        let {ticketfilter,ticketid,tickettext} = filteredtickets[i];
        let ticketdiv = document.createElement("div");
        ticketdiv.classList.add("ticket");
        ticketdiv.innerHTML = `<div class="ticket-filterbar ${ticketfilter}"></div>
        <div class="ticket-info">
            <div class="ticket-id">${ticketid}</div>
            <div class="delete-ticket">
            <i class="fas fa-trash-alt" id="${ticketid}"></i>
            </div>
        </div>
        <div class="ticket-content">${tickettext}</div>`
        ticketcontainer.append(ticketdiv);
        ticketdiv.querySelector(".delete-ticket i").addEventListener("click",deleteticket);
        ticketdiv.querySelector(".ticket-filterbar").addEventListener("click",togglefilterbar);

    }

}
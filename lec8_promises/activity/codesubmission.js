const puppeteer = require("puppeteer");
const id="Rajatmittal129";
const pas = "129rajatmittal";
let tab;

let opentab = puppeteer.launch({headless : false, defaultViewport: null , args:["--start-maximized"]});

opentab.then(function(browser){

    let allpages = browser.pages();
    return allpages;

})
.then(function(page){
    
    tab = page[0];
    let pageopen = tab.goto("https://www.hackerrank.com/auth/login");
    return pageopen;

})
.then(function(){
    
    let idtyped = tab.type("#input-1",id);
    return idtyped;

})
.then(function(){

    let passtyped = tab.type("#input-2",pas);
    return passtyped;

})
.then(function(){
    let loginclick = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginclick;
})
.catch(function(error){
    console.log(error);
})
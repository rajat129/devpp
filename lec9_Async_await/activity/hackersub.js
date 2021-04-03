const puppeteer = require("puppeteer");
const id="vipoje2768@bsmitao.com";
const pas = "123456";
let tab;
const challanges = require("./challanges");

(async function(){

    let browser = await puppeteer.launch({headless : false, defaultViewport: null , args:["--start-maximized"]});
    let allpages = await browser.pages();
    tab = allpages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2",pas);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector(".username.text-ellipsis",{visible:true});
    await tab.click(".username.text-ellipsis");
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]',{visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav a",{visible:true});
    let allatags = await tab.$$(".nav-tabs.nav.admin-tabbed-nav a");
    let managechallangetag = allatags[1];
    await managechallangetag.click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right",{visible:true});
    
    let createchallangebtn = await tab.$(".btn.btn-green.backbone.pull-right");
    let link = await tab.evaluate(function(elem){
        return elem.getAttribute("href");
    },createchallangebtn)

    completelink = "https://www.hackerrank.com"+link;
    await browser.newPage();
    // await addchallange(completelink,challanges[0],browser);

})();

async function addchallange(completelink,challange,browser){

    let newtab = await browser.newPage();
    // await newtab.goto(completelink);
}
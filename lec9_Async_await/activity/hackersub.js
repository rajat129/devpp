const puppeteer = require("puppeteer");
const id="vipoje2768@bsmitao.com";
const pas = "123456";
// let tab;
const challanges = require("./challanges");

(async function(){

    let browser = await puppeteer.launch({headless : false, defaultViewport: null , args:["--start-maximized"]});
    let allpages = await browser.pages();
    let tab = allpages[0];
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

    for(let i=0;i<challanges.length;i++){
        addchallange(completelink,challanges[i],browser);
        await tab.waitForTimeout(3000);
    }

    

})();


async function addchallange(completelink,challange,browser){

    let newtab = await browser.newPage();
    await newtab.goto(completelink);

    let name = challange["Challenge Name"];
    let desc = challange["Description"];
    let problem = challange["Problem Statement"];
    let input = challange["Input Format"];
    let constraints = challange["Constraints"];
    let output = challange["Output Format"];
    let tags = challange["Tags"];

    
    await newtab.waitForSelector("#name",{visible:true});
    await newtab.type("#name",name);
    await newtab.type("#preview",desc);
    await newtab.type('#problem_statement-container .CodeMirror textarea',problem);
    await newtab.type('#input_format-container .CodeMirror textarea',input);
    await newtab.type('#constraints-container .CodeMirror textarea',constraints);
    await newtab.type('#output_format-container .CodeMirror textarea',output);
    await newtab.type("#tags_tag",tags);
    await newtab.keyboard.press("Enter");
    await newtab.click('.save-challenge.btn.btn-green');
    await newtab.close();


}
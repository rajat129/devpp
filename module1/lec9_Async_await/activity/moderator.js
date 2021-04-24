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

    await allchallanges(browser,tab);
    

})();

async function allchallanges(browser,tab){

    await tab.waitForSelector(".backbone.block-center");

    let challangetag =await tab.$$(".backbone.block-center");

    let alllinks = [];
    for(let i=0;i<challangetag.length;i++){
        let link = await tab.evaluate(function(elem){
            return elem.getAttribute("href"); 
        },challangetag[i]);
        alllinks.push("https://www.hackerrank.com"+link);
    }

    let allmodaddpromise = [];

    for(let i=0;i<alllinks.length;i++){
        let modpromise = moderatorpg(browser,alllinks[i]);
        allmodaddpromise.push(modpromise);
    }

    await Promise.all(allmodaddpromise);
    let alllis = await tab.$$('.pagination li');
    let nextbtnli = alllis[alllis.length-2];
    let isdisabled = await tab.evaluate(function(elem){
        return elem.classList.contains("disabled");
    },nextbtnli);
    if(isdisabled){
        return;
    }else{
        await nextbtnli.click();
        await allchallanges(browser,tab);
    }



}

async function moderatorpg(browser,link){
    let newtab = await browser.newPage();
    await newtab.goto(link);
    await newtab.waitForSelector('li[data-tab="moderators"]');
    await newtab.waitForTimeout(3000);
    await newtab.click('li[data-tab="moderators"]');
    await newtab.waitForSelector('#moderator');
    await newtab.type('#moderator',"rajat mittal");
    await newtab.click(".btn.moderator-save");
    await newtab.click(".save-challenge.btn.btn-green");
    await newtab.close();
}
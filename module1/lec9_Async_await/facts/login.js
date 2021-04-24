const puppeteer = require("puppeteer");
const id="vipoje2768@bsmitao.com";
const pas = "123456";
let tab;

(async function(){

    let browser = await puppeteer.launch({headless : false, defaultViewport: null , args:["--start-maximized"]});
    let allpages = await browser.pages();
    tab = allpages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2",pas);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
})();
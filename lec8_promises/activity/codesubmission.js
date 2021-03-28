const puppeteer = require("puppeteer");
const id="vipoje2768@bsmitao.com";
const pas = "123456";
let tab;
let idx;
let gcode;

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
.then(function(){
    let waitandclickpromise = waitandclick('#base-card-1-link');
    return waitandclickpromise;
})
.then(function(){
    let waitandclickpromise = waitandclick('a[data-attr1="dictionaries-hashmaps"]');
    return waitandclickpromise;
})
.then(function(){
    let waitpromise = tab.waitForSelector('.js-track-click.challenge-list-item',{visible:true});
    return waitpromise;
})
.then(function(){
    let allquesatag = tab.$$('.js-track-click.challenge-list-item');
    return allquesatag;
})
.then(function(allquesatag){
    let alllinkpromise = [];

    for(let i=0;i<allquesatag.length;i++){
        let atag = allquesatag[i];
        let apromise = tab.evaluate(function(elem){
            return elem.getAttribute("href");
        },atag);
        alllinkpromise.push(apromise);
    }

    let sabkapromise = Promise.all(alllinkpromise);
    return sabkapromise;
})
.then(function(alllinks){
    let completelinks = alllinks.map(function(link){
        return "https://www.hackerrank.com"+link
    })

    let onequessolve = solveques(completelinks[0]);
    return onequessolve;
})
.then(function(){
    console.log("inside ip kit");
})
.catch(function(error){
    console.log(error);
})

function waitandclick(selector){
    return new Promise(function(resolve,reject){
        let waitpromise = tab.waitForSelector(selector,{visible:true});
        waitpromise.then(function(){
            let clickpromise = tab.click(selector);
            return clickpromise;
        })
        .then(function(){
            resolve();
        }).catch(function(error){
            reject(error);
        })
    });
}


function getcode(){

    return new Promise(function(resolve,reject){

        let waitpromise = tab.waitForSelector('.hackdown-content h3');
        waitpromise.then(function(){
            
            let codename = tab.$$('.hackdown-content h3');
            return codename;
        })
        .then(function(codename){
            let allname = [];

            for(let i=0;i<codename.length;i++){
                let nametag = codename[i];
                let name = tab.evaluate(function(elem){
                    return elem.textContent;
                },nametag);
                allname.push(name);
            }

            let sabkapromise = Promise.all(allname);
            return sabkapromise;
        })
        .then(function(codename){
            for(let i=0;i<codename.length;i++){
                if(codename[i]=='C++'){
                    idx = i;
                    break;
                }
            }

            let allcodediv = tab.$$(".hackdown-content .highlight");
            return allcodediv;
        })
        .then(function(allcodediv){
            let code = allcodediv[idx];
            let codepromise = tab.evaluate(function(elem){
                return elem.textContent;
            },code);
            return codepromise;
        })
        .then(function(code){
            gcode = code;
            resolve();
        })
        .catch(function(error){
            reject(error);
        })

    })

}

function pastecode(){

    return new Promise(function(resolve,reject){

        let solvepage = tab.click('div[data-attr2="Problem"]');
        solvepage.then(function(){
            let waitandclick = tab.waitForSelector('.custom-input-checkbox',{visible:true});
            return waitandclick;
        })
        .then(function(){
            let clickpromise = tab.click('.custom-input-checkbox');
            return clickpromise;
        })
        .then(function(){
            let waitfortextbox = tab.waitForSelector('.custominput');
            return waitfortextbox;
        })
        .then(function(){
            let codetypepromise = tab.type('.custominput',gcode);
            return codetypepromise;
        })
        .then(function(){
            let controlkeydown = tab.keyboard.down("Control");
            return controlkeydown;
        })
        .then(function(){
            let akeypress = tab.keyboard.press('A');
            return akeypress;
        })
        .then(function(){
            let xkeypress = tab.keyboard.press('X');
            return xkeypress;
        })
        .then(function(){
            let clickoncodebox = tab.click('.monaco-editor.no-user-select.vs');
            return clickoncodebox;
        })
        .then(function(){
            let akeypress = tab.keyboard.press('A');
            return akeypress;
        })
        .then(function(){
            let vkeypress = tab.keyboard.press('V');
            return vkeypress;
        })
        .then(function(){
            let controlkeyup = tab.keyboard.up("Control");
            return controlkeyup;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    })

}


function solveques(link){
    return new Promise(function(resolve,reject){
        let gotopromise = tab.goto(link);

        gotopromise.then(function(){
            let waitandclickpromise = waitandclick('[data-attr2="Editorial"]');
            return waitandclickpromise;
        })
        .then(function(){
            let codepromise = getcode();
            return codepromise;
        })
        .then(function(){
            let pastepromise = pastecode();
            return pastepromise;
        })
        .then(function(){
            let clicksubmit = tab.click(" .pull-right.btn.btn-primary.hr-monaco-submit");
            return clicksubmit;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    })
}






const puppeteer = require("puppeteer");
const id = "kumasanyam122@gmail.com";
const pass = "122kumasanyam";
const user = "sanyam50902420";


(async function(){

    let browser = await puppeteer.launch({headless : false, defaultViewport: null , args:["--start-maximized"]});
    let allpages = await browser.pages();
    let tab = allpages[0];

    //login to twitter

    await tab.goto("https://twitter.com/LOGIN");
    await tab.waitForSelector('[name="session[username_or_email]"]',{visible:true , timeout:8000});
    await tab.type('[name="session[username_or_email]"]',id);
    await tab.type('[name="session[password]"]',pass);
    await tab.click('[data-testid="LoginForm_Login_Button"]'); 

    // await check();

    await tab.waitForSelector('.css-1dbjc4n.r-ymttw5.r-1f1sjgu [name="session[username_or_email]"]',{visible:true , timeout:5000});
    await  tab.type('.css-1dbjc4n.r-ymttw5.r-1f1sjgu [name="session[username_or_email]"]',user);
    await tab.type('.css-1dbjc4n.r-16y2uox.r-1wbh5a2 [name="session[password]"]',pass);
    await tab.click('[data-testid="LoginForm_Login_Button"]');

    let task = process.argv[2];
    
    if(task=="follow"){
        let person = process.argv[3];
        follow(tab,person);
    }else if(task=="tweet"){
        let text = process.argv.slice(3);
        tweet(tab,text);
    }else if(task=="like"){
        let person = process.argv[3];
        like(tab,person);
    }else if(task=="comment"){
        let person = process.argv[3];
        let cmmt = process.argv.slice(4);
        comment(tab,person,cmmt);
    }

})();

function check(tab){
    console.log("geree ia am");
    return new Promise(function(reject,resolve){
        let waitpromise = tab.waitForSelector('.css-1dbjc4n.r-ymttw5.r-1f1sjgu [name="session[username_or_email]"]',{visible:true , timeout:5000});

        waitpromise.then(function(){
            let typepromise = tab.type('.css-1dbjc4n.r-ymttw5.r-1f1sjgu [name="session[username_or_email]"]',user);
            return typepromise;
        })
        .then(function(){
            let typepromise = tab.type('.css-1dbjc4n.r-16y2uox.r-1wbh5a2 [name="session[password]"]',pass);
            return typepromise;
        })
        .then(function(){
            let click = tab.click('[data-testid="LoginForm_Login_Button"]');;
            return click;
        })
        .then(function(){
            resolve();
        })
        .catch(function(){
            resolve();
        })
    }) 
} 

async function tweet(tab,text){

    let content="";

    for(let i=0;i<text.length;i++){
        content=content+text[i]+" ";
        // console.log(text[i]);
    }

    // console.log(content);

    await tab.waitForSelector('.css-1dbjc4n.r-xoduu5.r-xyw6el.r-mk0yit.r-13qz1uu');
    await tab.type('.css-1dbjc4n.r-xoduu5.r-xyw6el.r-mk0yit.r-13qz1uu',content);
    await tab.waitForSelector('[data-testid="tweetButton"]');
    await tab.click('[data-testid="tweetButton"]');

}

async function follow(tab,person){

    await tab.waitForSelector('[enterkeyhint="search"]');
    await tab.type('[enterkeyhint="search"]',person);
    await tab.waitForSelector('[role="listitem"]');
    let alltags = await tab.$$('[role="listitem"]');    
    await alltags[0].click();
    await tab.waitForSelector('.css-1dbjc4n.r-6gpygo.r-bcqeeo',{visible:true, timeout:5000});
    await tab.click('.css-1dbjc4n.r-6gpygo.r-bcqeeo');

}

async function like(tab,person){

    await tab.waitForSelector('[enterkeyhint="search"]');
    await tab.type('[enterkeyhint="search"]',person);
    await tab.waitForSelector('[role="listitem"]');
    let alltags = await tab.$$('[role="listitem"]');    
    await alltags[0].click();
    await tab.waitForTimeout(6000);
    await tab.waitForSelector('[data-testid="like"]');
    let alllike = await tab.$$('[data-testid="like"]');
    await alllike[0].click();

}

async function comment(tab,person,cmmt){

    let content = "";
    for(let i=0;i<cmmt.length;i++){
        content = content + cmmt[i]+" ";
    }

    await tab.waitForSelector('[enterkeyhint="search"]');
    await tab.type('[enterkeyhint="search"]',person);
    await tab.waitForSelector('[role="listitem"]');
    let alltags = await tab.$$('[role="listitem"]');    
    await alltags[0].click();
    await tab.waitForTimeout(2000);
    await tab.waitForSelector('[data-testid="reply"]');
    let alllike = await tab.$$('[data-testid="reply"]');
    await alllike[0].click();   
    await tab.waitForSelector('[data-testid="tweetTextarea_0"]');
    await tab.type('[data-testid="tweetTextarea_0"]',content);
    await tab.click('[data-testid="tweetButton"]');

}

// instructions 

// for tweet = > node twitter.js tweet <message>
// for following a person => node twitter.js follow <completename>
// for likeing a post on someones profile => node twitter.js like <person>
// for commentings on someones post => node twitter.js comment <person> <comment></comment>
const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

function getdata(link,topicname,reponame){

    request(link,function(error,respose,data){
        parsebody(data,topicname,reponame,link);
    });

}

function parsebody(html,topicname,reponame,link){

    let ch = cheerio.load(html);
    let heading = ch(`span[class="js-issue-title markdown-title"]`).text();

    // console.log(heading);
    // console.log(link);

    process(heading,link,topicname,reponame);

}

function checkfile(topicname,reponame){

    let path = `./data/${topicname}/${reponame}/issue.json`;
    return fs.existsSync(path); 

}

function updatefile(heading,link,topicname,reponame){

    let path = `./data/${topicname}/${reponame}/issue.json`;
    let stringifieldfile = fs.readFileSync(path);
    let file = JSON.parse(stringifieldfile);

    let data = {
        head : heading,
        links : link
    }

    file.push(data);
    fs.writeFileSync(path,JSON.stringify(file));
}

function createfile(heading,link,topicname,reponame){

    let path = `./data/${topicname}/${reponame}/issue.json`;

    let file = []
    let data = {
        head : heading,
        links : link
    }

    file.push(data);
    fs.writeFileSync(path,JSON.stringify(file));

}

function process(heading,link,topicname,reponame){

    if(checkfile(topicname,reponame)){
        updatefile(heading,link,topicname,reponame);
    }else{
        createfile(heading,link,topicname,reponame);
    }

}


module.exports = getdata;
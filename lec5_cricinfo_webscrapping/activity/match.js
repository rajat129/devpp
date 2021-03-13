const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

// matchpage("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard");

function matchpage(link){
    request(link,function(error,response,data){
        parsebody(data);
    });
}

function parsebody(data){
    let ch = cheerio.load(data);

    let bothinnings = ch(".match-scorecard-page .Collapsible");

    for(let i=0;i<bothinnings.length;i++){

        let teamnames = ch(bothinnings[i]).find("h5").text();
        let teamname = teamnames.split("INNINGS")[0];
        console.log(teamname);

        let batsmantable = ch(bothinnings[i]).find(".table.batsman");
        let row = ch(batsmantable).find("tbody tr");

        for(let j=0;j<row.length-1;j++){
            let tdata = ch(row[j]).find("td");

            if(tdata.length>1){

                let batsmanname = ch(tdata[0]).text();
                let runs = ch(tdata[2]).text();
                let balls = ch(tdata[3]).text();
                let four = ch(tdata[4]).text();
                let six = ch(tdata[5]).text();
                let strikerate = ch(tdata[6]).text();

                // console.log(batsmanname , runs , balls ,four , six ,strikerate);
                // // console.log(j);

                process(teamname,batsmanname , runs , balls ,four , six ,strikerate);

            }

        }
        // console.log("##############################");

    }
}

function checkteamname(teamname){

    let folderpath = `./ipl/${teamname}`;
    return fs.existsSync(folderpath);

}

function checkplayerfolder(teamname,batsman){

    let folderpath = `./ipl/${teamname}/${batsman}.json`;
    return fs.existsSync(folderpath);

}

function createteam(teamname){

    let folderpath = `./ipl/${teamname}`;
    fs.mkdirSync(folderpath);

}

function createplayer(teamname, batsmanname,runs,balls,four,six,strikerate){

    let path = `./ipl/${teamname}/${batsmanname}.json`;

    let file = [];
    let innings = {
        runs : runs,
        balls : balls,
        four : four,
        six : six,
        strikerate : strikerate
    }

    file.push(innings);
    let stringifieldfile = JSON.stringify(file);
    fs.writeFileSync(path,stringifieldfile);

}

function updateplayer(teamname, batsman,runs,balls,four,six,strikerate){

    let path = `./ipl/${teamname}/${batsman}.json`;
    let stringifieldfile = fs.readFileSync(path);
    let file = JSON.parse(stringifieldfile);

    let innings = {
        runs : runs,
        balls : balls,
        four : four,
        six : six,
        strikerate : strikerate
    }

    file.push(innings);
    fs.writeFileSync(path,JSON.stringify(file));

}

function process(teamname,batsmanname,runs,balls,four,six,strikerate){

    if(checkteamname(teamname)){
        if(checkplayerfolder(teamname , batsmanname)){
            updateplayer(teamname ,batsmanname,runs,balls,four,six,strikerate);
        }else{
            createplayer(teamname ,batsmanname,runs,balls,four,six,strikerate);
        }
    }else{
        createteam(teamname);
        createplayer(teamname,batsmanname,runs,balls,four,six,strikerate);
    }

}

module.exports = matchpage;
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let leaderboard = [];
let count = 0;

function matchpage(link){
    count++;
    request(link,cb);
}

function cb(error,response,data){
    count--;
    parsebody(data);

    if(count==0){
        console.log(leaderboard);
    }
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

                processLeaderboard(teamname,batsmanname , runs , balls ,four , six );

            }

        }
        // console.log("##############################");

    }
}

function processLeaderboard(teamName, batsmanName, runs, balls, fours, sixes) {
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
    if (leaderboard.length) {
      // leaderboard has atleast 1 object
      for (let i = 0; i < leaderboard.length; i++) {
        let obj = leaderboard[i];
        if (obj.Team == teamName && obj.Batsman == batsmanName) {
          obj.Runs += runs;
          obj.Balls += balls;
          obj.Fours += fours;
          obj.Sixes += sixes;
          return;
        }
      }
    }
    // leaderboard is empty
    let obj = {
      Team: teamName,
      Batsman: batsmanName,
      Runs: runs,
      Balls: balls,
      Fours: fours,
      Sixes: sixes,
    };
    leaderboard.push(obj);
}




// when working with json file
// function processleaderboard(teamname,batsmanname,runs,balls,four,six){

//     let leaderboard = JSON.parse(fs.readFileSync("./ipl.json"));
//     runs = Number(runs);
//     balls = Number(balls);
//     four = Number(four);
//     six = Number(six);

//     if(leaderboard.length){

//         for(let i=0;i<leaderboard.length;i++){
//             let obj = leaderboard[i];

//             if(obj.name == batsmanname){
//                 obj.runs += runs;
//                 obj.balls += balls;
//                 obj.four += four;
//                 obj.six += six;
//                 fs.writeFileSync('./ipl.json',JSON.stringify(leaderboard));
//                 return;
//             }

//         }

//     }
    

//         let obj = {
//             team : teamname,
//             name : batsmanname,
//             runs : runs,
//             balls : balls,
//             four : four,
//             six : six 
//         }

//         leaderboard.push(obj);
//         fs.writeFileSync("./ipl.json",JSON.stringify(leaderboard));
    
// }

module.exports = matchpage;
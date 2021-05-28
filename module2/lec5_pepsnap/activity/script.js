let video = document.querySelector("video");
let constrains = {video : true};
let mediarecorder;
let recordeddata;
let recordbtn = document.querySelector(".record-button");
let clickbtn = document.querySelector(".click-button");
let recordingstate = false;
let plus = document.querySelector(".in");
let minus = document.querySelector(".out");

let max = 2;
let min = 1;
let now = 1;

plus.addEventListener("click",function(){
    if(now<max){
        now+=0.1;
        video.style.transform = `scale(${now})`;
    }
});
minus.addEventListener("click",function(){
    if(now>min){
        now-=0.1;
        video.style.transform = `scale(${now})`;
    }
});



(async function(){

    let mediastream = await navigator.mediaDevices.getUserMedia(constrains);
    video.srcObject = mediastream;

    mediarecorder = new MediaRecorder(mediastream);

    mediarecorder.onstop = function(e){
        console.log("on stop");
        // console.log(e);
    }

    mediarecorder.onstart = function(e){
        console.log("on start");
        // console.log(e);
    }

    mediarecorder.ondataavailable = function(e){
        console.log("data recorded");
        recordeddata = e.data;
        savevideotofs();
    }

    recordbtn.addEventListener("click",function(e){
        if(recordingstate==false){
            mediarecorder.start();
            recordbtn.querySelector("div").classList.add("record-animate");
        }else{
            mediarecorder.stop();
            recordbtn.querySelector("div").classList.remove("record-animate");
        }
        recordingstate = !recordingstate;
    })

    clickbtn.addEventListener("click",function(e){
        captureimg();

        clickbtn.querySelector("div").classList.add("click-animate");
        setTimeout(function(){

            clickbtn.querySelector("div").classList.remove("click-animate");
        },1000);
    })

    

})();

function savevideotofs(){
    let videourl = URL.createObjectURL(recordeddata); //create blob object to blob url
    // console.log(videourl);

    let atag = document.createElement("a");
    atag.href = videourl;
    atag.download = "video.mp4";
    // console.log(atag);

    atag.click();
    atag.remove();
}

function captureimg(){

    let canvas = document.createElement("canvas");
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    let ctx = canvas.getContext("2d");

    if(now!=1){
        ctx.translate(canvas.height/2,canvas.width/2);
        ctx.scale(now,now);
        ctx.translate(-canvas.height/2,-canvas.width/2);
    }

    ctx.drawImage(video,0,0);

    let imgurl = canvas.toDataURL("image/jpg");
    let atag = document.createElement("a");
    atag.href = imgurl;
    atag.download = "image.jpg";

    atag.click();

}
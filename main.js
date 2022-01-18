noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX = 0;
difference = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(500,500);

    canvas = createCanvas(550,550);
    canvas.position(560,250);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('poses', gotposes);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized!');
}

function gotposes(results){
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("leftWristX = " + leftWristX + "rightWristX = " + rightWristX +"difference = " + difference);
    }
}

function draw(){
    background("#5bc0de");
    document.getElementById("square_sides").innerHTML = "Width And Height Of A Square Will Be = " + difference + "px";
    fill(0,0,0);
    stroke(255,255,255);
    square(noseX,noseY,difference);
}
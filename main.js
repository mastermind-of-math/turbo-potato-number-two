var img = ""
var statusr = "";
var obj = [];
var list = ["dog and cat", "dog", "cat", "hat", "bat", "day", "tar", "tab", "undefined", "pnuemonoultramicroscopicsilicovolcanoconiosis"]

function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(750, 422);
    canvas.position(325, 150);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("class").innerText = "Status: Detecting Objects"
}

function modelLoaded(){
    console.log("modelLoaded");
    statusr = false;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    statusr = true;
    if(error){
        console.error(error);
    } else {
        console.log(results);
        obj = results;
        obj[0].label = list[0];
    }
}

function draw(){
    image(img, 0, 0, 750, 422);
    noFill();
    if(statusr == true){
        for(i = 0; i < obj.length; i++){
            strokeWeight(15);
            textSize(35)
            percent = Math.floor(obj[i].confidence * 100) + "%";
            stroke((Math.round(Math.random()) * 255), (Math.round(Math.random()) * 255), (Math.round(Math.random()) * 255))
            rect(obj[i].x - 50, obj[i].y - 50, obj[i].width + 100, obj[i].height + 100);
            strokeWeight(1);
            text(obj[i].label + ", " + percent, obj[i].x - 20, obj[i].y);
            document.getElementById("class").innerText = "Status: Object Detected"
        }
    }
}

function mouseClicked(){
    obj[0].label = list[Math.floor(Math.random() * list.length)]
}
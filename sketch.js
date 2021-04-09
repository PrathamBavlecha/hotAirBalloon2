var balloon;
var balloonIMG
var backgroundIMG;
var database;
var positionRef; 
var scaleRef;

function preload(){
  backgroundIMG = loadImage("sprites/cityBackground.png")
  balloonIMG = loadImage("sprites/balloon.png")
}

function readpos(data){
  position = data.val()
  balloon.x = position.x
  balloon.y = position.y
}
function readScale(data){
  scaleA = data.val()
  balloon.scale = scaleA
}

function showError(){
  console.log("Error occured; Try again")
}


function setup() {
  createCanvas(800,500);
  database = firebase.database()
  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage("balloonImage",balloonIMG)
  balloon.scale = 0.5
  positionRef = database.ref('balloon/position').on("value",readpos,showError)
  scaleRef = database.ref('balloon/scale').on("value",readScale,showError)
  
}

function draw() { 
  background(backgroundIMG);  

  if(keyDown(LEFT_ARROW)){
    move(-10,0);
}
else if(keyDown(RIGHT_ARROW)){
    move(10,0);
}
else if(keyDown(UP_ARROW)){
    move(0,-10);
    grow(-0.01)
}
else if(keyDown(DOWN_ARROW)){
    move(0,10);
    grow(0.01)
}
  drawSprites();

  fill("red")
  noStroke()
  textSize(30)
  textAlign(CENTER)
  text("Use the arrow keys to move the balloon",400,50)
}

function move(x,y){
  database.ref('balloon/position').update({
    'x': balloon.x+x,
    'y': balloon.y+y
})
}

function grow(i){ 
  database.ref('balloon').update({
  'scale':balloon.scale + i
}) 
}

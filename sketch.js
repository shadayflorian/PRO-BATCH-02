
var trex ,trex_running;
var ground, groundImage, invisibleGround;
var cloud, cloudImage;
var obstacle, obstacle1, obstacle2, obstacle3;
var obstacle4, obstacle5, obstacle6;
var rand;
var play = 1;
var end = 0;
var gameState = play;
var score;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png","trex4.png")

  //reiniciar el juego
  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
}

function setup(){
  createCanvas(600,200)
  
  //crear sprite de Trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running); 
  trex.scale = 0.5;

  //suelo
  ground = createSprite(200, 185, 400, 20)
  ground.addImage("ground", groundImage)

  //suelo invisible
  invisibleGround = createSprite(200, 190, 400, 10)
  invisibleGround.visible = false;
  
  var rand = Math.round(Math.random(1, 100));
  
  console.log( "numero aleatorio" + rand)

  score = 0;
}

function draw(){
  background("white")

 text("Puntuacion: " + score, 500, 50)


 if(gameState == play){
  score = score + Math.round(frameCount/60);

   //Mover el suelo
  ground.velocityX = -2;
  console.log(ground.x)

   //Restrablecer el suelo
   if(ground.x < 0){
    ground.x = ground.width/2;
  }

  if(keyDown("space") && trex.y >= 100){
    trex.velocityY = -10;  
  }
} 
 else if(gameState == end){
   ground.velocityX = 0;
 }

  

 
  
  

  trex.velocityY = trex.velocityY + 0.8;

  //cambiarlo por invisible ground
  trex.collide(invisibleGround)

  //aparecer nubes
  spawnClouds();

  //aparecer obstaculos
  spawnObstacles();

  drawSprites();
}

//funcion para crear nubes
function spawnClouds(){
  if(frameCount % 60 == 0){
  //crear sprite de nubes 600, 100, 40, 10
  cloud = createSprite(600, 100, 40, 10);
  cloud.addImage(cloudImage);
  cloud.scale = 0.5;
  //velocidad de la nube
  cloud.velocityX = -3;
  cloud.y = Math.round(random(10, 100));
  

  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;

  console.log("esta es la profundiad de nuestro trex" + trex.depth)
  console.log("hola " + "chicos");
  console.log("profundidad de las nubes" + cloud.depth)
  }
}

function spawnObstacles(){
  if(frameCount % 60 == 0){
    obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -6;
    obstacle.scale = 0.5;
    
   rand = Math.round(random(1, 6));

   switch(rand){
    case 1:
      obstacle.addImage(obstacle1)
      break;
    case 2:
      obstacle.addImage(obstacle2)
      break;
    case 3:
      obstacle.addImage(obstacle3)
      break;
    case 4:
      obstacle.addImage(obstacle4)
      break;
    case 5:
      obstacle.addImage(obstacle5)
      break;
    case 6:
      obstacle.addImage(obstacle6)
      break;
   }

   obstacle.lifeTime = 300;
  }

  
}
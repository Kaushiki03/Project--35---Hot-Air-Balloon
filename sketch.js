/*var balloon,balloonImage1,balloonImage2;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}*/

var bg, bgImg ;
var balloonAnimation, balloonImg02, balloon ;
var edges ;
var bird, birdImg ;
var coin, coinImg ;
var diamond, diamondImg ;
var bonusMoney, bonusMoneyImg ;
var score = 0, coinsCollected = 0, diamondsCollected = 0, bonusMoneyCollected = 0;
var coin_eg, diamond_eg, money_eg;
var gameOver, gameOverImg;
var bgm;

function preload(){
  bgImg = loadImage("backgroundImg.jpg")
  balloonAnimation = loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png")
  birdImg = loadImage("Birdimg.png")
  coinImg = loadImage("Coinimg.png")
  diamondImg = loadImage("Diamondimg.png")
  bonusMoneyImg = loadImage("Moneybonusimg.png")
  gameOverImg = loadImage("CryingGirlimg.png")
  bgm = loadSound("Bgm.mp3")
}

function setup() {
  createCanvas(1200,600)

  bg = createSprite(0,0,1200,600)
  bg.addImage(bgImg)
  bg.scale = 2.9;

  balloon = createSprite (150,200,100,450)
  balloon.addAnimation("balloon",balloonAnimation )
  balloon.scale = 0.40 ;

  coin_eg = createSprite(175,585,0,0)
  coin_eg.addImage(coinImg)
  coin_eg.scale = 0.15;

  diamond_eg = createSprite(620,583,0,0)
  diamond_eg.addImage(diamondImg)
  diamond_eg.scale = 0.20;

  money_eg = createSprite(1103,578,0,0)
  money_eg.addImage(bonusMoneyImg)
  money_eg.scale = 0.12;

  coinGroup = createGroup();
  diamondGroup = createGroup();
  moneyGroup = createGroup();
  birdGroup = createGroup();

  bgm.play();

}

function draw() {
  background("black"); 
  edges = createEdgeSprites();

 // balloon.debug = true; 
  balloon.setCollider("rectangle",0,0,270,500)

  bg.velocityX = -(5 + score/100) ;

  if (bg.x < 0){
    bg.x = bg.width/1;
  }

  if(keyDown(UP_ARROW)){
    balloon.velocityY = -(3 + score/100) ;
  } 
  else if(keyDown(DOWN_ARROW)){
    balloon.velocityY = +(3 + score/100) ;
  }

  if (balloon.isTouching(coinGroup)){
    coinsCollected = coinsCollected + 1;
    console.log("Coins = " + coinsCollected)
    coinGroup.destroyEach();
  }

  if (balloon.isTouching(diamondGroup)){
    diamondsCollected = diamondsCollected + 1;
    console.log("Diamonds = " + diamondsCollected)
    diamondGroup.destroyEach();
  }

  if (balloon.isTouching(moneyGroup)){
    bonusMoneyCollected = bonusMoneyCollected + 1;
    console.log("Bonus Money = " + bonusMoneyCollected)
    moneyGroup.destroyEach();
  }

  if (balloon.isTouching(birdGroup) || balloon.y > 690){

    birdGroup.setLifetimeEach(-1)
    coinGroup.setLifetimeEach(-1)
    diamondGroup.setLifetimeEach(-1)
    moneyGroup.setLifetimeEach(-1)

    birdGroup.setVelocityXEach(0)
    coinGroup.setVelocityXEach(0)
    diamondGroup.setVelocityXEach(0)
    moneyGroup.setVelocityXEach(0)

    bg.velocityX = 0;
    balloon.velocityY = 0;

    score = 0;

    gameOver = createSprite(580,250,0,0)
    gameOver.addImage(gameOverImg)
    gameOver.scale = 0.9;

  }

  balloon.collide(edges[2])

  drawSprites();

  bird();
  coin();
  diamond();
  bonusMoney();

  if(balloon.isTouching(birdGroup)){

    stroke ("black")
    strokeWeight(1);
    fill("black")
    textFont("Times new Roman")
    textSize(25);
    text("Oops !! The bird spoiled the balloon, game over 😥" ,350,450)  

    stroke ("black")
    strokeWeight(1);
    fill("black")
    textFont("Times new Roman")
    textSize(25);
    text("Press 'R' to restart" ,450,500)

    console.log("Game Over")

  }

  if(balloon.y > 690){

    stroke ("black")
    strokeWeight(1);
    fill("black")
    textFont("Times new Roman")
    textSize(25);
    text("Oh no !! The balloon fell down, game over 😥" ,350,450)
    
    stroke ("black")
    strokeWeight(1);
    fill("black")
    textFont("Times new Roman")
    textSize(25);
    text("Press 'R' to restart" ,450,500)

    console.log("Game Over")

  }

  stroke ("black")
  strokeWeight(2);
  fill("red")
  textFont("ink free")
  textSize(25);
  text("Coins collected     : " + coinsCollected,10,590)

  stroke ("black")
  strokeWeight(2);
  fill("red")
  textFont("ink free")
  textSize(25);
  text("Diamonds collected        : " + diamondsCollected,400,590)

  stroke ("black")
  strokeWeight(2);
  fill("red")
  textFont("ink free")
  textSize(25);
  text("Bonus Money collected        : " + bonusMoneyCollected,850,590)

  stroke ("black")
  strokeWeight(2);
  fill("red")
  textFont("ink free")
  textSize(25);
  text("Score : " + score ,560,30)
  score = score + Math.round(getFrameRate()/60);


}

function bird(){
  if (frameCount % 150 == 0){
    var bird = createSprite(1300,Math.round(random(30,590)))
    bird.addImage(birdImg)
    bird.scale = 0.14
    bird.lifetime = 260;
    bird.velocityX = -(5 + score/100);
 //   bird.debug = true;
    bird.setCollider("circle",0,0,200)
    birdGroup.add(bird);
  }
}

function coin(){
  if (frameCount % 110 == 0){
    var coin = createSprite(1300,Math.round(random(30,590)))
    coin.addImage(coinImg)
    coin.scale = 0.2;
    coin.lifetime = 260;
    coin.velocityX = -(5 + score/100);
    coinGroup.add(coin)
  }
}

function diamond(){
  if (frameCount % 500 == 0){
    var diamond = createSprite(1300,Math.round(random(30,590)))
    diamond.addImage(diamondImg)
    diamond.scale = 0.1;
    diamond.lifetime = 260;
    diamond.velocityX = -(5 + score/100);
    diamond.setCollider("rectangle",0,0,400,400)
    diamondGroup.add(diamond)
  }
}

function bonusMoney(){
  if (frameCount % 1000 == 0){
    var bonusMoney = createSprite(1300,Math.round(random(30,590)))
    bonusMoney.addImage(bonusMoneyImg)
    bonusMoney.scale = 0.5;
    bonusMoney.lifetime = 260;
    bonusMoney.velocityX = -(5 + score/100);
    bonusMoney.setCollider("rectangle",0,0,140,140)
    moneyGroup.add(bonusMoney)
  }
}

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var balls = []
var ships = []
var boatAnimation = []
var brokenBoatAnimation = []
var gameOver = false
var laughing = false

function preload() {
  bg=loadImage("assets/background.gif")
  boatSpriteData=loadJSON("assets/boat/boat.json")
  boatSpriteSheet=loadImage("assets/boat/boat.png")
  brokenBoatSpriteData = loadJSON("assets/boat/broken_boat.json")
  brokenBoatSpriteSheet = loadImage("assets/boat/broken_boat.png")
  bgMusic = loadSound("assets/background_music.mp3")
  cannonSound = loadSound("assets/cannon_explosion.mp3")
  pirateLaugh = loadSound("assets/pirate_laugh.mp3")
}

function setup() {
  createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES)
  angle = 15

  tower=new Tower(150,350,160,310)
  cannon= new Cannon(180,125,130,100,angle)

  ground=Bodies.rectangle(600,height-1,1500,1,{isStatic:true})
  World.add(world,ground)
  rectMode(CENTER);
  ellipseMode(RADIUS);

  var boatFrames = boatSpriteData.frames

  for (var i in boatFrames){
    var pos = boatFrames[i].position
    var img = boatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h)
    boatAnimation.push(img)
  }

  var brokenBoatFrames = brokenBoatSpriteData.frames

  for (var i in brokenBoatFrames){
    var pos=brokenBoatFrames[i].position
    var img = boatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h)
    brokenBoatAnimation.push(img)
  }
}

function draw() 
{
  background(bg);
  Engine.update(engine);
  if (!bgMusic.isPlaying()){
    bgMusic.play()
    bgMusic.setVolume(0.5)
  }
  rect(ground.position.x,ground.position.y,1500,1)
  createBoats()
  for (var i = 0;i<balls.length;i++){
    showCannonBalls(balls[i],i)
    for (var j = 0;j<ships.length;j++){
      if (balls[i]!==undefined&&ships[j]!==undefined){
        var collision = Matter.SAT.collides(balls[i].body,ships[j].body)
        if (collision.collided){
          if (!ships[j].broken){
            ships[j].removeBrokenBoat(j)
            j--
          }
          World.remove(world,balls[i].body)
          balls.splice(i,1)
          i--
        }
      }
     
    }
  }
  tower.showTower()
  cannon.showCannon()
}

function keyReleased(){
  if (keyCode==ENTER){
    cannonSound.play()
    balls[balls.length-1].shoot()
  }
}

function keyPressed(){
  if (keyCode==ENTER){
    var cannonBall = new CannonBall(cannon.x,cannon.y+5)
    balls.push(cannonBall)
  }
}
function showCannonBalls(ball,index){
    ball.showBall()
    if (ball.body.position.x>=width||ball.body.position.y>=height-50){
      World.remove(world,ball.body)
      balls.splice(index,1)
    }
}

function createBoats(){
  if (ships.length>0){
    if (ships.length<4&&ships[ships.length-1].body.position.x<width-300){
      var position = [-50,-70,-80,-60]
      var ship = new Ship(width,height-100,170,170,random(position),boatAnimation) 
      ships.push(ship)
    }
    for (var i=0;i<ships.length;i++){
      Matter.Body.setVelocity(ships[i].body,{x:-1,y:0})
      ships[i].showBoat()
      ships[i].animate()
      var collision = Matter.SAT.collides(tower.body,ships[i].body)
      if (collision.collided&&!ships[i].broken){
        if (!laughing&&!pirateLaugh.isPlaying()){
          pirateLaugh.play()
          laughing = true
        }
        gameOver = true
        gameover()
      }
    }
  }
  else{
    var ship = new Ship(width,height-100,170,170,-60,boatAnimation)
    ships.push(ship)
  }
}

function gameover(){
  swal({
    title:`Game Over`,
    confirmButtonText:"Play Again"
  },
    function(isConfirm){
      if (isConfirm){
        location.reload()
      }
    }
  )
}
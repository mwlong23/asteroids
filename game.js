// import  constrainInSpace  from './physics.js';
// import * as phys from './physics.js';

// Drawing Helpers 
function drawShip(ship){ 
  let dirTip = ship.dir;
  let dirL = ship.dir + 2/3*PI;
  let dirR = ship.dir - 2/3*PI
  let len = ship.dim.h/2;
  let width = ship.dim.w/2;

  triangle( 
    ship.pos.x + len*Math.cos(dirTip), ship.pos.y + len*Math.sin(dirTip), 
    ship.pos.x + width*Math.cos(dirL), ship.pos.y + width*Math.sin(dirL),
    ship.pos.x + width*Math.cos(dirR), ship.pos.y + width*Math.sin(dirR));
}

function drawSpaceBoundary(space) {
  rect(0,0, space.width-1, space.height-1);
}

function drawAsteroid(asteroid){
  translate(asteroid.pos.x, asteroid.pos.y);
  rotate(asteroid.angle);
  ellipse(0,0, 
          asteroid.dim.w, asteroid.dim.h);
  resetMatrix();
}
function drawMissile(missile){
  translate(missile.pos.x, missile.pos.y);
  ellipse(0,0, 
          5, 5);
  resetMatrix();
}

function checkMissileVisible(missile){
  if(missile.pos.x <= 0 || missile.pos.x >= space.width){ missiles.shift()};
  if(missile.pos.y <= 0 || missile.pos.y >= space.height){ missiles.shift()}
}
//Physics Helpers
function constrainInSpace(entity, space){
  if(entity.pos.x < 0){ entity.pos.x = space.width};
  if(entity.pos.y < 0){ entity.pos.y = space.height}
  if(entity.pos.x > space.width){ entity.pos.x = 0}
  if(entity.pos.y > space.height){ entity.pos.y = 0}
}
function advancePos(entity){
  entity.pos.y += entity.vel.dy;
  entity.pos.x += entity.vel.dx;
};

function applyDrag(entity){
  entity.vel.dx *= 0.99;
  entity.vel.dy *= 0.99;
};
// Model / State
let space = {height: window.innerHeight, width: window.innerWidth};
let ship = {
  pos: { x: 50, y: 200 },
  vel: { dx: 0, dy: 0 },
  dim: { w: 50, h: 100 },
  dir: 0,
  maxSpeed: 10,
};
let asteroids = [

  randomAsteroid(space),
  randomAsteroid(space),
  randomAsteroid(space),
  randomAsteroid(space),
];

let missiles = [];

function randomAsteroid(space){
  return {
            pos: { x: Math.random()*space.width, y: Math.random()*space.height },
            dim: { w: Math.random()*50, h: Math.random()*50 },
            vel: { dx: Math.random()*2-1, dy: Math.random()*2-1 },
            angle: 0,
            dAngle: -0.1*Math.random(),
          }
}

function advance(){
  advancePos(ship);
  applyDrag(ship);
  constrainInSpace(ship, space)
  for(let asteroid of asteroids){
    advancePos(asteroid)
    constrainInSpace(asteroid, space)
    asteroid.angle += asteroid.dAngle;
  }
  for(let missile of missiles) {
    advancePos(missile)
  }
}

function setup() {
  createCanvas(space.width, space.height);
}

function draw() {

  fill(0)
  drawSpaceBoundary(space);
  fill(255,255,255)
  ellipse(50,50, 50,50)
  fill(255,100,50);
  
  push()
  drawShip(ship);
  fill(255,0,0)
  ellipse(ship.pos.x, ship.pos.y, 10, 10)
  pop();

  for(let asteroid of asteroids) {
    fill(128,128,128);
    drawAsteroid(asteroid);
  }

  for( let missile of missiles){
    fill(0,255,0)
    checkMissileVisible(missile)
    drawMissile(missile);
  }
  // removeUsedMissiles(missiles);
  advance();
}
  
  // Ship Controls
function keyPressed() {
  let SPACE_KC = 32;
  let UP_KC = 38;
  let LEFT_KC = 37;
  let RIGHT_KC = 39;
  switch(keyCode){
    case UP_KC: 
      let speedSq = ship.vel.dx * ship.vel.dx + ship.vel.dy*ship.vel.dy;
      // if(speedSq d<= ship.maxSpeed * ship.maxSpeed){ // optimization
        ship.vel.dx += Math.cos(ship.dir);
        ship.vel.dy += Math.sin(ship.dir);
      // }
    break;
    case LEFT_KC:
      ship.dir -= 0.3;
      break;
    case RIGHT_KC:
      ship.dir += 0.3;
    break;
    case SPACE_KC: 
      missiles.push({
        pos: Object.assign({}, ship.pos), // don't alias existing memory
        vel: { dx: Math.cos(ship.dir)*10, dy: Math.sin(ship.dir)*10},
      })
  }
}
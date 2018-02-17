// Drawing Helpers 
function drawShip(ship){ 
  let dirTip = ship.dir;
  let dirL = ship.dir + 2/3*PI;
  let dirR = ship.dir - 2/3*PI
  let len = ship.dim.h/2;
  let width = ship.dim.w/2;

  triangle( 
    ship.pos.x + len*Math.cos(dirTip), ship.pos.y+len*Math.sin(dirTip), 
    ship.pos.x + width*Math.cos(dirL), ship.pos.y+width*Math.sin(dirL),
    ship.pos.x + width*Math.cos(dirR), ship.pos.y+width*Math.sin(dirR));
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
}

function applyDrag(entity){
  entity.vel.dx *= 0.99
  entity.vel.dy *= 0.99
}

// Model / State
let space = {height: 500, width:500};
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
}

function setup() {
  createCanvas(space.width, space.height);
}

function draw() {
  drawSpaceBoundary(space);
  drawShip(ship);
  for(let asteroid of asteroids) {
    drawAsteroid(asteroid);
  }
  advance();
}

function keyPressed() {
  let SPACE_KC = 32
  let LEFT_KC = 37;
  let RIGHT_KC = 39;
  switch(keyCode){
    case SPACE_KC: 
      let speedSq = ship.vel.dx * ship.vel.dx + ship.vel.dy*ship.vel.dy;
      // if(speedSq <= ship.maxSpeed * ship.maxSpeed){ // optimization
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
  }
}
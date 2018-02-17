// Drawing Helpers 
function drawShip(ship){
  triangle( 
    ship.pos.x-ship.space.w/2, ship.pos.y+ship.space.h/2, 
    ship.pos.x+ship.space.w/2, ship.pos.y+ship.space.h/2,
    ship.pos.x,             ship.pos.y - ship.space.h/2);
}

function drawSpaceBoundary(space) {
  rect(0,0, space.width-1, space.height-1);
}
//Physics Helpers
function constrainInSpace(entity, space){
  if(entity.pos.x < 0){ entity.pos.x = space.width};
  if(entity.pos.y < 0){ entity.pos.y = space.height}
  if(entity.pos.x > space.width){ entity.pos.x = 0}
  if(entity.pos.y > space.height){ entity.pos.y = 0}
}
function advancePos(ship){
  ship.pos.y += ship.vel.dy;
  ship.pos.x += ship.vel.dx;
}

// Model / State
let space = {height: 500, width:500};
let ship = {
  pos: { x: 50, y: 200 },
  vel: { dx: 1, dy: -5 },
  space: { w: 50, h: 100 },
  dir: 0,
};


function advance(){
  advancePos(ship);
  constrainInSpace(ship, space)
}

function setup() {
  createCanvas(space.width, space.height);
}

function draw() {
  drawSpaceBoundary(space);
  drawShip(ship);

  advance();
}
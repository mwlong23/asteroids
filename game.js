// Helpers 
function drawShip(ship){
  triangle( 
    ship.pos.x-ship.space.w/2, ship.pos.y+ship.space.h/2, 
    ship.pos.x+ship.space.w/2, ship.pos.y+ship.space.h/2,
    ship.pos.x,             ship.pos.y - ship.space.h/2);
}

function drawSpaceBoundary(space) {
  rect(0,0, space.width-1, space.height-1);
}

// Model / State
let space = {height: 500, width:500};
let ship = {
  pos: { x: 50, y: 200 },
  space: { w: 50, h: 100 }
};

function advance(){
  ship.pos.y -= 1;
}




function setup() {
  createCanvas(space.width, space.height);
}

function draw() {
  drawSpaceBoundary(space);
  drawShip(ship);

  advance();
}
let ship = {
    pos: { x: 50, y: 200 },
    dim: { w: 50, h: 100 }
};
function drawShip(ship){
  triangle( 
    ship.pos.x-ship.dim.w/2, ship.pos.y+ship.dim.h/2, 
    ship.pos.x+ship.dim.w/2, ship.pos.y+ship.dim.h/2,
    ship.pos.x,             ship.pos.y - ship.dim.h/2);
}

let dim = {height: 500, width:500};

function setup() {
  createCanvas(dim.width, dim.height);
}

function draw() {
  rect(0,0, dim.width-1, dim.height-1)

  drawShip(ship);
}
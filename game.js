let x = 50;
let y = 200;
let dim = {height: 500, width:500};

function setup() {
  createCanvas(dim.width, dim.height);
}

function draw() {
  rect(0,0, dim.width-1, dim.height-1)
  let w = 50;
  let h = 100;
  triangle( 
          x-w/2, y+h/2, 
          x+w/2, y+h/2,
          x,y - h/2);
}
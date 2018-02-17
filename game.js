let x = 50;
let y = 50;

function setup() {

}

function draw() {
  let w = 50;
  let h = 100;
  triangle( 
          x-w/2, y+h/2, 
          x+w/2, y+h/2,
          x,y - h/2);
}
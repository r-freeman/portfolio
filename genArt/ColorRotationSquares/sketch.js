numSquares = 500
let offsetSize;
let squareSize;
xoff=0;
offSwitch = true;
inc = 0.1;
count = 0;
radialSize = 300;
shapes = [];

function setup() {
  createCanvas(500, 500);
  background(255);
  colorMode(HSB, 360, 100, 100);
  fill(0);
  noStroke();
  offsetSize = sqrt(numSquares);
  squareSize = 25;
}

function draw() {
  count = 0;

  stepSizeX = width / offsetSize;
  stepSizeY = height / offsetSize;

  background(0, 0, 0, 75);


  for (let y = 0; y < height; y += stepSizeY) {
    for (let x = 0; x < width; x += stepSizeX) {

      push();
      tx = x+(squareSize/2);
      ty = y+(squareSize/2);
      translate(tx, ty);
      let i = atan2(mouseX - tx, mouseY - ty);

      shapes[count] = new Shape(squareSize, squareSize, i, map(Math.abs(Math.hypot(mouseX - tx, mouseY - ty)),xoff,radialSize,50,310));

      rotate(i);

      rectMode(CENTER);

      shapes[count].Animate();

      count++;


      pop();
    }

if(offSwitch && xoff<radialSize || xoff<0){
xoff+=inc;
offSwitch = true;
} else if (!offSwitch || xoff>=radialSize)
{
xoff-=inc;
offSwitch = false;
}

  }


}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(0);
  noStroke();
  
  fill('yellow');
  circle(200,200,300);
  
  fill(0);
  triangle(50,80,200,200,50,320);
  
  fill('red');
  rect(450,200,300,150);
  circle(600,200,300);
  
  fill(255);
  circle(525,200,75);
  circle(675,200,75);
  
  fill('blue');
  circle(525,200,50);
  circle(675,200,50);
}

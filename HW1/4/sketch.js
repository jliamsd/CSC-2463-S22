function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('blue');
  
  stroke(255);
  strokeWeight(5);
  
  fill(50,200,0);
  circle(200,200,200);
  
  fill('red');
  beginShape();
  vertex(200,100); //point 1
  vertex(225,180);
  vertex(300,180); //point 2
  vertex(240,220);
  vertex(255,285); //point 3
  vertex(200,240);
  vertex(145,285); //point 4
  vertex(160,220);
  vertex(100,180); //point 5
  vertex(175,180);
  vertex(200,100); //rejoin start point to end outline
  endShape();
}

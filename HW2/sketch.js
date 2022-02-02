function setup() {
  createCanvas(1000, 1000); 
  background(250);
  strokeWeight(0);
  
  c = [0,0,0,0];
}
 
function mousePressed(){
  if(mouseX < 41 && mouseY < 181){
    c = get(mouseX,mouseY);
  }
}

function makeLine(){
    stroke(c);  
    strokeWeight(10);
    line(mouseX,mouseY,pmouseX,pmouseY);
}

function draw() {
  
  if(mouseIsPressed){
    if(mouseX > 40){
      makeLine();
    }
  }
  
  strokeWeight(0);
  fill('red');
  rect(0,0,40,20);
  fill('orange');
  rect(0,20,40,20);
  fill('yellow');
  rect(0,40,40,20);
  fill('green');
  rect(0,60,40,20);
  fill('cyan');
  rect(0,80,40,20);
  fill('blue');
  rect(0,100,40,20);
  fill('magenta');
  rect(0,120,40,20);
  fill('brown');
  rect(0,140,40,20);
  fill('white');
  rect(0,160,40,20);
  fill('black');
  rect(0,180,40,20);
  
}

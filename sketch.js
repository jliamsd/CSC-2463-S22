let serial;
let latestData = "waiting for data";


let serialPDM;
let portName = 'COM3';    // Fill in your serial port name here

let sensors;

function preload(){
  sprites = loadImage("sprites.png");
  cross = loadImage("crosshair.png");
  vcr = loadFont("VCR_MONO.ttf");
}

let joyX = 0;
let joyY = 0;

let button;

let time = 60;

let ammo = 4;
let score = 0;

let chars = [];
let animSpeed = 1;
let ducksAlive = 5;

let gameState = 0;

//const player = new Tone.Player("bgm.mp3").toDestination();
//const sfx1 = new Tone.FMSynth().toDestination();
//const now;

function charGen(){
  let d = new Character(sprites, int(random(50,750)),
    int(random(80,500)));
  return d;
}

function keyPressed(){
  serialPDM.transmit('led', 1);
}

function keyReleased(){
  if(ammo>0){
    for (let i = 0; i < chars.length; i++){
      if ((chars[i].x-30) < mouseX && mouseX < (chars[i].x+30) &&
        (chars[i].y-30) < mouseY && mouseY < (chars[i].y+30)){
        chars[i].dead = true; 
        score += 10;
        ducksAlive--;
        animSpeed++;
        refresh();
      }
    }
    serialPDM.transmit('led', 0);
    //now = Tone.now();
    //sfx1.triggerAttackRelease("C4", "4n", now);
    ammo--;
  }/*else{
    //now = Tone.now();
    //sfx1.triggerAttackRelease("C3", "8n", now);
  }*/
  if (550 < mouseX && mouseX < 780 && 570 < mouseY && mouseY < 780){
    ammo = 4;
  }
}

function refresh(){
    if (ducksAlive < 1){
      for (let i = 0; i < 5; i++){
        chars.push(charGen());
      }
      ducksAlive = 5;
    }
}

function setup() {
  createCanvas(800, 1000);
  textFont(vcr);
  gameState = 1;
  for (let i = 0; i < 5; i++){
    chars[i] = charGen();
  }
  button = createButton('START');
  button.position(350, 500);
  button.size(100);
  button.mousePressed(buttonHit);
  
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  
  sensors = serialPDM.sensorData;
  
  createCanvas(800,800);
  
  serial = new p5.SerialPort();

 serial.list();
 serial.open('COM3');

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
}

function serverConnected() {
 print("Connected to Server");
}

function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() {
 print("Serial Port is Open");
}

function gotClose(){
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) {
 print(theerror);
}

function gotData() {
 let currentString = serial.readLine();
  //trim(currentString);
 if (!currentString) return;
 console.log(currentString);
 latestData = currentString;
}


function draw() {
  background(0);
  if (gameState == 0){
    drawDebug();
  }else if (gameState == 1){
    drawStart();
  }else if (gameState == 2){
    let splitString = split(latestData, ',');
    joyX = int(splitString[1]);
    joyY = int(splitString[3]);
    //mouseX += int(joyX/10);
    mouseY += int(joyY/10);
    drawGame();
    for (let i = 0; i < chars.length; i++){
      chars[i].draw(animSpeed);
    }
    if (frameCount % 60 == 0){
      time--;
    }
    if (time <= 0){
      cycleGameState();
    }
  }else{
    drawEnd();
  }
}

function drawDebug(){
  background(200);
  fontSize(48);
  let splitString = split(latestData, ',');
  joyX = int(splitString[1]);
  joyY = int(splitString[3]);
  
  text("x: "+ x, 10, 30);
  text("y: "+ y, 10, 80);
  text(latestData, 10, 120);
}

function drawStart(){
  textSize(96);
  text('Duck Hunt\n  2022', 150, 200);
  fill('lime');
}

function drawGame(){
  fill(159,227,163);
  rect(0,60,800,480);
  textSize(48);
  fill('lime');
  
  text('Score:', 10, 50);
  text(score, 180, 50);
  text('Time:', 600, 50);
  text(time, 735,50);
  
  rect(0,60,800,10);
  rect(0,540,800,10);
  
  text('A\nM\nM\nO',50,600);
  rect(100,590,420,180);
  for (let i=0;i<ammo;i++){
    fill('black');
    rect(115+(100*i), 600, 90, 160);
  }
  fill('red');
  rect(550,570,230,210);
  fill('black');
  text('RELOAD',580,690);
  
  image(cross,mouseX-30,mouseY-30,60,60,0,0,256,256);
}

function drawEnd(){
  textSize(96);
  fill('lime');
  text('Game Over!', 140, 150);
  textSize(64);
  text('Your score: ', 100, 450);
  textSize(96);
  text(score, 550, 460);
  textSize(48);
  text('Thanks for playing!', 140, 700);
}

function buttonHit(){
  cycleGameState();
  button.remove();
}

function cycleGameState(){
  gameState++;
  if (gameState == 2){
    player.start();
    mouseX = 400;
    mouseY = 400;
  }else if (gameState == 3){
    player.end();
  }
}

class Character{
  constructor(spriteSheet,x,y){
    this.dead = false;
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x;
    this.y = y;
    let num = int(random(0,2));
    if (num == 0){
      this.dir = -1;
      this.face = -1;
    }
    else{
      this.dir = 1;
      this.face = 1;
    }
  }
  
  draw(animSpeed){
    push();
    if (!this.dead){
      translate(this.x,this.y);
      scale(this.face,1);
      this.boundaryDetect();
      image(this.spriteSheet,0,0,60,60,5+40*(this.sx+1),125,40,40);
      if (frameCount % 5 == 0){
        this.sx = (this.sx + 1) % 4;
      }
      this.x += (this.dir*animSpeed);
    }
    else{
      this.drawDead();
    }
    pop();
  }
  
  drawDead(){
    image(this.spriteSheet,this.x,this.y,50,50,235,130,40,40);
  }
  
  boundaryDetect(){
    if (this.x >= 760){
      this.dir = -1;
      this.face = -1;
    }
    if (this.x <= 40){
      this.dir = 1;
      this.face = 1;
    }
  }
}
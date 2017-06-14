var points = [];
var time = 0;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("codeisart");
  //drawGrid();
  initializePoints();
}

function draw() {
  background(255);
  //drawGrid();
  if (time < 260) {
    for (var i = 0; i < points.length; i++) {
      points[i].move(points[i].direction);
      points[i].display();
    }
  }
  else if (time >= 260 && time < 480) {
    for (var i = 0; i < points.length; i++) {
      points[i].glide();
      points[i].display();
    }
  }
  else if (time >= 480) {
    for (var i = 0; i < points.length; i++) {
      points[i].finalize();
    }
  }
  time += 1;
}

// redraw grid and redraw art when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //drawGrid();
  points = [];
  initializePoints();
  time = 0;
  redraw();
}

function initializePoints() {
  var gridWidth = floor(min(windowWidth, windowHeight)*3/4/120)*120;
  
  // C
  var CstartX = floor((windowWidth-gridWidth)/2)+120;
  var CstartY = floor((windowHeight-gridWidth)/2)+60;
  points.push(new Point(CstartX, CstartY, "down"));
  points.push(new Point(CstartX-20, CstartY, "right"));
  points.push(new Point(CstartX-40, CstartY+20, "left"));
  points.push(new Point(CstartX-40, CstartY+40, "down"));
  points.push(new Point(CstartX-40, CstartY+60, "up"));
  points.push(new Point(CstartX-20, CstartY+80, "left"));
  points.push(new Point(CstartX, CstartY+80, "up"));
  // O
  var OstartX = CstartX+100;
  var OstartY = CstartY+20;
  points.push(new Point(OstartX, OstartY, "right"));
  points.push(new Point(OstartX-20, OstartY-20, "down"));
  points.push(new Point(OstartX-40, OstartY-20, "left"));
  points.push(new Point(OstartX-60, OstartY, "right"));
  points.push(new Point(OstartX-60, OstartY+20, "down"));
  points.push(new Point(OstartX-60, OstartY+40, "up"));
  points.push(new Point(OstartX-40, OstartY+60, "left"));
  points.push(new Point(OstartX-20, OstartY+60, "up"));
  points.push(new Point(OstartX, OstartY+40, "right"));
  points.push(new Point(OstartX, OstartY+20, "left"));
  // D
  var DstartX = CstartX+200;
  var DstartY = CstartY+20;
  points.push(new Point(DstartX, DstartY, "left"));
  points.push(new Point(DstartX-20, DstartY-20, "up"));
  points.push(new Point(DstartX-40, DstartY-20, "down"));
  points.push(new Point(DstartX-60, DstartY-20, "right"));
  points.push(new Point(DstartX-60, DstartY, "left"));
  points.push(new Point(DstartX-60, DstartY+20, "right"));
  points.push(new Point(DstartX-60, DstartY+40, "down"));
  points.push(new Point(DstartX-60, DstartY+60, "left"));
  points.push(new Point(DstartX-40, DstartY+60, "up"));
  points.push(new Point(DstartX-20, DstartY+60, "right"));
  points.push(new Point(DstartX, DstartY+40, "left"));
  points.push(new Point(DstartX, DstartY+20, "left"));
  // E
  var EstartX = CstartX+280;
  var EstartY = CstartY;
  points.push(new Point(EstartX, EstartY, "up"));
  points.push(new Point(EstartX-20, EstartY, "right"));
  points.push(new Point(EstartX-40, EstartY, "down"));
  points.push(new Point(EstartX-40, EstartY+20, "right"));
  points.push(new Point(EstartX-40, EstartY+40, "left"));
  points.push(new Point(EstartX-20, EstartY+40, "up"));
  points.push(new Point(EstartX, EstartY+40, "left"));
  points.push(new Point(EstartX-40, EstartY+60, "down"));
  points.push(new Point(EstartX-40, EstartY+80, "right"));
  points.push(new Point(EstartX-20, EstartY+80, "left"));
  points.push(new Point(EstartX, EstartY+80, "up"));
  
  // I
  var IstartX = CstartX+100;
  var IstartY = CstartY+140;
  points.push(new Point(IstartX, IstartY, "down"));
  points.push(new Point(IstartX-20, IstartY, "right"));
  points.push(new Point(IstartX-40, IstartY, "up"));
  points.push(new Point(IstartX-20, IstartY+20, "left"));
  points.push(new Point(IstartX-20, IstartY+40, "right"));
  points.push(new Point(IstartX-20, IstartY+60, "up"));
  points.push(new Point(IstartX-40, IstartY+80, "down"));
  points.push(new Point(IstartX-20, IstartY+80, "left"));
  points.push(new Point(IstartX, IstartY+80, "right"));
  // S
  var SstartX = CstartX+180;
  var SstartY = CstartY+140;
  points.push(new Point(SstartX, SstartY, "left"));
  points.push(new Point(SstartX-20, SstartY, "up"));
  points.push(new Point(SstartX-40, SstartY+20, "down"));
  points.push(new Point(SstartX-40, SstartY, "right"));
  points.push(new Point(SstartX-20, SstartY+40, "up"));
  points.push(new Point(SstartX, SstartY+60, "right"));
  points.push(new Point(SstartX, SstartY+80, "down"));
  points.push(new Point(SstartX-20, SstartY+80, "left"));
  points.push(new Point(SstartX-40, SstartY+80, "up"));
  
  // A
  var AstartX = CstartX+60;
  var AstartY = CstartY+280;
  points.push(new Point(AstartX, AstartY, "right"));
  points.push(new Point(AstartX-20, AstartY, "up"));
  points.push(new Point(AstartX-40, AstartY, "down"));
  points.push(new Point(AstartX-40, AstartY+20, "left"));
  points.push(new Point(AstartX, AstartY+20, "down"));
  points.push(new Point(AstartX-40, AstartY+40, "up"));
  points.push(new Point(AstartX-20, AstartY+40, "right"));
  points.push(new Point(AstartX, AstartY+40, "up"));
  points.push(new Point(AstartX-40, AstartY+60, "right"));
  points.push(new Point(AstartX, AstartY+60, "left"));
  points.push(new Point(AstartX-40, AstartY+80, "down"));
  points.push(new Point(AstartX, AstartY+80, "up"));
  // R
  var RstartX = CstartX+140;
  var RstartY = CstartY+280;
  points.push(new Point(RstartX, RstartY, "left"));
  points.push(new Point(RstartX-20, RstartY, "down"));
  points.push(new Point(RstartX-40, RstartY, "right"));
  points.push(new Point(RstartX-40, RstartY+20, "up"));
  points.push(new Point(RstartX, RstartY+20, "right"));
  points.push(new Point(RstartX-40, RstartY+40, "down"));
  points.push(new Point(RstartX-20, RstartY+40, "left"));
  points.push(new Point(RstartX, RstartY+40, "up"));
  points.push(new Point(RstartX-40, RstartY+60, "left"));
  points.push(new Point(RstartX-20, RstartY+60, "right"));
  points.push(new Point(RstartX-40, RstartY+80, "down"));
  points.push(new Point(RstartX, RstartY+80, "up"));
  // T
  var TstartX = CstartX+220;
  var TstartY = CstartY+280;
  points.push(new Point(TstartX, TstartY, "left"));
  points.push(new Point(TstartX-20, TstartY, "down"));
  points.push(new Point(TstartX-40, TstartY, "right"));
  points.push(new Point(TstartX-20, TstartY+20, "left"));
  points.push(new Point(TstartX-20, TstartY+40, "right"));
  points.push(new Point(TstartX-20, TstartY+60, "up"));
  points.push(new Point(TstartX-20, TstartY+80, "left"));
}

function drawGrid() {
  background(255);
  var gridWidth = floor(min(windowWidth, windowHeight)*3/4/120)*120;
  noStroke();
  fill(255);
  rect(floor((windowWidth-gridWidth)/2), floor((windowHeight-gridWidth)/2), gridWidth, gridWidth);
  stroke(175, 223, 237);
  for (var col = floor((windowWidth-gridWidth)/2); col <= floor((windowWidth-gridWidth)/2)+gridWidth; col+=20) {
    line(col, floor((windowHeight-gridWidth)/2), col, gridWidth+floor((windowHeight-gridWidth)/2));
  }
  for (var row = floor((windowHeight-gridWidth)/2); row <= gridWidth+floor((windowHeight-gridWidth)/2); row+=20) {
    line(floor((windowWidth-gridWidth)/2), row, floor((windowWidth-gridWidth)/2)+gridWidth, row); 
  }   
}

// class Point
function Point(finalx, finaly, direction) {
  var gridWidth = floor(min(windowWidth, windowHeight)*3/4/120)*120;
  this.finalPosX = finalx;
  this.finalPosY = finaly;
  this.direction = direction;
  this.speed = 2;
  this.diameter = 8;  
  if (this.direction == "right" || this.direction == "left") {
    this.initialPosX = floor((windowWidth-gridWidth)/2)+round(random(gridWidth));
    this.initialPosY = this.finalPosY;
  }
  else if (this.direction == "up" || this.direction == "down") {
    this.initialPosX = this.finalPosX;
    this.initialPosY = floor((windowHeight-gridWidth)/2)+round(random(gridWidth));
  }
  this.currPosX = this.initialPosX;
  this.currPosY = this.initialPosY;
  
  this.move = function(dir) {
    if (dir == "right") {
      this.currPosX += this.speed;
      if (this.currPosX > floor((windowWidth-gridWidth)/2)+gridWidth) {
        this.currPosX = floor((windowWidth-gridWidth)/2)+gridWidth;
        this.direction = "left";
      }
    }
    else if (dir == "left") {
      this.currPosX -= this.speed;
      if (this.currPosX < floor((windowWidth-gridWidth)/2)) {
        this.currPosX = floor((windowWidth-gridWidth)/2)
        this.direction = "right";
      }
    }
    else if (dir == "down") {
      this.currPosY += this.speed;
      if (this.currPosY > floor((windowHeight-gridWidth)/2)+gridWidth) {
        this.currPosY = floor((windowHeight-gridWidth)/2)+gridWidth;
        this.direction = "up";
      }
    }
    else if (dir == "up") {
      this.currPosY -= this.speed;
      if (this.currPosY < floor((windowHeight-gridWidth)/2)) {
        this.currPosY = floor((windowHeight-gridWidth)/2);
        this.direction = "down";
      }
    }
  } 
  
  this.display = function() {
    noStroke();
    fill(62, 172, 205);
    ellipse(this.currPosX, this.currPosY, this.diameter, this.diameter);
  }
  
  this.glide = function() {
    var glideSpeed = 36;
    if (this.direction == "right" || this.direction == "left") {
      this.currPosX += (this.finalPosX - this.currPosX)/glideSpeed;
    }
    else if (this.direction == "up" || this.direction == "down") {
      this.currPosY += (this.finalPosY - this.currPosY)/glideSpeed;
    }
  }
  
  this.finalize = function() {
    noStroke();
    fill(62, 172, 205);
    ellipse(this.finalPosX, this.finalPosY, this.diameter, this.diameter);
  }
}
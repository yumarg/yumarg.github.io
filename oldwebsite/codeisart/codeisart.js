var points = [];
var time = 0;
var gridCellWidth = 20;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("codeisart");
  drawGrid();
  initializePoints();
}

function draw() {
  background(255);
  drawGrid();
  drawPoints();
  if (time >= 600) {
    points = [];
    initializePoints();
    time = 0;
    drawPoints();
  }
  time += 1;
}

// redraw grid and redraw art when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawGrid();
  points = [];
  initializePoints();
  time = 0;
  redraw();
}

// initialize points to draw
function initializePoints() {
  var gridWidth = floor(min(windowWidth, windowHeight)*3/4/120)*120;
  print(gridWidth);
  gridCellWidth = floor(gridWidth/24);
  print(gridCellWidth);

  // C
  var CstartX = floor((windowWidth-gridWidth)/2)+6*gridCellWidth;
  var CstartY = floor((windowHeight-gridWidth)/2)+3*gridCellWidth;
  points.push(new Point(CstartX, CstartY, "down"));
  points.push(new Point(CstartX-1*gridCellWidth, CstartY, "right"));
  points.push(new Point(CstartX-2*gridCellWidth, CstartY+1*gridCellWidth, "left"));
  points.push(new Point(CstartX-2*gridCellWidth, CstartY+2*gridCellWidth, "down"));
  points.push(new Point(CstartX-2*gridCellWidth, CstartY+3*gridCellWidth, "up"));
  points.push(new Point(CstartX-1*gridCellWidth, CstartY+4*gridCellWidth, "left"));
  points.push(new Point(CstartX, CstartY+4*gridCellWidth, "up"));
  // O
  var OstartX = CstartX+5*gridCellWidth;
  var OstartY = CstartY+1*gridCellWidth;
  points.push(new Point(OstartX, OstartY, "right"));
  points.push(new Point(OstartX-1*gridCellWidth, OstartY-1*gridCellWidth, "down"));
  points.push(new Point(OstartX-2*gridCellWidth, OstartY-1*gridCellWidth, "left"));
  points.push(new Point(OstartX-3*gridCellWidth, OstartY, "right"));
  points.push(new Point(OstartX-3*gridCellWidth, OstartY+1*gridCellWidth, "down"));
  points.push(new Point(OstartX-3*gridCellWidth, OstartY+2*gridCellWidth, "up"));
  points.push(new Point(OstartX-2*gridCellWidth, OstartY+3*gridCellWidth, "left"));
  points.push(new Point(OstartX-1*gridCellWidth, OstartY+3*gridCellWidth, "up"));
  points.push(new Point(OstartX, OstartY+2*gridCellWidth, "right"));
  points.push(new Point(OstartX, OstartY+1*gridCellWidth, "left"));
  // D
  var DstartX = CstartX+10*gridCellWidth;
  var DstartY = CstartY+1*gridCellWidth;
  points.push(new Point(DstartX, DstartY, "left"));
  points.push(new Point(DstartX-1*gridCellWidth, DstartY-1*gridCellWidth, "up"));
  points.push(new Point(DstartX-2*gridCellWidth, DstartY-1*gridCellWidth, "down"));
  points.push(new Point(DstartX-3*gridCellWidth, DstartY-1*gridCellWidth, "right"));
  points.push(new Point(DstartX-3*gridCellWidth, DstartY, "left"));
  points.push(new Point(DstartX-3*gridCellWidth, DstartY+1*gridCellWidth, "right"));
  points.push(new Point(DstartX-3*gridCellWidth, DstartY+2*gridCellWidth, "down"));
  points.push(new Point(DstartX-3*gridCellWidth, DstartY+3*gridCellWidth, "left"));
  points.push(new Point(DstartX-2*gridCellWidth, DstartY+3*gridCellWidth, "up"));
  points.push(new Point(DstartX-1*gridCellWidth, DstartY+3*gridCellWidth, "right"));
  points.push(new Point(DstartX, DstartY+2*gridCellWidth, "left"));
  points.push(new Point(DstartX, DstartY+1*gridCellWidth, "left"));
  // E
  var EstartX = CstartX+14*gridCellWidth;
  var EstartY = CstartY;
  points.push(new Point(EstartX, EstartY, "up"));
  points.push(new Point(EstartX-1*gridCellWidth, EstartY, "right"));
  points.push(new Point(EstartX-2*gridCellWidth, EstartY, "down"));
  points.push(new Point(EstartX-2*gridCellWidth, EstartY+1*gridCellWidth, "right"));
  points.push(new Point(EstartX-2*gridCellWidth, EstartY+2*gridCellWidth, "left"));
  points.push(new Point(EstartX-1*gridCellWidth, EstartY+2*gridCellWidth, "up"));
  points.push(new Point(EstartX, EstartY+2*gridCellWidth, "left"));
  points.push(new Point(EstartX-2*gridCellWidth, EstartY+3*gridCellWidth, "down"));
  points.push(new Point(EstartX-2*gridCellWidth, EstartY+4*gridCellWidth, "right"));
  points.push(new Point(EstartX-1*gridCellWidth, EstartY+4*gridCellWidth, "left"));
  points.push(new Point(EstartX, EstartY+4*gridCellWidth, "up"));
  
  // I
  var IstartX = CstartX+5*gridCellWidth;
  var IstartY = CstartY+7*gridCellWidth;
  points.push(new Point(IstartX, IstartY, "down"));
  points.push(new Point(IstartX-1*gridCellWidth, IstartY, "right"));
  points.push(new Point(IstartX-2*gridCellWidth, IstartY, "up"));
  points.push(new Point(IstartX-1*gridCellWidth, IstartY+1*gridCellWidth, "left"));
  points.push(new Point(IstartX-1*gridCellWidth, IstartY+2*gridCellWidth, "right"));
  points.push(new Point(IstartX-1*gridCellWidth, IstartY+3*gridCellWidth, "up"));
  points.push(new Point(IstartX-2*gridCellWidth, IstartY+4*gridCellWidth, "down"));
  points.push(new Point(IstartX-1*gridCellWidth, IstartY+4*gridCellWidth, "left"));
  points.push(new Point(IstartX, IstartY+4*gridCellWidth, "right"));
  // S
  var SstartX = CstartX+9*gridCellWidth;
  var SstartY = CstartY+7*gridCellWidth;
  points.push(new Point(SstartX, SstartY, "left"));
  points.push(new Point(SstartX-1*gridCellWidth, SstartY, "up"));
  points.push(new Point(SstartX-2*gridCellWidth, SstartY+1*gridCellWidth, "down"));
  points.push(new Point(SstartX-2*gridCellWidth, SstartY, "right"));
  points.push(new Point(SstartX-1*gridCellWidth, SstartY+2*gridCellWidth, "up"));
  points.push(new Point(SstartX, SstartY+3*gridCellWidth, "right"));
  points.push(new Point(SstartX, SstartY+4*gridCellWidth, "down"));
  points.push(new Point(SstartX-1*gridCellWidth, SstartY+4*gridCellWidth, "left"));
  points.push(new Point(SstartX-2*gridCellWidth, SstartY+4*gridCellWidth, "up"));
  
  // A
  var AstartX = CstartX+3*gridCellWidth;
  var AstartY = CstartY+14*gridCellWidth;
  points.push(new Point(AstartX, AstartY, "right"));
  points.push(new Point(AstartX-1*gridCellWidth, AstartY, "up"));
  points.push(new Point(AstartX-2*gridCellWidth, AstartY, "down"));
  points.push(new Point(AstartX-2*gridCellWidth, AstartY+1*gridCellWidth, "left"));
  points.push(new Point(AstartX, AstartY+1*gridCellWidth, "down"));
  points.push(new Point(AstartX-2*gridCellWidth, AstartY+2*gridCellWidth, "up"));
  points.push(new Point(AstartX-1*gridCellWidth, AstartY+2*gridCellWidth, "right"));
  points.push(new Point(AstartX, AstartY+2*gridCellWidth, "up"));
  points.push(new Point(AstartX-2*gridCellWidth, AstartY+3*gridCellWidth, "right"));
  points.push(new Point(AstartX, AstartY+3*gridCellWidth, "left"));
  points.push(new Point(AstartX-2*gridCellWidth, AstartY+4*gridCellWidth, "down"));
  points.push(new Point(AstartX, AstartY+4*gridCellWidth, "up"));
  // R
  var RstartX = CstartX+7*gridCellWidth;
  var RstartY = CstartY+14*gridCellWidth;
  points.push(new Point(RstartX, RstartY, "left"));
  points.push(new Point(RstartX-1*gridCellWidth, RstartY, "down"));
  points.push(new Point(RstartX-2*gridCellWidth, RstartY, "right"));
  points.push(new Point(RstartX-2*gridCellWidth, RstartY+1*gridCellWidth, "up"));
  points.push(new Point(RstartX, RstartY+1*gridCellWidth, "right"));
  points.push(new Point(RstartX-2*gridCellWidth, RstartY+2*gridCellWidth, "down"));
  points.push(new Point(RstartX-1*gridCellWidth, RstartY+2*gridCellWidth, "left"));
  points.push(new Point(RstartX, RstartY+2*gridCellWidth, "up"));
  points.push(new Point(RstartX-2*gridCellWidth, RstartY+3*gridCellWidth, "left"));
  points.push(new Point(RstartX-1*gridCellWidth, RstartY+3*gridCellWidth, "right"));
  points.push(new Point(RstartX-2*gridCellWidth, RstartY+4*gridCellWidth, "down"));
  points.push(new Point(RstartX, RstartY+4*gridCellWidth, "up"));
  // T
  var TstartX = CstartX+11*gridCellWidth;
  var TstartY = CstartY+14*gridCellWidth;
  points.push(new Point(TstartX, TstartY, "left"));
  points.push(new Point(TstartX-1*gridCellWidth, TstartY, "down"));
  points.push(new Point(TstartX-2*gridCellWidth, TstartY, "right"));
  points.push(new Point(TstartX-1*gridCellWidth, TstartY+1*gridCellWidth, "left"));
  points.push(new Point(TstartX-1*gridCellWidth, TstartY+2*gridCellWidth, "right"));
  points.push(new Point(TstartX-1*gridCellWidth, TstartY+3*gridCellWidth, "up"));
  points.push(new Point(TstartX-1*gridCellWidth, TstartY+4*gridCellWidth, "left"));
}

// draw grid
function drawGrid() {
  background(255);
  var gridWidth = floor(min(windowWidth, windowHeight)*3/4/120)*120;
  noStroke();
  fill(255);
  rect(floor((windowWidth-gridWidth)/2), floor((windowHeight-gridWidth)/2), gridWidth, gridWidth);
  stroke(207, 235, 244);
  for (var col = floor((windowWidth-gridWidth)/2); col <= floor((windowWidth-gridWidth)/2)+gridWidth; col+=gridCellWidth) {
    line(col, floor((windowHeight-gridWidth)/2), col, gridWidth+floor((windowHeight-gridWidth)/2));
  }
  for (var row = floor((windowHeight-gridWidth)/2); row <= gridWidth+floor((windowHeight-gridWidth)/2); row+=gridCellWidth) {
    line(floor((windowWidth-gridWidth)/2), row, floor((windowWidth-gridWidth)/2)+gridWidth, row); 
  }   
}

// draw points and animate
function drawPoints() {
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
}

// class Point
function Point(finalx, finaly, direction) {
  var gridWidth = floor(min(windowWidth, windowHeight)*3/4/120)*120;
  this.finalPosX = finalx;
  this.finalPosY = finaly;
  this.direction = direction;
  this.speed = gridWidth/200;
  this.diameter = gridWidth/40;
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
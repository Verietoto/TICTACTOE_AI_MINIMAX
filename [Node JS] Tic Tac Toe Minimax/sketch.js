let board = [
  ['','',''],
  ['','',''],
  ['','','']
]

let activePlayer = true //true = player1 false = player 2;
var player1Score = 0;
var player2Score = 0;

function setup() {
  createCanvas(600, 600);
}

function drawLines(){
  strokeWeight(7)
  stroke(172,200,154)
  this.borderX = 100;
  this.borderY = 100;
  this.xGrid = (width-borderX)/4;
  this.yGrid = (height-borderY+50)/4 

  // Horizontal Line
  for (let i = 1; i < 3; i++){
    line(borderX, borderY + yGrid*i, width - borderX, borderY + yGrid*i)
  }
  
  // Vertical Line
    for (let i = 1; i < 3; i++){
    line(borderX + xGrid*i, borderY, borderX + xGrid*i, height - borderY)
  }
}

function drawPlayer(){
  textSize(100)
  
  for (const [index, element] of board.entries()){
    for (const [index2, element2] of element.entries()){
      
      let colorText = element2 == "X" ? fill(0,0,255) : fill(255,123,0)
          text(element2, (index2+1)*xGrid, (index+1)*yGrid+60) 
    }
  }
};

function mousePressed(){
  let xPos;
  let yPos;
  xPos = mouseX;
  yPos = mouseY;
  
  if (xPos >= borderX & xPos <= width - borderX & yPos >= borderY & yPos <= height - borderY){
      index = parseCoor([xPos,yPos]);
      if (activePlayer & board[index[0]][index[1]] == ""){
        board[index[0]][index[1]]= "X";
        activePlayer = !activePlayer;}
      else if(!activePlayer & board[index[0]][index[1]] == "")                {board[index[0]][index[1]]= "O";                                    activePlayer = !activePlayer;}
      
      
  }
      
      
};

function parseCoor(coor){
  let xIndex = (coor[0]-borderX)/xGrid;
  let yIndex = (coor[1]-borderY)/yGrid;
  return [Math.floor(yIndex), Math.floor(xIndex)]
  
};

function checkSpace(){
  let count = 0;  
  for (const [index, element] of board.entries()){
      for (const [index2, element2] of element.entries()){
        if (element2 == ""){count++}}}
  return count;
};

function isSame(value1, value2, value3){
  return value1 == value2 && value2 == value3 && value1 != ""
}
function checkWinner(){
  
  let winner = null;
  for (let i = 0; i< 3; i++){
    // Horizontal
    if (isSame(board[i][0],board[i][1],board[i][2])){
      winner = board[i][0];}
    //Vertical
    if (isSame(board[0][i],board[1][i],board[2][i])){winner = board[0][i]};
  
  }
  // Diagonal
  if (isSame(board[0][0],board[1][1],board[2][2])){
    winner = board[0][0];};
  if (isSame(board[0][2],board[1][1],board[2][0])){
    winner = board[0][2];};
  
  // Check Tie
  let count = checkSpace();
  if (count == 0 && winner == null){winner = "tie"}
  
  // if (winner != null){
  //   console.log("The Winner is " + winner);
  // }
  return winner
}
function reset(){
  board = [
  ['','',''],
  ['','',''],
  ['','','']];
  
  activePlayer = true;
}

function drawScore(){
  textSize(30);
  fill(0,100,255)
  text("Player1: " + str(player1Score), 30,570)
  fill(255,100,0)
  text("Player2: " + str(player2Score), 400,570)
  
}


function draw() {
  background(92, 127, 210);
  
  // Background Setting Line
  drawLines()
  drawPlayer()
  drawScore()


  // Check Winner
  let winner = checkWinner();
  
  if (winner != null){
    reset();
    if (winner == "X"){
      player1Score++;
    }
    else if(winner == "O"){
      player2Score++
    }
  }
  // AI Move
  if (!activePlayer){
    move = AIMovement();
    board[move[0]][move[1]] = "O";
    activePlayer = true;
  }
}



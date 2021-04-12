function AIMovement(){
  let bestScore = -Infinity
  let bestMove = null;
  
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      if (board[i][j]==''){
        board[i][j] = 'O';
        let score = minimax(board, false);
        board[i][j] = '';
        if (score > bestScore){
          bestScore = score;
          bestMove = [i,j];
        }
      }
    }
  }
  return bestMove;
}

function minimax(state, maximum){
  let winner = checkWinner();
  if (winner != null){
    if (winner == "X"){return -10}
      else if (winner == "O"){return 10}
        else {return -2}
  }
  
  if (maximum){
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        if (state[i][j]==''){
          state[i][j] = "O";
          let score = minimax(state, false);
          bestScore = max(bestScore, score);
          state[i][j] = '';
        }
      }
    }
    return bestScore;
  }
  else{
     let bestScore = Infinity;
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        if (state[i][j]==''){
          state[i][j] = "X";
          let score = minimax(state, true);
          bestScore = min(bestScore, score);
          state[i][j] = '';
        }
      }
    }
    return bestScore;
    
  }
}
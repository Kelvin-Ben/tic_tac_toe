let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]
let currentPlayer = 'X';
let gameOver = false;

// function to handle user moves
function handleMove(cellId) {
  if (gameOver) return; // return if the game is already over

  const row = Math.floor((cellId - 1) / 3);
  const col = (cellId - 1) % 3;
  if  (board[row][col] === '') {
    board[row][col] = currentPlayer;
    document.getElementById(cellId).textContent = currentPlayer;

    checkGameOver();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (!gameOver) 
      makeAIMove();
  }
}
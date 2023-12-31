let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let currentPlayer = "X";
let gameOver = false;

// function to handle user moves
function handleMove(row, col) {
  if (gameOver) return; // return if the game is already over

  if (board[row][col] === "") {
    board[row][col] = currentPlayer;
    const cellId = row * 3 + col + 1;
    document.getElementById(cellId).textContent = currentPlayer;

    checkGameOver();
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (!gameOver) makeAIMove();
  }
}

// function to make AI moves
function makeAIMove() {
  const emptyCells = [];

  // collect all empty cells
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "") {
        emptyCells.push({ row, col });
      }
    }
  }

  // select random empty cell
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];

    board[row][col] = currentPlayer;
    document.getElementById(row * 3 + col + 1).textContent = currentPlayer;

    checkGameOver();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// function to check if game is over
function checkGameOver() {
  // check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] !== "" &&
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2]
    ) {
      gameOver = true;
      displayResult(board[row][0]);
      return;
    }
  }

  // check column
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] !== "" &&
      board[0][col] === board[1][col] &&
      board[1][col] == board[2][col]
    ) {
      gameOver = true;
      displayResult(board[0][col]);
      return;
    }
  }

  // check for diagonals
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    gameOver = true;
    displayResult(board[0][0]);
    return;
  }

  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    gameOver = true;
    displayResult(board[0][2]);
    return;
  }

  // check if the board is full
  let isBoardFull = true;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "") {
        isBoardFull = false;
        break;
      }
    }
    if (!isBoardFull) {
      break;
    }
  }

  if (isBoardFull) {
    gameOver = true;
    displayResult("tie");
  }
}

// function to display the game result
function displayResult(winner) {
  const resultText = document.querySelector(".text");
  const endGameDiv = document.querySelector(".endgame");
  if (winner === "tie") {
    resultText.textContent = "It's a tie";
  } else {
    resultText.textContent = `Player ${winner} wins`;
  }
  endGameDiv.style.display = "block";
}

function startGame() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  currentPlayer = "X";
  gameOver = false;

  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  const resultText = document.querySelector(".text");
  resultText.textContent = "";
}

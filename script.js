const boardElement = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "Y" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== "" || !isGameActive) return;
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  handleResultValidation();
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}

function createBoard() {
  boardElement.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    boardElement.appendChild(cell);
  }
}

resetBtn.addEventListener('click', resetBoard);

createBoard();

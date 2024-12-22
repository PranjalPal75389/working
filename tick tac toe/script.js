const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");
let turnX = true; // true for X's turn, false for O's turn
let gameOver = false; // Flag to track if the game is over

const winningCombination = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

// Display the current turn
const statusDisplay = document.querySelector("#game-status");

// Set initial game status message
function updateGameStatus() {
  if (gameOver) {
    return; // Don't update status if the game is over
  }

  if (turnX) {
    statusDisplay.innerText = "X's Turn";
  } else {
    statusDisplay.innerText = "O's Turn";
  }
}

// Initialize game status
updateGameStatus();

  
// Event listener for each box
boxes.forEach((box) => {
   
  box.addEventListener("click", (e) => {
    if (gameOver) return; // Ignore clicks if the game is over

    // If the box is already filled, ignore the click
    if (e.target.classList.contains("cross") || e.target.classList.contains("circle")) {
      return;
    }

    // Mark the box with X or O
    if (turnX) {
        container.classList.remove("X")
        container.classList.add("O")  
        e.target.classList.add("cross");
    } else {
        container.classList.remove("O")
        container.classList.add("X")
        e.target.classList.add("circle");
    }

    // Switch turns
    turnX = !turnX;

    // Update the game status message
    updateGameStatus();

    // Check for a winner
    checkWinner();

    // If no winner, check for a draw
    if (!gameOver) {
      checkDraw();
    }
  });
});

// Function to check if there's a winner
function checkWinner() {
  for (let pattern of winningCombination) {
    const [a, b, c] = pattern;

    // Check if all three positions have 'X' or 'O'
    if (
      boxes[a].classList.contains("cross") &&
      boxes[b].classList.contains("cross") &&
      boxes[c].classList.contains("cross")
    ) {
      console.log("X wins!");
      statusDisplay.innerText = "X Wins!";
      gameOver = true;
      return;
    }

    else if (
      boxes[a].classList.contains("circle") &&
      boxes[b].classList.contains("circle") &&
      boxes[c].classList.contains("circle")
    ) {
      console.log("O wins!");
      statusDisplay.innerText = "O Wins!";
      gameOver = true;
      return;
    }
  }
}

// Function to check for a draw
function checkDraw() {
  if (Array.from(boxes).every((box) => box.classList.contains("cross") || box.classList.contains("circle"))) {
    console.log("It's a draw!");
    statusDisplay.innerText = "It's a Draw!";
    gameOver = true;
  }
}

// Reset the game when clicked on a reset button
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetGame);

function resetGame() {
  // Clear all the boxes
  boxes.forEach((box) => {
    box.classList.remove("cross", "circle");
    box.innerText = "";
  });

  // Reset game variables
  gameOver = false;
  turnX = true;

  // Update the game status message
  updateGameStatus();
}

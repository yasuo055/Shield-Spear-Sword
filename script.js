let playerScore = 0;
let computerScore = 0;
let roundWinner = "";

// Logic
function playRound(playerSelection, computerSelection) {
  if (
    playerSelection === computerSelection ||
    computerSelection === playerSelection
  ) {
    roundWinner = "tie";
  } else if (
    (playerSelection === "shield" && computerSelection === "sword") ||
    (playerSelection === "spear" && computerSelection === "shield") ||
    (playerSelection === "sword" && computerSelection === "spear")
  ) {
    roundWinner = "player";
    playerScore++;
  } else {
    roundWinner = "computer";
    computerScore++;
  }

  updateScoreMessage(roundWinner, playerSelection, computerSelection);
}

function getRandomChoice() {
  let cChoice = ["shield", "spear", "sword"];
  let r = Math.floor(Math.random() * 3);
  let computerChoice = cChoice[r];
  return computerChoice;
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}

//UI

const scoreData = document.querySelector("#scoreData");
const scoreMessage = document.querySelector("#scoreMessage");
const playerScorePara = document.querySelector("#playerScore");
const computerScorePara = document.querySelector("#computerScore");
const playerWeapon = document.querySelector("#playerWeapon");
const computerWeapon = document.querySelector("#computerWeapon");
const shieldBtn = document.querySelector("#shieldBtn");
const spearBtn = document.querySelector("#spearBtn");
const swordBtn = document.querySelector("#swordBtn");
const resultGameDialog = document.querySelector("#resultGameDialog");
const resultGameMessage = document.querySelector("#resultGameMessage");
const overlay = document.querySelector("#overlay");
const restartBtn = document.querySelector("#restartBtn");

shieldBtn.addEventListener("click", () => handleClick("shield"));
spearBtn.addEventListener("click", () => handleClick("spear"));
swordBtn.addEventListener("click", () => handleClick("sword"));
restartBtn.addEventListener("click", restartGame);
overlay.addEventListener("click", closeresultGameDialog);

function handleClick(playerSelection) {
  if (isGameOver()) {
    openresultGameDialog();
    return;
  }

  const computerSelection = getRandomChoice();
  playRound(playerSelection, computerSelection);
  updateChoices(playerSelection, computerSelection);
  updateScore();

  if (isGameOver()) {
    openresultGameDialog();
    setFinalMessage();
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "shield":
      playerWeapon.textContent = "🛡️";
      break;
    case "spear":
      playerWeapon.textContent = "🔱";
      break;
    case "sword":
      playerWeapon.textContent = "🗡️";
      break;
  }
  switch (computerSelection) {
    case "shield":
      computerWeapon.textContent = "🛡️";
      break;
    case "spear":
      computerWeapon.textContent = "🔱";
      break;
    case "sword":
      computerWeapon.textContent = "🗡️";
      break;
  }
}

function updateScore() {
  if (roundWinner === "tie") {
    scoreData.textContent = "It's a tie!";
  } else if (roundWinner === "player") {
    scoreData.textContent = "You won!";
  } else if (roundWinner === "computer") {
    scoreData.textContent = "You lost!";
  }

  playerScorePara.textContent = `Player: ${playerScore}`;
  computerScorePara.textContent = `Computer: ${computerScore}`;
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === "player") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} beats ${computerSelection}`;
    return;
  }
  if (winner === "computer") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} is beaten by ${computerSelection}`;
    return;
  }
  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} ties with ${computerSelection}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function openresultGameDialog() {
  resultGameDialog.classList.add("active");
  overlay.classList.add("active");
}

function closeresultGameDialog() {
  resultGameDialog.classList.remove("active");
  overlay.classList.remove("active");
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (resultGameMessage.textContent = "You won, normal!")
    : (resultGameMessage.textContent = "You lost, loser!");
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  scoreData.textContent = "Choose your weapon";
  scoreMessage.textContent = "First to score 5 points wins the game";
  playerScorePara.textContent = "Player: 0";
  computerScorePara.textContent = "Computer: 0";
  playerWeapon.textContent = "❔";
  computerWeapon.textContent = "❔";
  resultGameDialog.classList.remove("active");
  overlay.classList.remove("active");
}

let playerScore = 0;
let computerScore = 0;
let roundWinner = "";




// Logic
function playRound(humanChoice, computerSelection) {
  if (humanChoice === computerSelection || computerSelection === humanChoice) {
    console.log("Tie");
  } else if (
    (humanChoice === "shield" && computerSelection === "sword") ||
    (humanChoice === "spear" && computerSelection === "shield") ||
    (humanChoice === "sword" && computerSelection === "spear")
  ) {
    console.log("Human wins in this round!");
    playerScore++;
  } else {
    console.log("Computer wins in this round!");
    computerScore++;
  }

  //console.log(`Human Score: ${playerScore}, Computer Score: ${computerScore}`);
  updateScoreMessage(roundWinner, humanChoice, computerSelection);
}

function getRandomChoice() {
    let randomNumber = Math.floor(Math.random() * 3)
    switch (randomNumber) {
      case 0:
        return 'shield'
      case 1:
        return 'spear'
      case 2:
        return 'sword'
    }
  }
  

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}



//UI

const scoreInfo = document.querySelector("#scoreInfo");
const scoreMessage = document.querySelector("#scoreMessage");
const playerScorePara = document.querySelector("#playerScore");
const computerScorePara = document.querySelector("#computerScore");
const playerSign = document.querySelector("#playerSign");
const computerSign = document.querySelector("#computerSign");
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

function handleClick(humanChoice) {
  if (isGameOver()) {
    openresultGameDialog();
    return;
  }

  const computerSelection = getRandomChoice();
  playRound(humanChoice, computerSelection);
  updateChoices(humanChoice, computerSelection);
  updateScore();

  if (isGameOver()) {
    openresultGameDialog();
    setFinalMessage();
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "shield":
      playerSign.textContent = "🛡️";
      break;
    case "spear":
      playerSign.textContent = "🔱";
      break;
    case "sword":
      playerSign.textContent = "🗡️";
      break;
  }
  switch (computerSelection) {
    case "shield":
      computerSign.textContent = "🛡️";
      break;
    case "spear":
      computerSign.textContent = "🔱";
      break;
    case "sword":
      computerSign.textContent = "🗡️";
      break;
  }
}

function updateScore() {
    if (roundWinner === 'tie') {
      scoreInfo.textContent = "It's a tie!"
    } else if (roundWinner === 'player') {
      scoreInfo.textContent = 'You won!'
    } else if (roundWinner === 'computer') {
      scoreInfo.textContent = 'You lost!'
    }
  
    playerScorePara.textContent = `Player: ${playerScore}`
    computerScorePara.textContent = `Computer: ${computerScore}`
  }
  
  function updateScoreMessage(winner, playerSelection, computerSelection) {
    if (winner === 'player') {
      scoreMessage.textContent = `${capitalizeFirstLetter(
        playerSelection
      )} beats ${computerSelection.toLowerCase()}`
      return
    }
    if (winner === 'computer') {
      scoreMessage.textContent = `${capitalizeFirstLetter(
        playerSelection
      )} is beaten by ${computerSelection.toLowerCase()}`
      return
    }
    scoreMessage.textContent = `${capitalizeFirstLetter(
        playerSelection
      )} ties with ${computerSelection.toLowerCase()}`
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
      }
      
      function openresultGameDialog() {
        resultGameDialog.classList.add('active')
        overlay.classList.add('active')
      }
      
      function closeresultGameDialog() {
        resultGameDialog.classList.remove('active')
        overlay.classList.remove('active')
      }

      function setFinalMessage() {
        return playerScore > computerScore
          ? (resultGameMessage.textContent = 'You won!')
          : (resultGameMessage.textContent = 'You lost...')
      }
      
      function restartGame() {
        playerScore = 0
        computerScore = 0
        scoreInfo.textContent = 'Choose your weapon'
        scoreMessage.textContent = 'First to score 5 points wins the game'
        playerScorePara.textContent = 'Player: 0'
        computerScorePara.textContent = 'Computer: 0'
        playerSign.textContent = '❔'
        computerSign.textContent = '❔'
        resultGameDialog.classList.remove('active')
        overlay.classList.remove('active')
      }
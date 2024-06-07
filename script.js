let playerScore = 0;
let computerScore = 0;
let roundWinner = "";




// Logic
function playRound(humanChoice, computerSelection) {
  if (humanChoice === computerSelection || computerSelection === humanChoice) {
    console.log("Tie");
  } else if (
    (humanChoice === "rock" && computerSelection === "scissors") ||
    (humanChoice === "paper" && computerSelection === "rock") ||
    (humanChoice === "scissors" && computerSelection === "paper")
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
        return 'rock'
      case 1:
        return 'paper'
      case 2:
        return 'scissors'
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
const rockBtn = document.querySelector("#rockBtn");
const paperBtn = document.querySelector("#paperBtn");
const scissorsBtn = document.querySelector("#scissorsBtn");
const endgameModal = document.querySelector("#endgameModal");
const endgameMsg = document.querySelector("#endgameMsg");
const overlay = document.querySelector("#overlay");
const restartBtn = document.querySelector("#restartBtn");

rockBtn.addEventListener("click", () => handleClick("rock"));
paperBtn.addEventListener("click", () => handleClick("paper"));
scissorsBtn.addEventListener("click", () => handleClick("scissors"));
restartBtn.addEventListener("click", restartGame);
overlay.addEventListener("click", closeEndgameModal);

function handleClick(humanChoice) {
  if (isGameOver()) {
    openEndgameModal();
    return;
  }

  const computerSelection = getRandomChoice();
  playRound(humanChoice, computerSelection);
  updateChoices(humanChoice, computerSelection);
  updateScore();

  if (isGameOver()) {
    openEndgameModal();
    setFinalMessage();
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "rock":
      playerSign.textContent = "🛡️";
      break;
    case "oaper":
      playerSign.textContent = "🔱";
      break;
    case "scissors":
      playerSign.textContent = "🗡️";
      break;
  }
  switch (computerSelection) {
    case "rock":
      computerSign.textContent = "🛡️";
      break;
    case "paper":
      computerSign.textContent = "🔱";
      break;
    case "scissors":
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
      
      function openEndgameModal() {
        endgameModal.classList.add('active')
        overlay.classList.add('active')
      }
      
      function closeEndgameModal() {
        endgameModal.classList.remove('active')
        overlay.classList.remove('active')
      }

      function setFinalMessage() {
        return playerScore > computerScore
          ? (endgameMsg.textContent = 'You won!')
          : (endgameMsg.textContent = 'You lost...')
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
        endgameModal.classList.remove('active')
        overlay.classList.remove('active')
      }
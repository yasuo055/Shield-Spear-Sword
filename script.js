let cChoice = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let round



//for computer choice
function getComputerChoice() {
  let r = Math.floor(Math.random() * 3);
  let computerChoice = cChoice[r];
  return computerChoice;
}

function playRound(humanChoice, computerChoice) {

  if (humanChoice === computerChoice || computerChoice === humanChoice) {
    console.log('Tie');
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    console.log('Human wins in this round!');
 playerScore++;
  } else {
    console.log('Computer wins in this round!');
    computerScore++;
  }

  console.log(`Human Score: ${playerScore}, Computer Score: ${computerScore}`);

}

function playGame() {

  while (playerScore < 5 && computerScore < 5) {
    do {
      humanChoice = prompt(`choices: "rock", "paper", and "scissors" `).toLowerCase();
    } while (!cChoice.includes(humanChoice));

    let computerChoice = getComputerChoice();
    console.log(`Human choice: ${humanChoice}`);
    console.log(`Computer choice: ${computerChoice}`);

    playRound(humanChoice, computerChoice);

    alert(`current Score - Human: ${playerScore}, Computer: ${computerScore}`);

  }
  if  (playerScore === 5) {
    console.log("Human wins!");
  } else {
    console.log("Computer Wins!");
  }

}

playGame();

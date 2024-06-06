let cChoice = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

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
    humanScore++;
  } else {
    console.log('Computer wins in this round!');
    computerScore++;
  }

  console.log(`Human Score: ${humanScore}, Computer Score: ${computerScore}`);

}

function playGame() {

  while (humanScore < 5 && computerScore < 5) {
    do {
      humanChoice = prompt(`choices: "rock", "paper", and "scissors" `).toLowerCase();
    } while (!cChoice.includes(humanChoice));

    let computerChoice = getComputerChoice();
    console.log(`Human choice: ${humanChoice}`);
    console.log(`Computer choice: ${computerChoice}`);

    playRound(humanChoice, computerChoice);

    alert(`current Score - Human: ${humanScore}, Computer: ${computerScore}`);

  }
  if (humanScore === 5) {
    console.log("Human wins!");
  } else {
    console.log("Computer Wins!");
  }

}

playGame();

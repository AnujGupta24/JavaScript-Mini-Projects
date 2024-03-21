let scoreStr = localStorage.getItem("score");
let score;
resetScore(scoreStr);

function resetScore(scoreStr) {
  score = scoreStr
    ? JSON.parse(scoreStr)
    : {
        win: 0,
        lose: 0,
        tie: 0,
      };

  score.displayScore = function () {
    return `Score: Win: ${score.win}, lose: ${score.lose}, tie: ${score.tie}`;
  };

  showResult();
}

function computerChoiceMove() {
  randomNumber = Math.random() * 3;
  let computerChoice = "";
  if (randomNumber > 0 && randomNumber <= 1) {
    computerChoice = "Bat";
  } else if (randomNumber > 1 && randomNumber <= 2) {
    computerChoice = "Ball";
  } else {
    computerChoice = "Stump";
  }
  return computerChoice;
}

function getResult(myMove, computerChoice) {
  if (myMove === "Bat") {
    if (computerChoice === "Ball") {
      score.win++;
      return "You won";
    } else if (computerChoice === "Bat") {
      score.tie++;
      return "Its a tie";
    } else if (computerChoice === "stump") {
      score.lose++;
      return "Computer has won";
    }
  } else if (myMove === "Ball") {
    if (computerChoice === "Ball") {
      score.tie++;
      return "Its a tie";
    } else if (computerChoice === "Bat") {
      score.lose++;
      return "Computer has won";
    } else if (computerChoice === "Stump") {
      score.win++;
      return "You won";
    }
  } else {
    if (computerChoice === "Ball") {
      score.lose++;
      return "Computer has won";
    } else if (computerChoice === "Bat") {
      score.win++;
      return "You won";
    } else {
      score.tie++;
      return "Its a tie";
    }
  }
}

function showResult(myMove, computerChoice, resultMsg) {
  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector("#your-move").innerText = myMove
    ? `you choose ${myMove}`
    : "";
  document.querySelector("#computer-move").innerText = computerChoice
    ? `computer choose ${computerChoice}`
    : "";
  document.querySelector("#result").innerText = resultMsg || "";
  document.querySelector("#score").innerText =
    score.displayScore() !== undefined ? score.displayScore() : "";
}

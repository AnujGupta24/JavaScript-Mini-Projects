// const score = {
// 	Wins: 0,
// 	Losses: 0,
// 	Ties: 0,
// };

/*instead of creating it again we will take the score from the ls and
converting back to obj AND
when page loads we want it Immediately thats why we keep it on top*/
let score = JSON.parse(localStorage.getItem('score')) || {
	Wins: 0,
	Losses: 0,
	Ties: 0,
};

//this will update score the page instant
updateScoreElement();

//adding autoplay feature using async js, with using addEventListner:
let isAutoPlaying = false;
let intervalId;

let autoPlayBtn = document.querySelector('.js-autoPlayBtn');
autoPlayBtn.addEventListener('click', () => {
	autoPlay();
});
function autoPlay() {
	if (!isAutoPlaying) {
		intervalId = setInterval(() => {
			const playerMove = pickComputerMove();
			playGame(playerMove);
		}, 1000);
		isAutoPlaying = true;

		//update autoPlay Btn name when playing:
		autoPlayBtn.innerText = 'Stop Playing';
	} else {
		clearInterval(intervalId);
		isAutoPlaying = false;

		//update autoPlay Btn name when stops playing:
		autoPlayBtn.innerText = 'Auto Play';
	}
}

//adding event listners instead of onclick(function)
document.querySelector('.js-rockBtn').addEventListener('click', () => {
	playGame('Rock');
});
document.querySelector('.js-paperBtn').addEventListener('click', () => {
	playGame('Paper');
});
document.querySelector('.js-scissorsBtn').addEventListener('click', () => {
	playGame('Scissors');
});

//play the game with keyDown event
document.body.addEventListener('keydown', (event) => {
	if (event.key === 'r') {
		playGame('Rock');
	} else if (event.key === 'p') {
		playGame('Paper');
	} else if (event.key === 's') {
		playGame('Scissors');
	} else if (event.key === 'a') {
		autoPlay();
	} else if (event.key === 'Backspace') {
		resetScore();
	}
});

function playGame(playerMove) {
	const computerMove = pickComputerMove();
	let result = '';

	if (playerMove === 'Rock') {
		if (computerMove === 'Rock') {
			result = 'Tie';
		} else if (computerMove === 'Paper') {
			result = 'You Lose';
		} else if (computerMove === 'Scissors') {
			result = 'You Win';
		}
	} else if (playerMove === 'Paper') {
		if (computerMove === 'Rock') {
			result = 'You Win';
		} else if (computerMove === 'Paper') {
			result = 'Tie';
		} else if (computerMove === 'Scissors') {
			result = 'You Lose';
		}
	} else if (playerMove === 'Scissors') {
		if (computerMove === 'Rock') {
			result = 'You Lose';
		} else if (computerMove === 'Paper') {
			result = 'You Win';
		} else if (computerMove === 'Scissors') {
			result = 'Tie';
		}
	}

	//updating score
	if (result === 'You Win') {
		score.Wins += 1;
	} else if (result === 'You Lose') {
		score.Losses += 1;
	} else if (result === 'Tie') {
		score.Ties += 1;
	}

	//setting localStorage
	localStorage.setItem('score', JSON.stringify(score));

	//updating Score
	updateScoreElement();

	//displaying Result using dom
	displayResult(result, playerMove, computerMove);
}

//for reset Score btn
document.querySelector('.js-resetScoreBtn').addEventListener('click', () => {
	resetScore();
});
function resetScore() {
	score.Wins = 0;
	score.Losses = 0;
	score.Ties = 0;

	localStorage.removeItem('score'); //optional
	updateScoreElement();
}

function pickComputerMove() {
	let randomNumber = Math.random();
	let computerMove = '';

	if (randomNumber >= 0 && randomNumber < 1 / 3) {
		computerMove = 'Rock';
	} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
		computerMove = 'Paper';
	} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
		computerMove = 'Scissors';
	}
	return computerMove;
}

// adding dom elements
function updateScoreElement() {
	let scoreElem = document.querySelector('.js-score');
	scoreElem.innerHTML = `Wins: ${score.Wins}. Losses: ${score.Losses}. Ties: ${score.Ties}`;
}

function displayResult(result, playerMove, computerMove) {
	let displayResultElem = document.querySelector('.js-result');
	displayResultElem.innerHTML = `The Result is ${result}`;

	let displayMoveElem = document.querySelector('.js-move');
	//normally we displayed like this:
	// displayMoveElem.innerHTML = `You picked ${playerMove}. Computer picked ${computerMove}`;

	//adding emoji as results. vo bhi dynamic:
	displayMoveElem.innerHTML = `You Picked
					<img class="moveicon" src="images/${playerMove}-emoji.png" />
					<img class="moveicon" src="images/${computerMove}-emoji.png" />
					Computer Picked`;
}

const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

// it describes on each idx there should be same x/o
const winningPositions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

// fnc to init game
const initGame = () => {
	currentPlayer = 'X';
	gameGrid = ['', '', '', '', '', '', '', '', ''];
	// empty all boxes
	boxes.forEach((box, index) => {
		box.innerText = '';
		boxes[index].style.pointerEvents = 'all';
		//initialise box with css properties again
		box.classList = `box box${index + 1}`;
	});
	newGameBtn.classList.remove('active');
	gameInfo.innerText = `Current Player - ${currentPlayer}`;
};
initGame();

const handleClick = (index) => {
	if (gameGrid[index] === '') {
		boxes[index].innerText = currentPlayer;
		gameGrid[index] = currentPlayer;
		boxes[index].style.pointerEvents = 'none';
		// swap the turn on click
		swapTurn();
		// check if anyone has won?
		checkGameOver();
	}
};

boxes.forEach((box, index) => {
	box.addEventListener('click', () => {
		handleClick(index);
	});
});

const swapTurn = () => {
	if (currentPlayer === 'X') {
		currentPlayer = 'O';
	} else {
		currentPlayer = 'X';
	}
	// ui update
	gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

const checkGameOver = () => {
	let answer = '';
	winningPositions.forEach((position) => {
		// all three boxes should be non-empty and exactly same in value
		if (
			(gameGrid[position[0]] === 'X' &&
				gameGrid[position[1]] === 'X' &&
				gameGrid[position[2]] === 'X') ||
			(gameGrid[position[0]] === 'O' &&
				gameGrid[position[1]] === 'O' &&
				gameGrid[position[2]] === 'O')
		) {
			//check if winner is x or o
			if (gameGrid[position[0]] === 'X') answer = 'X';
			else answer = 'O';

			// disable pointer event
			boxes.forEach((box) => {
				box.style.pointerEvents = 'none';
			});

			//now we know who win
			boxes[position[0]].classList.add('win');
			boxes[position[1]].classList.add('win');
			boxes[position[2]].classList.add('win');
		}
	});

	// it means we have a winner
	if (answer !== '') {
		gameInfo.innerText = `Winner Player - ${answer}`;

		newGameBtn.classList.add('active');
		return;
	}

	// check whether it is tie
	let fillCount = 0;
	gameGrid.forEach((box) => {
		if (box !== '') fillCount++;
	});

	// board is filled its Tie
	if (fillCount === 9) {
		gameInfo.innerText = 'Game Tied!';
		newGameBtn.classList.add('active');
	}
};

newGameBtn.addEventListener('click', initGame);

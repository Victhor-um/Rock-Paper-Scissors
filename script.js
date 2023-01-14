const wins = document.querySelector('#playerWin');
const ties = document.querySelector('#ties');
const loses = document.querySelector('#playerLose');
const gamingField = document.querySelector('.gamingField');
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors',
    beatsEmoji: '🖖',
    loseEmoji: '✋',
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock',
    beatsEmoji: '✊',
    loseEmoji: '🖖',
  },
  {
    name: 'scissors',
    emoji: '🖖',
    beats: 'paper',
    beatsEmoji: '✋',
    loseEmoji: '✊',
  },
];

const selectionButtons = document.querySelectorAll('[data-selection');

selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener('click', (e) => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );
    makeSelection(selection);
  });
});

function makeSelection(selection) {
  const computerSelection = randomSelection();
  const winner = isWinner(selection, computerSelection);
  gamingField.children[0].remove();
  addSelectionResult(selection, winner);
}

function isWinner(selection, opponentSelection) {
  if (selection.name === opponentSelection.name) {
    ties.innerText = +ties.innerText + 1;
    return 'draw';
  }
  if (selection.beats === opponentSelection.name) {
    wins.innerText = +wins.innerText + 1;
    return 'win';
  }
  loses.innerText = +loses.innerText + 1;
  return 'lose';
}
function addSelectionResult(selection, winner) {
  const userDiv = document.createElement('div');
  const computerDiv = document.createElement('div');
  userDiv.innerText = selection.emoji;
  if (winner === 'draw') computerDiv.innerText = selection.emoji;

  if (winner === 'win') {
    userDiv.classList.add('winner');
    computerDiv.innerText = selection.beatsEmoji;
  }
  if (winner === 'lose') {
    computerDiv.classList.add('winner');
    computerDiv.innerText = selection.loseEmoji;
  }
  gamingField.children[0].replaceWith(userDiv, computerDiv);
  gamingField.children[1].replaceWith(computerDiv);
}
function randomSelection() {
  const randomIndex = randomInteger(0, 2);
  return SELECTIONS[randomIndex];
}
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], //horizontal
    [0,3,6], [1,4,7], [2,5,8], //vertical
    [0,4,8], [2,4,6]           //diagonal
];

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            cells[a].classList.add("winning");
            cells[b].classList.add("winning");
            cells[c].classList.add("winning");
            statusText.textContent = `Player ${gameBoard[a]} Wins!🚬`
            isGameActive = false;
            return;
        }
    }

    if (!gameBoard.includes("")) {
        statusText.textContent = "It's a Draw!😐";
        isGameActive = false;
    }
}

    function handleClick(e) {
        const index = e.target.dataset.index;

        if(gameBoard[index] !== "" || !isGameActive) return;

        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        checkWinner();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (isGameActive) statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function restartGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        isGameActive = true;
        statusText.textContent = `Player X's Turn`
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winning");
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartBtn.addEventListener('click', restartGame);

    statusText.textContent = `Player ${currentPlayer}'s Turn`;
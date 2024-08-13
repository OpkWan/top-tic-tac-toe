// Gameboard Module
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const updateBoard = (index, marker) => {
        if (!board[index]) {
            board[index] = marker;
        }
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, updateBoard, resetBoard };
})();


// Player Factory
const Player = (name, marker) => {
    return { name, marker };
};


// Game Controller Module
const GameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let isGameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return currentPlayer;
            }
        }
        return board.includes("") ? null : "Tie";
    };

    const makeMove = (index) => {
        if (isGameOver || Gameboard.getBoard()[index]) return;

        Gameboard.updateBoard(index, currentPlayer.marker);
        const winner = checkWinner();

        if (winner) {
            alert(winner === "Tie" ? "It's a tie!" : `${currentPlayer.name} wins!`);
            isGameOver = true;
        } else {
            switchPlayer();
        }
    };

    const resetGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        isGameOver = false;
    };

    return { makeMove, resetGame };
})();


// Display Controller Module
const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.getElementById("restart-btn");

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            GameController.makeMove(index);
            render();
        });
    });

    restartBtn.addEventListener("click", () => {
        GameController.resetGame();
        render();
    });

    const render = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    render();
})();


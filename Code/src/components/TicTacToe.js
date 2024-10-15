import React, { useState } from 'react';
import './TicTacToe.css'; 

const TicTacToe = () => {
    // Initialize state
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    //handle a player clicking a square
    const handleClick = (index) => {
        if (winner || board[index]) return;  

        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const gameWinner = calculateWinner(newBoard);
        if (gameWinner) setWinner(gameWinner);
    };

    //  calculate the winner
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    // restart the game
    const restartGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <div className="game">
            <h1>Tic-Tac-Toe</h1>
            <div className="board">
                {board.map((square, index) => (
                    <button key={index} className="square" onClick={() => handleClick(index)}>
                        {square}
                    </button>
                ))}
            </div>
            <div className="info">
                {winner ? (
                    <h2>{winner} is the winner!</h2>
                ) : (
                    <h2>Next player: {isXNext ? 'X' : 'O'}</h2>
                )}
            </div>
            <button className="restart" onClick={restartGame}>
                Restart Game
            </button>
        </div>
    );
};

export default TicTacToe;

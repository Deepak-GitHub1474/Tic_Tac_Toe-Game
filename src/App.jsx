import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [restartButtonDisabled, setRestartButtonDisabled] = useState(true);
  const winner = calculateWinner(board);

  function calculateWinner(squares) {
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
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i) {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    // Check for win or draw after the move
    const newWinner = calculateWinner(newBoard);
    const isDraw = newBoard.every((square) => square);

    if (newWinner || isDraw) {
      setRestartButtonDisabled(false);
    }
  }

  function restartGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setRestartButtonDisabled(true);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  }

  function getStatus() {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((square) => square)) {
      return "It's a draw!";
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    }
  }

  return (
    <div className="game">
      <div className="game-info">
        <div>{getStatus()}</div>
      </div>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button onClick={restartGame} disabled={restartButtonDisabled} className="restart-btn">
        Restart Game
      </button>
    </div>
  );
}

export default App;

import { createSignal, For } from "solid-js";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = createSignal<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = createSignal(0);

  const xIsNext = () => currentMove() % 2 === 0;
  const currentSquares = () => history()[currentMove()];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history().slice(0, currentMove() + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  return (
    <div class="game">
      <div class="game-board">
        <Board
          xIsNext={xIsNext()}
          squares={currentSquares()}
          onPlay={handlePlay}
        />
      </div>
      <div class="game-info">
        <ol>
          <For each={history()}>
            {(_squares, move) => {
              const description =
                move() > 0
                  ? `Перейти к ходу №${move()}`
                  : "Перейти к началу игры";
              return (
                <li>
                  <button class="history-button" onClick={() => jumpTo(move())}>
                    {description}
                  </button>
                </li>
              );
            }}
          </For>
        </ol>
      </div>
    </div>
  );
}

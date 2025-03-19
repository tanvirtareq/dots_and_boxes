"use client";

import React from "react";
import { getTurnIndicatorColor } from "../utils/ColorUtils";
import { capitalize } from "../utils/utils";
import GameBoard from "./GameBoard";
import useStorage from "../hooks/useStorage";
import { GameConfig } from "../page";

export type Player = "Player 1" | "Player 2";
export type Winner = Player | "tie" | null;

interface GameProps {
  gameConfig: GameConfig;
  resetGame: () => void;
}

const Game: React.FC<GameProps> = ({ gameConfig, resetGame }) => {
  const [turn, setTurn] = useStorage<Player>("turn", "Player 1");
  const [player1Score, setPlayer1Score] = useStorage("player1Score", 0);
  const [player2Score, setPlayer2Score] = useStorage("player2Score", 0);
  const [winner, setWinner] = useStorage<Winner>("winner", null);

  return (
    <div className="app-container">
      <div
        className="turn-indicator"
        style={{
          backgroundColor: getTurnIndicatorColor(winner, turn),
        }}
      >
        {winner ? (
          <>
            <p>Game Over</p>
            {winner === "tie" ? (
              <p>Draw</p>
            ) : (
              <p>Winner: {capitalize(winner)}</p>
            )}
          </>
        ) : (
          <p>{capitalize(turn)} Turn</p>
        )}
        <p>Player 1 Score: {player1Score}</p>
        <p>Player 2 Score: {player2Score}</p>
        <button className="button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <GameBoard
        turn={turn}
        setTurn={setTurn}
        setPlayer1Score={setPlayer1Score}
        setPlayer2Score={setPlayer2Score}
        setWinner={setWinner}
        gameConfig={gameConfig}
      />
    </div>
  );
};

export default Game;

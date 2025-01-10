"use client";

import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import { capitalize } from './utils/utils';

export type Player = "red" | "green";
export type Winner = Player | "tie" | null;

function App() {
  const [turn, setTurn] = useState<Player>('red');
  const [redScore, setRedScore] = useState(0);
  const [greenScore, setGreenScore] = useState(0);
  const [winner, setWinner] = useState<Winner>(null);

  return (
    <div className="app-container">
      <div className="turn-indicator"
        style={{
          backgroundColor: winner ? (winner === "tie" ? "black" : winner) : turn,
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
          <p>
            {capitalize(turn)} Turn
          </p>
        )}
        <p>Red Score: {redScore}</p>
        <p>Green Score: {greenScore}</p>
      </div>
      <GameBoard
        turn={turn}
        setTurn={setTurn}
        setRedScore={setRedScore}
        setGreenScore={setGreenScore}
        setWinner={setWinner}
      />
    </div>
  );
}

export default App;


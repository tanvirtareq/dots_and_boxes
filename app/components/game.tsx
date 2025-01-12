"use client";

import React, { useState } from 'react';
import { getTurnIndicatorColor } from '../utils/ColorUtils';
import { capitalize } from '../utils/utils';
import GameBoard from './GameBoard';
import { Level } from './LevelSelector';

export type Player = "Player 1" | "Player 2";
export type Winner = Player | "tie" | null;

interface GameProps {
  level: Level;
}

const Game: React.FC<GameProps> = ({ level }) => {

  const [turn, setTurn] = useState<Player>('Player 1');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winner, setWinner] = useState<Winner>(null);

  return (
    <div className="app-container">
      <div className="turn-indicator"
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
          <p>
            {capitalize(turn)} Turn
          </p>
        )}
        <p>Player 1 Score: {player1Score}</p>
        <p>Player 2 Score: {player2Score}</p>
      </div>
      <GameBoard
        turn={turn}
        setTurn={setTurn}
        setPlayer1Score={setPlayer1Score}
        setPlayer2Score={setPlayer2Score}
        setWinner={setWinner}
        level={level}
      />
    </div>
  );
}

export default Game;


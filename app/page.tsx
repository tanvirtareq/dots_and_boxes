// page.tsx
"use client";
import React, { useState } from 'react';
import GameBoard from './components/GameBoard';

function App() {
  const [turn, setTurn] = useState<'red' | 'green'>('red');
  const [redScore, setRedScore] = useState(0);
  const [greenScore, setGreenScore] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);

  return (
    <div className="app-container">
      <div className="turn-indicator">
        <div
          style={{
            width: '300px',
            height: '200px',
            backgroundColor: turn === 'red' ? 'red' : 'green',
            marginRight: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10%',
            flexDirection: 'column'
          }}
        >
          {winner ? (
            <>
              <p>Game Over</p>
              <p>Winner: {winner}</p>
            </>
          ) : (
            <>
              {turn === 'red' ? 'Red Turn' : 'Green Turn'}
            </>
          )}
              <p>Red Score: {redScore}</p>
              <p>Green Score: {greenScore}</p>
        </div>
      </div>
      <GameBoard
        turn={turn}
        setTurn={setTurn}
        redScore={redScore}
        setRedScore={setRedScore}
        greenScore={greenScore}
        setGreenScore={setGreenScore}
        setWinner={setWinner}
      />
    </div>
  );
}

export default App;


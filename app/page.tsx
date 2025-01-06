// pages/_app.js
"use client";
import React, { useState } from 'react';
import GameBoard from './components/GameBoard';

function App() {
  const [turn, setTurn] = useState<'red' | 'green'>('red');

  return (
    <div style={{
      backgroundColor: 'grey',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        width: '200px',
        height: '200px',
        backgroundColor: turn === 'red' ? 'red' : 'green',
        marginRight: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }} >
        {turn === 'red' ? 'Red Turn' : 'Green Turn'}
      </div>
      <GameBoard turn={turn} setTurn={setTurn}/>
    </div>
  );
}

export default App;


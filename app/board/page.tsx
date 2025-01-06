// pages/_app.js
import React from 'react';
import GameBoard from '../components/GameBoard';

function App() {
  return (
    <div style={{
      backgroundColor: 'grey',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <GameBoard/>
    </div>
  );
}

export default App;


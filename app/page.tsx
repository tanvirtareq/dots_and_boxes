"use client";
import React, { useEffect, useRef, useState } from "react";
import LevelSelector, { Level } from "./components/LevelSelector";
import Game from "./components/game";

const Page: React.FC = () => {
  const [level, setLevel] = useState<Level | null>(null);

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const stateUpdated = useRef(false);

  useEffect(() => {
    if (stateUpdated.current) {
      return;
    }
    console.log("session storage ", sessionStorage);
    let sessionLevel = sessionStorage.getItem("level");

    if (sessionLevel) {
      sessionLevel = JSON.parse(sessionLevel);
      if (sessionLevel) {
        setLevel(sessionLevel);
      }
    }

    const sessionPlayer1Score = sessionStorage.getItem("player1Score");
    if (sessionPlayer1Score) {
      const sessionPlayer1ScoreNumber = Number(JSON.parse(sessionPlayer1Score));
      setPlayer1Score(sessionPlayer1ScoreNumber);
    }

    const sessionPlayer2Score = sessionStorage.getItem("player2Score");
    if (sessionPlayer2Score) {
      const sessionPlayer2ScoreNumber = Number(JSON.parse(sessionPlayer2Score));
      setPlayer2Score(sessionPlayer2ScoreNumber);
    }
    stateUpdated.current = true;
  }, []);

  useEffect(() => {
    if (!stateUpdated.current) {
      return;
    }
    if (level !== null) {
      sessionStorage.setItem("level", JSON.stringify(level));
    }
    sessionStorage.setItem("player1Score", JSON.stringify(player1Score));
    sessionStorage.setItem("player2Score", JSON.stringify(player2Score));
  }, [level, player1Score, player2Score]);

  const resetGame = () => {
    sessionStorage.clear();
    setLevel(null);
    setPlayer1Score(0);
    setPlayer2Score(0);
  };

  return (
    <div>
      {level === null ? (
        <LevelSelector setLevel={setLevel} />
      ) : (
        <Game
          level={level}
          resetGame={resetGame}
          player1Score={player1Score}
          player2Score={player2Score}
          setPlayer1Score={setPlayer1Score}
          setPlayer2Score={setPlayer2Score}
        />
      )}
    </div>
  );
};

export default Page;

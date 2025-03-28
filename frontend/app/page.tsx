"use client";
import React from "react";
import Game from "./components/game";
import useStorage from "./hooks/useStorage";
import Selector from "./components/Selector";

const levelList = ["Level 1", "Level 2"];
const gameModeList = ["Player vs Player", "Player vs Computer"];

export type Level = (typeof levelList)[number];
export type GameMode = (typeof gameModeList)[number];

export interface GameConfig {
  gameMode?: GameMode;
  level?: Level;
}

const Page: React.FC = () => {
  const [gameConfig, setGameConfig] = useStorage<GameConfig>("gameConfig", {});

  const setGameMode = (gameMode: GameMode) => {
    setGameConfig({ gameMode, level: undefined });
  };

  const setLevel = (level: Level) => {
    setGameConfig((prev) => ({ ...prev, level }));
  };

  const resetGame = () => {
    sessionStorage.clear();
    setGameConfig({});
  };

  return (
    <div>
      {!gameConfig.gameMode ? (
        <Selector
          options={gameModeList}
          setOption={setGameMode}
          label="Select Game Mode"
        />
      ) : gameConfig.gameMode === "Player vs Computer" && !gameConfig.level ? (
        <Selector
          options={levelList}
          setOption={setLevel}
          label="Select Level"
        />
      ) : (
        <Game gameConfig={gameConfig} resetGame={resetGame} />
      )}
    </div>
  );
};

export default Page;

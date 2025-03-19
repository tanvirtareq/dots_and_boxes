"use client";
import React from "react";
import LevelSelector, { Level } from "./components/LevelSelector";
import Game from "./components/game";
import useStorage from "./hooks/useStorage";

const Page: React.FC = () => {
    const [level, setLevel] = useStorage<Level | null>("level", null);

    const resetGame = () => {
        sessionStorage.clear();
        setLevel(null);
    };

    return (
        <div>
            {level === null ? (
                <LevelSelector setLevel={setLevel} />
            ) : (
                <Game level={level} resetGame={resetGame}/>
            )}
        </div>
    );
};

export default Page;
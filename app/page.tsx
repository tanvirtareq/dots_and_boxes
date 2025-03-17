"use client";
import React from "react";
import LevelSelector, { Level } from "./components/LevelSelector";
import Game from "./components/game";
import usePersistedState from "./hooks/usePersistedState";

const Page: React.FC = () => {
    const [level, setLevel] = usePersistedState<Level | null>("gameLevel", null);

    const resetGame = () => {
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
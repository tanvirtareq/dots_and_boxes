"use client";
import React, { useState } from "react";
import LevelSelector, { Level } from "./components/LevelSelector";
import Game from "./components/game";

const Page: React.FC = () => {
    const [level, setLevel] = useState<Level | null>(null);

    return (
        <div>
            {level === null ? (
                <LevelSelector setLevel={setLevel} />
            ) : (
                <Game level={level} />
            )}
        </div>
    );
};

export default Page;
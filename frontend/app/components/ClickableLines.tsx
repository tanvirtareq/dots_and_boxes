"use client";

import React from "react";
import ClickableLine from "./ClickableLine";
import { LineProps } from "../utils/utils";
import { Player } from "./game";
import { GameConfig } from "../page";

interface ClickableLinesProps {
    rad: number;
    gap: number;
    lineMap: Map<string, LineProps>;
    turn: Player;
    gameConfig: GameConfig;
    handleLineClick: (line: LineProps) => void;
};

const ClickableLines: React.FC<ClickableLinesProps> = ({
    rad,
    gap,
    lineMap,
    turn,
    gameConfig,
    handleLineClick,
}) => {

    return (
        <>
            {Array.from(lineMap.values()).map((line: LineProps) => (
                <ClickableLine 
                    key={line.key} 
                    line={line} 
                    rad={rad} 
                    gap={gap}
                    turn={turn}
                    gameConfig={gameConfig}
                    handleLineClick={() => handleLineClick(line)}
                />
            ))}
        </>
    );
};

export default ClickableLines;

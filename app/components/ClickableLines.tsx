"use client";

import React from "react";
import { Player } from "../page";
import ClickableLine from "./ClickableLine";
import { LineProps, BoxProps, isBoxMake } from "../utils/utils";

interface ClickableLinesProps {
    rad: number;
    gap: number;
    turn: Player;
    setTurn: (turn: Player) => void;
    boxMap: Map<string, BoxProps>;
    lineMap: Map<string, LineProps>;
    setLineMap: (lineMap: Map<string, LineProps> | ((prev: Map<string, LineProps>) => Map<string, LineProps>)) => void;
};

const ClickableLines: React.FC<ClickableLinesProps> = ({
    rad,
    gap,
    turn,
    setTurn,
    boxMap,
    lineMap,
    setLineMap,
}) => {

    const handleLineClick = (line: LineProps) => {
        const newLine = { ...line, isClicked: true, clickedBy: turn, clickedAt: new Date() };
        if (!line.isClicked) {
            setLineMap((prev: Map<string, LineProps>) => {
                prev.set(line.key, newLine);
                return new Map(prev);
            });
            if (!isBoxMake(line, boxMap, lineMap)) {
                setTurn(turn === "red" ? "green" : "red");
            }
        }
    };

    return (
        <>
            {Array.from(lineMap.values()).map((line: LineProps) => (
                <ClickableLine 
                    key={line.key} 
                    line={line} 
                    rad={rad} 
                    gap={gap}
                    handleLineClick={handleLineClick} 
                />
            ))}
        </>
    );
};

export default ClickableLines;

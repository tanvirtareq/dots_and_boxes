"use client";

import React from "react";
import ClickableLine from "./ClickableLine";
import { LineProps } from "../utils/utils";
import { Player } from "../page";

interface ClickableLinesProps {
    rad: number;
    gap: number;
    lineMap: Map<string, LineProps>;
    turn: Player;
    handleLineClick: (line: LineProps) => void;
};

const ClickableLines: React.FC<ClickableLinesProps> = ({
    rad,
    gap,
    lineMap,
    turn,
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
                    handleLineClick={() => handleLineClick(line)}
                />
            ))}
        </>
    );
};

export default ClickableLines;

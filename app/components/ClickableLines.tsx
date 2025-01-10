"use client";

import React from "react";
import ClickableLine from "./ClickableLine";
import { LineProps } from "../utils/utils";

interface ClickableLinesProps {
    rad: number;
    gap: number;
    lineMap: Map<string, LineProps>;
    handleLineClick: (line: LineProps) => void;
};

const ClickableLines: React.FC<ClickableLinesProps> = ({
    rad,
    gap,
    lineMap,
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
                    handleLineClick={() => handleLineClick(line)}
                />
            ))}
        </>
    );
};

export default ClickableLines;

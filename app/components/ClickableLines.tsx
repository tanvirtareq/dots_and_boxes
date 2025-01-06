"use client";

import React, { useState } from "react";
import { Line } from "react-konva";

interface ClickableLinesProps {
    size: number;
    rad: number;
    gap: number;
}

const ClickableLines: React.FC<ClickableLinesProps> = ({ size, rad, gap }) => {
    const [clickedLines, setClickedLines] = useState<Set<string>>(new Set());
    const strokeWidth = 10;

    const handleLineClick = (key: string) => {
        setClickedLines((prev) => new Set(prev).add(key));
    };

    const lines = Array.from({ length: size }, (_, i) =>
        Array.from({ length: size }, (_, j) => {
            const horizontalKey = `h-${i}-${j}`;
            const verticalKey = `v-${i}-${j}`;
            return (
                <>
                    {i < size - 1 && (
                        <Line
                            key={horizontalKey}
                            points={[
                                i * gap + 2 * rad,
                                j * gap + 2 * rad,
                                (i + 1) * gap + 2 * rad,
                                j * gap + 2 * rad,
                            ]}
                            stroke={clickedLines.has(horizontalKey) ? "black" : "grey"}
                            strokeWidth={strokeWidth}
                            onClick={() => handleLineClick(horizontalKey)}
                            onMouseEnter={() => (document.body.style.cursor = "pointer")}
                            onMouseLeave={() => (document.body.style.cursor = "default")}
                        />
                    )}
                    {j < size - 1 && (
                        <Line
                            key={verticalKey}
                            points={[
                                i * gap + 2 * rad,
                                j * gap + 2 * rad,
                                i * gap + 2 * rad,
                                (j + 1) * gap + 2 * rad,
                            ]}
                            stroke={clickedLines.has(verticalKey) ? "black" : "grey"}
                            strokeWidth={strokeWidth}
                            onClick={() => handleLineClick(verticalKey)}
                            onMouseEnter={() => (document.body.style.cursor = "pointer")}
                            onMouseLeave={() => (document.body.style.cursor = "default")}
                        />
                    )}
                </>
            );
        })
    );

    return <>{lines.flat()}</>;
};

export default ClickableLines;

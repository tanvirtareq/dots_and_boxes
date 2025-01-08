"use client";

import React, { useState } from "react";
import { Line, Rect } from "react-konva";
import { Player, Winner } from "../page";

interface ClickableLinesProps {
    size: number;
    rad: number;
    gap: number;
    turn: Player;
    setTurn: (turn: Player) => void;
    redScore: number;
    setRedScore: (score: number) => void;
    greenScore: number;
    setGreenScore: (score: number) => void;
    setWinner: (winner: Winner) => void;
}

const ClickableLines: React.FC<ClickableLinesProps> = ({
    size,
    rad,
    gap,
    turn,
    setTurn,
    redScore,
    setRedScore,
    greenScore,
    setGreenScore,
    setWinner
}) => {
    const [clickedLines, setClickedLines] = useState<Set<string>>(new Set());
    const [completedBoxes, setCompletedBoxes] = useState<Set<string>>(new Set());
    const strokeWidth = 15;
    const hitStrokeWidth = strokeWidth*3;

    const handleLineClick = (key: string, i: number, j: number, isHorizontal: boolean) => {
        if (!clickedLines.has(key)) {
            const newClickedLines = new Set(clickedLines).add(key);
            setClickedLines(newClickedLines);

            const boxes = checkForCompletedBoxes(newClickedLines, i, j, isHorizontal, turn);
            handleCompletedBoxes(boxes, turn);

            if (newClickedLines.size === 2 * size * (size - 1)) {
                determineWinner();
            }
        }
    };

    const handleCompletedBoxes = (boxes: string[], turn: Player) => {
        if (boxes.length > 0) {
            setCompletedBoxes(prev => new Set([...prev, ...boxes]));
            if (turn === "red") {
                setRedScore(redScore + boxes.length);
            } else {
                setGreenScore(greenScore + boxes.length);
            }
        } else {
            setTurn(turn === "red" ? "green" : "red");
        }
    };

    const determineWinner = () => {
        setWinner(redScore > greenScore ? "red" : redScore < greenScore ? "green" : "tie");
    };

    const checkForCompletedBoxes = (lines: Set<string>, i: number, j: number, isHorizontal: boolean, turn: Player) => {
        const boxes: string[] = [];

        const checkBox = (x: number, y: number) => {
            const top = `h-${x}-${y}`;
            const bottom = `h-${x}-${y + 1}`;
            const left = `v-${x}-${y}`;
            const right = `v-${x + 1}-${y}`;
            if (lines.has(top) && lines.has(bottom) && lines.has(left) && lines.has(right)) {
                return `${x}-${y}-${turn}`;
            }
            return null;
        };

        const addBoxIfCompleted = (i: number, j: number) => {
            const box = checkBox(i, j);
            if (box) boxes.push(box);
        };

        if (isHorizontal) {
            if (j > 0) addBoxIfCompleted(i, j - 1);
            if (j < size - 1) addBoxIfCompleted(i, j);
        } else {
            if (i > 0) addBoxIfCompleted(i - 1, j);
            if (i < size - 1) addBoxIfCompleted(i, j);
        }

        return boxes;
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
                            hitStrokeWidth={hitStrokeWidth}
                            onClick={(event) => {
                                event.evt.preventDefault();
                                handleLineClick(horizontalKey, i, j, true);
                            }}
                            onTap={(event) => {
                                event.evt.preventDefault();
                                handleLineClick(horizontalKey, i, j, true);
                            }}
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
                            hitStrokeWidth={hitStrokeWidth}
                            onClick={(event) => {
                                event.evt.preventDefault();
                                handleLineClick(verticalKey, i, j, false);
                            }}
                            onTap={(event) => {
                                event.evt.preventDefault();
                                handleLineClick(verticalKey, i, j, false);
                            }}
                            onMouseEnter={() => (document.body.style.cursor = "pointer")}
                            onMouseLeave={() => (document.body.style.cursor = "default")}
                        />
                    )}
                </>
            );
        })
    );

    const boxes = React.useMemo(() => {
        return Array.from(completedBoxes).map(key => {
            const [x, y, boxWinner] = key.split('-');
            return (
                <Rect
                    key={key}
                    x={parseInt(x) * gap + 2 * rad + strokeWidth / 2}
                    y={parseInt(y) * gap + 2 * rad + strokeWidth / 2}
                    width={gap - strokeWidth}
                    height={gap - strokeWidth}
                    fill={boxWinner}
                />
            );
        });
    }, [completedBoxes, gap, rad, strokeWidth]);

    return (
        <>
            {lines.flat()}
            {boxes}
        </>
    );
};

export default ClickableLines;

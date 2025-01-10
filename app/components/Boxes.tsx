import { Rect } from "react-konva";
import React from "react";
import { BoxProps } from "../utils/utils";

export default function Boxes({ boxMap, gap, rad, handleBoxClick }: { boxMap: Map<string, BoxProps>, gap: number, rad: number, handleBoxClick: (box: BoxProps) => void }) {
    return Array.from(boxMap.values()).map(box => {
        return (
            <Rect
            key={box.key}
            x={box.lineTop.p1.x * gap + 2 * rad}
            y={box.lineTop.p1.y * gap + 2 * rad}
            width={gap}
            height={gap}
            fill={box.isCompleted ? (box.winner === "red" ? "red" : "green") : undefined}
            onClick={() => handleBoxClick(box)}
            onTap={() => handleBoxClick(box)}
            />
        );
    });
}
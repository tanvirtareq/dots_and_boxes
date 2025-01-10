import { Rect } from "react-konva";
import React from "react";
import { BoxProps } from "../utils/utils";

export default function Boxes({ boxMap, gap, rad }: { boxMap: Map<string, BoxProps>, gap: number, rad: number }) {
    return Array.from(boxMap.values()).map(box => {
        if (!box.isCompleted) {
            return null;
        }
        return (
            <Rect
                key={box.key}
                x={box.lineTop.p1.x * gap + 2 * rad}
                y={box.lineTop.p1.y * gap + 2 * rad}
                width={gap}
                height={gap}
                fill={box.winner === "red" ? "red" : "green"}
            />
        );
    });
}
import React from 'react';
import { LineProps } from '../utils/utils';
import { Line } from 'react-konva';
import { Player } from '../page';
import { getLineColor } from '../utils/ColorUtils';

interface ClickableLineProps {
    line: LineProps;
    rad: number;
    gap: number;
    turn: Player;
    handleLineClick: (line: LineProps) => void;
}

const ClickableLine: React.FC<ClickableLineProps> = ({ line, gap, rad, turn, handleLineClick }) => {
    const strokeWidth = 15;
    const hitStrokeWidth = strokeWidth*3;

    const handleClick = () => {
        if (turn === "green") return;

        handleLineClick(line);
    };

    return (
        <Line
            key={line.key}
            points={[
                line.p1.x * gap + 2 * rad,
                line.p1.y * gap + 2 * rad,
                line.p2.x * gap + 2 * rad,
                line.p2.y * gap + 2 * rad,
            ]}
            stroke={getLineColor(line)}
            strokeWidth={strokeWidth}
            hitStrokeWidth={!line.isClicked ? hitStrokeWidth : 0}
            onClick={handleClick}
            onTap={handleClick}
            onMouseEnter={() => (document.body.style.cursor = turn === "red" ? "pointer" : "default")}
            onMouseLeave={() => (document.body.style.cursor = "default")}
        />
    );
};

export default ClickableLine;
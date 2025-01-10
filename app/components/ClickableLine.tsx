import React from 'react';
import { LineProps } from '../utils/utils';
import { Line } from 'react-konva';

interface ClickableLineProps {
    line: LineProps;
    rad: number;
    gap: number;
    handleLineClick: (line: LineProps) => void;
}

const ClickableLine: React.FC<ClickableLineProps> = ({ line, gap, rad, handleLineClick }) => {
    const strokeWidth = 15;
    const hitStrokeWidth = strokeWidth*3;

    return (
        <Line
            key={line.key}
            points={[
                line.p1.x * gap + 2 * rad,
                line.p1.y * gap + 2 * rad,
                line.p2.x * gap + 2 * rad,
                line.p2.y * gap + 2 * rad,
            ]}
            stroke={line.isClicked ? "black" : "grey"}
            strokeWidth={strokeWidth}
            hitStrokeWidth={hitStrokeWidth}
            onClick={(event) => {
                event.evt.preventDefault();
                handleLineClick(line);
            }}
            onTap={(event) => {
                event.evt.preventDefault();
                handleLineClick(line);
            }}
            onMouseEnter={() => (document.body.style.cursor = "pointer")}
            onMouseLeave={() => (document.body.style.cursor = "default")}
        />
    );
};

export default ClickableLine;
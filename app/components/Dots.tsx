import { Circle } from "react-konva";
import React from "react";
import { PointProps } from "../utils/utils";

const Dots: React.FC<{
  pointMap: Map<string, PointProps>;
  gap: number;
  rad: number;
  handlePointClick: (point: PointProps) => void;
}> = ({ pointMap, gap, rad, handlePointClick }) => {

  return Array.from(pointMap.values()).map((point: PointProps) => (
    <Circle
      key={point.key}
      x={point.x * gap + 2 * rad}
      y={point.y * gap + 2 * rad}
      radius={rad}
      fill="black"
      onClick={() => handlePointClick(point)}
      onTap={() => handlePointClick(point)}
    />
  ));
};

export default Dots;

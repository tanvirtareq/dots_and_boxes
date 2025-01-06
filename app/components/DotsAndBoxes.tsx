"use client"
import React, { useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Line {
  p1: Point;
  p2: Point;
}

const gridSize = 8; // Adjust the grid size as needed

const DotsAndBoxes: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [boxes, setBoxes] = useState<Point[]>([]); // Store top-left corner of completed boxes

  const handleLineClick = (p1: Point, p2: Point) => {
    const newLine: Line = { p1, p2 };

    // Check if the line already exists
    if (lines.some(
        (line) =>
          (line.p1.x === newLine.p1.x &&
            line.p1.y === newLine.p1.y &&
            line.p2.x === newLine.p2.x &&
            line.p2.y === newLine.p2.y) ||
          (line.p1.x === newLine.p2.x &&
            line.p1.y === newLine.p2.y &&
            line.p2.x === newLine.p1.x &&
            line.p2.y === newLine.p1.y)
      )) {
      return;
    }

    setLines([...lines, newLine]);
    checkForCompletedBoxes([...lines, newLine]);
  };

  const checkForCompletedBoxes = (currentLines: Line[]) => {
    const newBoxes: Point[] = [];

    for (let x: number = 0; x < gridSize - 1; x++) {
      for (let y: number = 0; y < gridSize - 1; y++) {
        const topLeft: Point = { x: x, y: y};
        const topRight: Point = { x: x + 1, y: y };
        const bottomLeft: Point = { x: x, y: y + 1 };
        const bottomRight: Point = { x: x + 1, y: y + 1 };

        const hasTop = currentLines.some(
          (line) =>
            (line.p1.x === topLeft.x &&
              line.p1.y === topLeft.y &&
              line.p2.x === topRight.x &&
              line.p2.y === topRight.y) ||
            (line.p1.x === topRight.x &&
              line.p1.y === topRight.y &&
              line.p2.x === topLeft.x &&
              line.p2.y === topLeft.y)
        );
        const hasRight = currentLines.some(
          (line) =>
            (line.p1.x === topRight.x &&
              line.p1.y === topRight.y &&
              line.p2.x === bottomRight.x &&
              line.p2.y === bottomRight.y) ||
            (line.p1.x === bottomRight.x &&
              line.p1.y === bottomRight.y &&
              line.p2.x === topRight.x &&
              line.p2.y === topRight.y)
        );
        const hasBottom = currentLines.some(
          (line) =>
            (line.p1.x === bottomLeft.x &&
              line.p1.y === bottomLeft.y &&
              line.p2.x === bottomRight.x &&
              line.p2.y === bottomRight.y) ||
            (line.p1.x === bottomRight.x &&
              line.p1.y === bottomRight.y &&
              line.p2.x === bottomLeft.x &&
              line.p2.y === bottomLeft.y)
        );
        const hasLeft = currentLines.some(
          (line) =>
            (line.p1.x === topLeft.x &&
              line.p1.y === topLeft.y &&
              line.p2.x === bottomLeft.x &&
              line.p2.y === bottomLeft.y) ||
            (line.p1.x === bottomLeft.x &&
              line.p1.y === bottomLeft.y &&
              line.p2.x === topLeft.x &&
              line.p2.y === topLeft.y)
        );

        if (hasTop && hasRight && hasBottom && hasLeft) {
          newBoxes.push(topLeft);
        }
      }
    }
    setBoxes([...boxes, ...newBoxes]);
  };
  const renderDots = () => {
    const dots = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        dots.push(
          <div
            key={`${x}-${y}`}
            className="w-6 h-6 rounded-full bg-gray-600 absolute"
            style={{ left: x * 60, top: y * 60, zIndex: 10 }}
          />
        );
      }
    }
    return dots;
  };

  const renderLines = () => {
    return lines.map((line, index) => {
      const x1 = line.p1.x * 80;
      const y1 = line.p1.y * 80;
      const x2 = line.p2.x * 80;
      const y2 = line.p2.y * 80;
      const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

      return (
        <div
          key={index}
          className="bg-black absolute"
          style={{
            width: length,
            height: 4,
            left: x1 + 8, // Adjust for dot radius
            top: y1 + 8, // Adjust for dot radius
            transform: `rotate(${angle}deg)`,
            transformOrigin: '0 0',
          }}
        />
      );
    });
  };
  const renderBoxes = () => {
    return boxes.map((box, index) => (
      <div
        key={index}
        className="absolute bg-blue-200 opacity-50"
        style={{
          left: box.x * 40 + 12,
          top: box.y * 40 + 12,
          width: 32,
          height: 32,
        }}
      />
    ));
  };

  const renderClickableLines = () => {
    const clickableLines = [];
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (x < gridSize - 1) {
                clickableLines.push(
                    <div
                        key={`h-${x}-${y}`}
                        className="absolute h-4 w-10 cursor-pointer"
                        style={{left: x * 40 + 16, top: y * 40 + 8}}
                        onClick={() => handleLineClick({x, y}, {x: x + 1, y})}
                    />
                )
            }
            if (y < gridSize - 1) {
                clickableLines.push(
                    <div
                        key={`v-${x}-${y}`}
                        className="absolute w-4 h-10 cursor-pointer"
                        style={{left: x * 40 + 8, top: y * 40 + 16}}
                        onClick={() => handleLineClick({x, y}, {x, y: y + 1})}
                    />
                )
            }
        }
    }
    return clickableLines
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      {renderDots()}
      {renderLines()}
      {renderBoxes()}
      {renderClickableLines()}
    </div>
  );
};

export default DotsAndBoxes;



"use client";
import { Stage, Layer } from "react-konva";
import { Player, Winner } from "../page";
import {
  BoxProps,
  getAllPoints,
  getAllLines,
  getAllBoxes,
  LineProps,
  PointProps,
  isBoxMake,
  getAdjecentLine,
} from "../utils/utils";
import { useState, useEffect } from "react";
import Dots from "./Dots";
import ClickableLines from "./ClickableLines";
import Boxes from "./Boxes";
import { computerMove } from "../game/GameLogic";

const size = 6;
const gap = 65;
const rad = 15;

export default function GameBoard({
  turn,
  setTurn,
  setRedScore,
  setGreenScore,
  setWinner,
}: {
  turn: Player;
  setTurn: (turn: Player) => void;
  setRedScore: (redScore: number) => void;
  setGreenScore: (greenScore: number) => void;
  setWinner: (winner: Winner) => void;
}) {
  const [lineMap, setLineMap] = useState<Map<string, LineProps>>(() =>
    getAllLines(size)
  );

  const [boxMap, setBoxMap] = useState<Map<string, BoxProps>>(() =>
    getAllBoxes(size)
  );

  const pointMap = getAllPoints(size);

  useEffect(() => {
    const newRedScore = Array.from(boxMap.values()).filter(
      (box) => box.winner === "red"
    ).length;
    const newGreenScore = Array.from(boxMap.values()).filter(
      (box) => box.winner === "green"
    ).length;
    setRedScore(newRedScore);
    setGreenScore(newGreenScore);

    const allBoxesCompleted = Array.from(boxMap.values()).every(
      (box) => box.isCompleted
    );
    if (allBoxesCompleted) {
      if (newRedScore > newGreenScore) {
        setWinner("red");
      } else if (newGreenScore > newRedScore) {
        setWinner("green");
      } else {
        setWinner("tie");
      }
    }
  }, [boxMap]);

  useEffect(() => {
    const newBoxMap = new Map(boxMap);

    boxMap.forEach((box) => {
      if (box.isCompleted) {
        return;
      }

      const lines = [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight]
        .map((l) => lineMap.get(l.key))
        .filter((l): l is LineProps => l !== undefined);

      if (lines.every((l) => l?.isClicked)) {
        box.isCompleted = true;
        lines.sort(
          (a, b) =>
            (b.clickedAt ? b.clickedAt.getTime() : 0) -
            (a.clickedAt ? a.clickedAt.getTime() : 0)
        );
        box.winner = lines[0].clickedBy!;
        newBoxMap.set(box.key, box);
      }
    });

    setBoxMap(newBoxMap);
  }, [lineMap]);

  useEffect(() => {
    if (turn === "green") {
      computerMove(boxMap, lineMap, handleLineClick);
    }
  }, [lineMap]);

  const handleLineClick = (line: LineProps) => {
    const newLine = {
      ...line,
      isClicked: true,
      clickedBy: turn,
      clickedAt: new Date(),
    };
    if (!line.isClicked) {
      setLineMap((prev: Map<string, LineProps>) => {
        prev.set(line.key, newLine);
        return new Map(prev);
      });
      if (!isBoxMake(line, boxMap, lineMap)) {
        setTurn(turn === "red" ? "green" : "red");
      }
    }
  };

  const handlePointClick = (point: PointProps) => {
    const lines = getAdjecentLine(point, lineMap);

    if (lines.length === 1 && lines[0] !== undefined) {
      handleLineClick(lines[0]);
    }
  };

  const handleBoxClick = (box: BoxProps) => {
    const lines = [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight]
      .map((l) => lineMap.get(l.key))
      .filter((l) => l?.isClicked === false);

    if (lines.length === 1 && lines[0] !== undefined) {
      handleLineClick(lines[0]);
    }
  };

  return (
    <div className="game-board">
      <Stage width={400} height={400}>
        <Layer>
          <Boxes
            boxMap={boxMap}
            gap={gap}
            rad={rad}
            handleBoxClick={handleBoxClick}
          />
          <ClickableLines
            gap={gap}
            rad={rad}
            lineMap={lineMap}
            turn={turn}
            handleLineClick={handleLineClick}
          />
          <Dots
            pointMap={pointMap}
            gap={gap}
            rad={rad}
            handlePointClick={handlePointClick}
          />
        </Layer>
      </Stage>
    </div>
  );
}

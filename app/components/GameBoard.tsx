"use client"
import { Stage, Layer } from "react-konva";
import { Player, Winner } from "../page";
import { BoxProps, getAllLines, getAllBoxes, LineProps } from "../utils/utils";
import { useState, useEffect } from "react";
import Dots from "./Dots";
import ClickableLines from "./ClickableLines";
import Boxes from "./Boxes";

const size = 6;
const gap = 65;
const rad = 15;

export default function GameBoard({
  turn,
  setTurn,
  setRedScore,
  setGreenScore,
  setWinner
}: {
  turn: Player,
  setTurn: (turn: Player) => void,
  setRedScore: (redScore: number) => void,
  setGreenScore: (greenScore: number) => void,
  setWinner: (winner: Winner) => void
}) {

  const [lineMap, setLineMap] = useState<Map<string, LineProps>>(() => getAllLines(size));

  const [boxMap, setBoxMap] = useState<Map<string, BoxProps>>(() => getAllBoxes(size));

  useEffect(() => {
    const newRedScore = Array.from(boxMap.values()).filter(box => box.winner === 'red').length;
    const newGreenScore = Array.from(boxMap.values()).filter(box => box.winner === 'green').length;
    setRedScore(newRedScore);
    setGreenScore(newGreenScore);

    const allBoxesCompleted = Array.from(boxMap.values()).every(box => box.isCompleted);
    if (allBoxesCompleted) {
      if (newRedScore > newGreenScore) {
        setWinner('red');
      } else if (newGreenScore > newRedScore) {
        setWinner('green');
      } else {
        setWinner('tie');
      }
    }
  }, [boxMap]);

  useEffect(() => {
    const newBoxMap = new Map(boxMap);

    boxMap.forEach((box) => {
      if (box.isCompleted) {
        return;
      }

      const lines = [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight].map((l) => lineMap.get(l.key)).filter((l): l is LineProps => l !== undefined);

      if (lines.every((l) => l?.isClicked)) {
        box.isCompleted = true;
        lines.sort((a, b) => (b.clickedAt ? b.clickedAt.getTime() : 0) - (a.clickedAt ? a.clickedAt.getTime() : 0));
        box.winner = lines[0].clickedBy!;
        newBoxMap.set(box.key, box);
      }

    });

    setBoxMap(newBoxMap);
  }, [lineMap]);

  return (
    <div className="game-board">
      <Stage width={400} height={400}>
        <Layer>
          <Boxes boxMap={boxMap} gap={gap} rad={rad} />
          <ClickableLines
            gap={gap}
            rad={rad}
            turn={turn}
            setTurn={setTurn}
            boxMap={boxMap}
            lineMap={lineMap}
            setLineMap={setLineMap}
          />
          <Dots size={size} gap={gap} rad={rad} />
        </Layer>
      </Stage>
    </div>
  );
}
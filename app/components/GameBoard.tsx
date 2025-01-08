"use client"
import { Stage, Layer } from "react-konva";
import  Dots from "./Dots";
import ClickableLines from "./ClickableLines";
import { Player, Winner } from "../page";

const size = 6;
const gap = 65;
const rad = 15;

export default function GameBoard({
  turn,
  setTurn,
  redScore,
  setRedScore,
  greenScore,
  setGreenScore,
  setWinner
}: {
  turn: Player,
  setTurn: (turn: Player) => void,
  redScore: number,
  setRedScore: (redScore: number) => void,
  greenScore: number,
  setGreenScore: (greenScore: number) => void,
  setWinner: (winner: Winner) => void
}) {
  return (
    <div className="game-board">
      <Stage width={400} height={400}>
        <Layer>
          <ClickableLines
            size={size}
            gap={gap}
            rad={rad}
            turn={turn}
            setTurn={setTurn}
            redScore={redScore}
            setRedScore={setRedScore}
            greenScore={greenScore}
            setGreenScore={setGreenScore}
            setWinner={setWinner}
          />
          <Dots size={size} gap={gap} rad={rad}/>
        </Layer>
      </Stage>
    </div>
  );
}


"use client"
import { Stage, Layer} from "react-konva";
import  Dots from "./Dots";
import ClickableLines from "./ClickableLines";

const size: number = 8;
const gap: number = 50;
const rad: number = 10;

export default function GameBoard({
  turn,
  setTurn,
  redScore,
  setRedScore,
  greenScore,
  setGreenScore,
  setWinner
}: {
  turn: "red" | "green",
  setTurn: (turn: "red" | "green") => void,
  redScore: number,
  setRedScore: (redScore: number) => void,
  greenScore: number,
  setGreenScore: (greenScore: number) => void,
  setWinner: (winner: string | null) => void
}) {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "400px",
        width: "400px",
        padding: "5px",
        borderRadius: "5%",
        display: "flex",
      }}
    >

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


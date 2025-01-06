"use client"
import { Stage, Layer} from "react-konva";
import  Dots from "./Dots";
import ClickableLines from "./ClickableLines";

const size: number = 8;
const gap: number = 60;
const rad: number = 10;

export default function GameBoard({turn, setTurn}: {turn: "red" | "green", setTurn: (turn: "red" | "green") => void}) {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "500px",
        width: "500px",
        padding: "20px",
        borderRadius: "5%",
        display: "flex",
      }}
    >

      <Stage width={500} height={500}>
        <Layer>
          <ClickableLines size={size} gap={gap} rad={rad} turn={turn} setTurn={setTurn}/>
          <Dots size={size} gap={gap} rad={rad}/>
        </Layer>
      </Stage>
    </div>
  );
}

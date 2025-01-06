import DotsAndBoxes from "./DotsAndBoxes";

export default function GameBoard() {
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
      <DotsAndBoxes />
    </div>
  );
}

import { BoxProps, LineProps } from "./utils";

const boxColorForRedPlayer = "#ff0000";
const boxColorForGreenPlayer = "#32CD32";

const lineColorForRedPlayer = "#960000";
const lineColorForGreenPlayer = "green";

const dotColor = "#000302";

export function getBoxColor(box: BoxProps) {
    if (box.isCompleted) {
        return box.winner === "red" ? boxColorForRedPlayer : boxColorForGreenPlayer;
    }
    return "white";
}

export function getLineColor(line: LineProps) {
    if (line.isClicked) {
        return line.clickedBy === "red" ? lineColorForRedPlayer : lineColorForGreenPlayer;
    }
    return "grey";
}

export function getDotColor() {
    return dotColor;
}
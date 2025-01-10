import { BoxProps, LineProps } from "../utils/utils";

export function computerMove(
  boxMap: Map<string, BoxProps>,
  lineMap: Map<string, LineProps>,
  handleLineClick: (line: LineProps) => void
) {
    const potentialLineKeys = Array.from(boxMap.values())
        .filter((box) => [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight].filter((line) => lineMap.get(line.key)?.isClicked ).length === 3)
        .flatMap((box) => [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight].filter((line) => !lineMap.get(line.key)?.isClicked))
        .map((line) => line.key);

    if (potentialLineKeys.length > 0) {
        const line = lineMap.get(potentialLineKeys[0]);
        if (line) {
            handleLineClick(line);
            return;
        }
    }
    const riskyLineKeys = Array.from(boxMap.values())
        .filter((box) => [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight].filter((line) => lineMap.get(line.key)?.isClicked).length === 2)
        .flatMap((box) => [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight].filter((line) => !lineMap.get(line.key)?.isClicked))
        .map((line) => line.key);
  
    const unclickedLineKeys = Array.from(lineMap.values()).filter((line) => !lineMap.get(line.key)?.isClicked && !riskyLineKeys.includes(line.key))
        .map((line) => line.key);

    if (unclickedLineKeys.length > 0) {
        const line = lineMap.get(unclickedLineKeys[Math.floor(Math.random() * riskyLineKeys.length)]);
        if (line) {
            handleLineClick(line);
            return;
        }
    }
    if (riskyLineKeys.length > 0) {
        const line = lineMap.get(riskyLineKeys[Math.floor(Math.random() * riskyLineKeys.length)]);
        if (line) {
            handleLineClick(line);
            return;
        }
    }
}
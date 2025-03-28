import { BoxProps, LineProps } from "../utils/utils";

function getPotentialLineKeys(boxMap: Map<string, BoxProps>, lineMap: Map<string, LineProps>) {
    return Array.from(boxMap.values())
        .filter((box) => [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight].filter((line) => lineMap.get(line.key)?.isClicked ).length === 3)
        .flatMap((box) => [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight].filter((line) => !lineMap.get(line.key)?.isClicked))
        .map((line) => line.key);
}

function getRiskyLineKeys(boxMap: Map<string, BoxProps>, lineMap: Map<string, LineProps>) {
    return Array.from(boxMap.values())
        .filter((box) => [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight].filter((line) => lineMap.get(line.key)?.isClicked).length === 2)
        .flatMap((box) => [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight].filter((line) => !lineMap.get(line.key)?.isClicked))
        .map((line) => line.key);
}

function handleEasyMove( boxMap: Map<string, BoxProps>, lineMap: Map<string, LineProps>, handleLineClick: (line: LineProps) => void) {

    const potentialLineKeys = getPotentialLineKeys(boxMap, lineMap);

    if (potentialLineKeys.length > 0) {
        const line = lineMap.get(potentialLineKeys[0]);
        if (line) {
            handleLineClick(line);
            return true;
        }
    }
    const riskyLineKeys = getRiskyLineKeys(boxMap, lineMap);
  
    const unclickedLineKeys = Array.from(lineMap.values()).filter((line) => !line?.isClicked && !riskyLineKeys.includes(line.key))
        .map((line) => line.key);

    if (unclickedLineKeys.length > 0) {
        const line = lineMap.get(unclickedLineKeys[Math.floor(Math.random() * unclickedLineKeys.length)]);
        if (line) {
            handleLineClick(line);
            return true;
        }
    }

    return false;
}

export function computerMoveLevel1( boxMap: Map<string, BoxProps>, lineMap: Map<string, LineProps>, handleLineClick: (line: LineProps) => void) {

    if (handleEasyMove(boxMap, lineMap, handleLineClick)) {
        return;
    }

    const riskyLineKeys = getRiskyLineKeys(boxMap, lineMap);
    
    if (riskyLineKeys.length > 0) {
        const line = lineMap.get(riskyLineKeys[Math.floor(Math.random() * riskyLineKeys.length)]);
        if (line) {
            handleLineClick(line);
            return;
        }
    }
}


export function computerMoveLevel2( boxMap: Map<string, BoxProps>, lineMap: Map<string, LineProps>, handleLineClick: (line: LineProps) => void) {

    if (handleEasyMove( boxMap, lineMap, handleLineClick )) {
        return;
    }

    const riskyLineKeys = getRiskyLineKeys(boxMap, lineMap);

    const lineAndImpact = riskyLineKeys
        .map((lineKey) => ({ line: lineMap.get(lineKey), impact: getLineImpact(lineMap.get(lineKey)!, boxMap, lineMap) }))
        .sort((a, b) => a.impact - b.impact);
    
    if (lineAndImpact.length > 0) {
        const line = lineAndImpact[0].line;
        if (line) {
            handleLineClick(line);
            return;
        }
    }
  }


function pointCanGet(boxMap: Map<string, BoxProps>, lineMap: Map<string, LineProps>): number {
    const boxes = Array.from(boxMap.values()).filter((box) => [box.lineTop, box.lineBottom, box.lineLeft, box.lineRight].filter((line) => lineMap.get(line.key)?.isClicked).length === 3);

    if (boxes.length === 0) {
        return 0;
    }

    const line = [boxes[0].lineTop, boxes[0].lineBottom, boxes[0].lineLeft, boxes[0].lineRight].filter((line) => !lineMap.get(line.key)?.isClicked)[0];

    const newLineMap = new Map(lineMap);
    newLineMap.set(line.key, { ...line, isClicked: true });

    return 1 + pointCanGet(boxMap, newLineMap);
}
  
function getLineImpact(line: LineProps, boxMap: Map<string, BoxProps>, lineMap: Map<string, LineProps>): number {
    const newLineMap = new Map(lineMap);
    newLineMap.set(line.key, { ...line, isClicked: true });
    
    return pointCanGet(boxMap, newLineMap);
}

import { Winner } from "../components/game";

export interface PointProps {
  key: string; // 'x-y' format
  x: number;
  y: number;
}
export interface LineProps {
  key: string; // 'h-x-y' or 'v-x-y' format where x y from p1
  p1: PointProps;
  p2: PointProps;
  orientation: "horizontal" | "vertical";
  isClicked: boolean; // Default value should be false
  clickedBy?: Winner;
  clickedAt?: Date;
}

export interface BoxProps {
  key: string; // 'x-y' format where x y from top left corner (lineTop.p1.x, lineTop.p1.y)
  lineTop: LineProps;
  lineBottom: LineProps;
  lineLeft: LineProps;
  lineRight: LineProps;
  winner: Winner;
  isCompleted?: boolean;
}

export function capitalize(turn: string): React.ReactNode {
  return turn.charAt(0).toUpperCase() + turn.slice(1);
}

export function getAdjecentLine(
  point: PointProps,
  lineMap: Map<string, LineProps>
): LineProps[] {
  return Array.from(lineMap.values()).filter(
    (line) =>
      line.isClicked == false &&
      (line.p1.key === point.key || line.p2.key === point.key)
  );
}

/**
 * @param {LineProps} line - The line to check
 * @param {Map<string, BoxProps>} boxMap - The map of boxes
 * @param {Map<string, LineProps>} lineMap - The map of lines
 * @returns {boolean} true if the line completes a box
 */
export function isBoxMake(
  line: LineProps,
  boxMap: Map<string, BoxProps>,
  lineMap: Map<string, LineProps>
): boolean {
  return Array.from(boxMap.values()).some((box) => {
    const lines = [
      box.lineTop,
      box.lineBottom,
      box.lineLeft,
      box.lineRight,
    ].filter((l) => l.key !== line.key);

    if (
      lines.length === 3 &&
      lines.every((l) => lineMap.get(l.key)?.isClicked)
    ) {
      return true;
    }
    return false;
  });
}

export function getAllPoints(size: number): Map<string, PointProps> {
  const points: Map<string, PointProps> = new Map();

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const key = `${i}-${j}`;
      points.set(key, { key: key, x: i, y: j });
    }
  }

  return points;
}

export function getAllLines(size: number): Map<string, LineProps> {
  const lines: Map<string, LineProps> = new Map();

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (j < size - 1) {
        const hKey = `v-${i}-${j}`;
        const p1: PointProps = { key: `${i}-${j}`, x: i, y: j };
        const p2: PointProps = { key: `${i}-${j + 1}`, x: i, y: j + 1 };
        lines.set(hKey, {
          key: hKey,
          p1: p1,
          p2: p2,
          orientation: "vertical",
          isClicked: false,
        });
      }

      if (i < size - 1) {
        const vKey = `h-${i}-${j}`;
        const p1: PointProps = { key: `${i}-${j}`, x: i, y: j };
        const p2: PointProps = { key: `${i + 1}-${j}`, x: i + 1, y: j };
        lines.set(vKey, {
          key: vKey,
          p1: p1,
          p2: p2,
          orientation: "horizontal",
          isClicked: false,
        });
      }
    }
  }

  return lines;
}

export function getAllBoxes(size: number): Map<string, BoxProps> {
  const boxes: Map<string, BoxProps> = new Map();

  for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - 1; j++) {
      const key = `${i}-${j}`;
      const lineTop: LineProps = {
        key: `h-${i}-${j}`,
        p1: { key: `${i}-${j}`, x: i, y: j },
        p2: { key: `${i + 1}-${j}`, x: i + 1, y: j },
        orientation: "horizontal",
        isClicked: false,
      };
      const lineBottom: LineProps = {
        key: `h-${i}-${j + 1}`,
        p1: { key: `${i}-${j + 1}`, x: i, y: j + 1 },
        p2: { key: `${i + 1}-${j + 1}`, x: i + 1, y: j + 1 },
        orientation: "horizontal",
        isClicked: false,
      };
      const lineLeft: LineProps = {
        key: `v-${i}-${j}`,
        p1: { key: `${i}-${j}`, x: i, y: j },
        p2: { key: `${i}-${j + 1}`, x: i, y: j + 1 },
        orientation: "vertical",
        isClicked: false,
      };
      const lineRight: LineProps = {
        key: `v-${i + 1}-${j}`,
        p1: { key: `${i + 1}-${j}`, x: i + 1, y: j },
        p2: { key: `${i + 1}-${j + 1}`, x: i + 1, y: j + 1 },
        orientation: "vertical",
        isClicked: false,
      };
      boxes.set(key, {
        key: key,
        lineTop: lineTop,
        lineBottom: lineBottom,
        lineLeft: lineLeft,
        lineRight: lineRight,
        winner: null,
        isCompleted: false,
      });
    }
  }

  return boxes;
}

// 🔹 **Recursive Serialization**
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serialize(value: any): string {
  let data;
  if (value instanceof Date) {
    data = { __type: "Date", value: value.toISOString() };
  } else if (value instanceof Map) {
    data = {
      __type: "Map",
      value: Array.from(value.entries()).map(([key, val]) => [
        serialize(key),
        serialize(val),
      ]),
    };
  } else if (value instanceof Set) {
    data = { __type: "Set", value: Array.from(value).map(serialize) };
  } else if (value instanceof Object) {
    data = {
      __type: "Object",
      value: Object.entries(value).map(([key, val]) => [
        serialize(key),
        serialize(val),
      ]),
    };
  } else {
    data = value;
  }
  return JSON.stringify(data);
}

// 🔹 **Recursive Deserialization**
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deserialize(value: string): any {
  const data = JSON.parse(value);
  if (!data) return data; // could be undefined / null / false
  if (data.__type === "Date") {
    return new Date(data.value);
  } else if (data.__type === "Map") {
    return new Map(
      (data.value as [string, string][]).map(([key, val]) => [
        deserialize(key) as string,
        deserialize(val),
      ])
    );
  } else if (data.__type === "Set") {
    return new Set(data.value.map(deserialize));
  } else if (data.__type === "Object") {
    return Object.fromEntries(
      (data.value as [string, string][]).map(([key, val]: [string, string]) => [
        deserialize(key),
        deserialize(val),
      ])
    );
  } else {
    return data;
  }
}

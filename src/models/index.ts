export type Coord = [string, number];

export interface Ships {
  [key: string]: {
    hits: Coord[];
    positions: Coord[];
    isSunk: () => {};
    hit: ([ltr, num]: Coord) => {};
  };
}

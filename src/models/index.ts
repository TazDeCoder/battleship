// Enums
export enum Dir {
  'horz',
  'vert',
}
// Types
export type Coord = [string, number];
// Interfaces
export interface Ships {
  [key: string]: {
    hits: Coord[];
    positions: Coord[];
    isSunk: () => {};
    hit: ([ltr, num]: Coord) => {};
  };
}
export interface IGameData {
  [key: string]: {
    [key: string]: {
      coord: Coord;
      dir: keyof typeof Dir;
    };
  };
}

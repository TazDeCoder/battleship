export const SHIPS = [
  ['carrier', 5],
  ['battleship', 4],
  ['cruiser', 3],
  ['submarine', 3],
  ['destroyer', 2],
] as const;

export const COORD_REGEX = /[A-J]:[0-9][0]*$/g;

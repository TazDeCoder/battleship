import { Coord } from '../../models/index';
import { SHIPS } from '../../constants';

const SHIPS_OBJ = SHIPS.reduce((obj: any, [name, size], idx) => {
  const newObj = { ...obj };
  newObj[idx + 1] = {
    name,
    size,
  };
  return newObj;
}, {});

export default function Ship(id: keyof typeof SHIPS_OBJ | string) {
  let ship;
  if (typeof id === 'string') {
    const shipIdx = Object.keys(SHIPS_OBJ).findIndex(
      (key: string | number) => SHIPS_OBJ[key].name === id
    );
    if (shipIdx === -1) throw Error('Invalid ship name');
    ship = SHIPS_OBJ[shipIdx + 1];
  } else {
    ship = SHIPS_OBJ[id];
  }
  const { name, size } = ship;
  let hitsIdx = 0;
  const hits: Coord[] = [];
  // Check if ship has 'sunk'
  const isSunk = () => hits.length === size;
  // Used to mark positions of ship hit
  const hit = (coord: Coord) => {
    if (!isSunk()) {
      hits[hitsIdx] = coord;
      hitsIdx += 1;
    }
  };
  // Public API
  return {
    name,
    size,
    hits,
    isSunk,
    hit,
  };
}

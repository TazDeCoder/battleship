import { Coord } from '../../models/index';

const ships = {
  1: {
    name: 'carrier',
    size: 5,
  },
  2: {
    name: 'battleship',
    size: 4,
  },
  3: {
    name: 'cruiser',
    size: 3,
  },
  4: {
    name: 'submarine',
    size: 3,
  },
  5: {
    name: 'destroyer',
    size: 2,
  },
};

export default function Ship(shipNumber: keyof typeof ships) {
  const { name, size } = ships[shipNumber];
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

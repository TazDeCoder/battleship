/* eslint-disable no-param-reassign */
import { Dir, Coord, Ships } from '../../models/index';

const errorMessages = {
  collision: "Ship couldn't be place there as it will cause collision",
  bounds: "Ship couldn't be place there as it will be out-of-bounds",
};

// Helper functions
function generatePositions(
  board: boolean[][],
  coord: Coord,
  dir: keyof typeof Dir,
  size: number
) {
  const updatedBoard = [...board];
  const positions: Coord[] = [];
  let idx = 0;

  if (dir === 'vert') {
    let posIdx = coord[1] - 1;
    const itemIdx = coord[0].charCodeAt(0) - 65;

    while (idx < size) {
      // Update internal updatedBoard
      if (updatedBoard[posIdx][itemIdx]) {
        throw Error(errorMessages.collision);
      }
      updatedBoard[posIdx][itemIdx] = true;
      // Update positions
      positions[idx] = [coord[0], posIdx + 1];
      posIdx += 1;
      if (posIdx > 9) {
        throw Error(errorMessages.bounds);
      }
      idx += 1;
    }
  }
  if (dir === 'horz') {
    let ltrKey = coord[0];
    const rowIdx = coord[1] - 1;

    while (idx < size) {
      // Update internal updatedBoard
      const ltrIdx = ltrKey.charCodeAt(0) - 65;
      if (updatedBoard[rowIdx][ltrIdx]) {
        throw Error(errorMessages.collision);
      }
      updatedBoard[rowIdx][ltrIdx] = true;
      // Update positions
      positions[idx] = [ltrKey, coord[1]];
      ltrKey = String.fromCharCode(ltrKey.charCodeAt(0) + 1);
      if (ltrKey === 'K') {
        throw Error(errorMessages.bounds);
      }
      idx += 1;
    }
  }
  // Copy updatedBoard if no errors present
  board = [...updatedBoard];
  return positions;
}

export default function Gameboard() {
  const board: boolean[][] = [
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
  ];
  const ships: Ships = {};
  const missed: Coord[] = [];
  // Public methods
  const setPiece = (
    shipPiece: { [key: string]: any },
    coord: Coord,
    dir: keyof typeof Dir
  ) => {
    if (!Object.prototype.hasOwnProperty.call(ships, shipPiece.name)) {
      const { size, hits, isSunk, hit } = shipPiece;
      const positions = generatePositions(board, coord, dir, size);

      ships[shipPiece.name] = {
        hits,
        positions,
        isSunk,
        hit,
      };
    }
  };
  const getPiece = (shipName: keyof typeof ships) => ships[shipName];
  const receiveAttack = (coord: Coord) => {
    const keys = [...Object.keys(ships)];
    const foundKey = keys.find((key) => {
      const { positions } = ships[key];
      for (let i = 0; i < positions.length; i += 1) {
        if (positions[i][0] === coord[0] && positions[i][1] === coord[1]) {
          return true;
        }
      }
      return false;
    });
    // This "hit" is a missed shot
    if (!foundKey) {
      const foundDuplicateMissed = missed.findIndex(
        (miss) => JSON.stringify(miss) === JSON.stringify(coord)
      );
      if (foundDuplicateMissed !== -1) return false;
      missed.push(coord);
      return false;
    }
    const shipHits = ships[foundKey].hits;
    const foundDuplicateHit = shipHits.findIndex(
      (hit) => JSON.stringify(hit) === JSON.stringify(coord)
    );
    if (foundDuplicateHit !== -1) return false;
    ships[foundKey].hit(coord);
    return true;
  };
  const areShipsSunk = () => {
    const keys = [...Object.keys(ships)];
    return keys.every((key) => ships[key].isSunk());
  };
  // Public API
  return {
    ships,
    missed,
    setPiece,
    getPiece,
    receiveAttack,
    areShipsSunk,
  };
}

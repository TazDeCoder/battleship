import Gameboard from '../gameboard/gameboard';

type Coord = [string, number];

export default function Player() {
  const shots: Coord[] = [];
  const { ships, missed, setPiece } = Gameboard();
  // Public methods
  const takeShot = (coord: Coord) => {
    // Checking validity of coord
    const charCode = coord[0].charCodeAt(0);
    if (charCode < 65 || charCode > 74) {
      throw Error('Invalid coordinates provided');
    }
    if (coord[1] < 1 || coord[1] > 10) {
      throw Error('Invalid coordinates provided');
    }
    // Checking if coord already exists in shots
    if (shots.indexOf(coord) === -1) {
      shots.push(coord);
    }
  };
  // Public API
  return {
    shots,
    ships,
    missed,
    takeShot,
    setPiece,
  };
}

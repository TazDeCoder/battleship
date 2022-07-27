import Player from '../player/player';
import Ship from '../ship/ship';

import { Coord } from '../../models';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function generateRandomCoord(): Coord {
  const ltr = letters[Math.floor(Math.random() * letters.length)];
  const num = Math.floor(Math.random() * 10) + 1;
  return [ltr, num];
}

function initPiece(
  players: { [key in `player${1 | 2}`]: ReturnType<typeof Player> },
  key: `player${1 | 2}`,
  pos: 1 | 2 | 3 | 4 | 5,
  dir: 'horz' | 'vert'
) {
  try {
    const coord = generateRandomCoord();
    players[key].setPiece(Ship(pos), coord, dir);
  } catch (err) {
    initPiece(players, key, pos, dir);
  }
}

export default function initPlayers(defaultPlayers: {
  [key in `player${1 | 2}`]: ReturnType<typeof Player>;
}) {
  for (let i = 0; i < 2; i += 1) {
    for (let j = 1; j < 6; j += 1) {
      const key = i === 0 ? 'player1' : 'player2';
      const pos: 1 | 2 | 3 | 4 | 5 = j as any;
      const dir = j % 2 === 0 ? 'horz' : 'vert';
      initPiece(defaultPlayers, key, pos, dir);
    }
  }
  return defaultPlayers;
}

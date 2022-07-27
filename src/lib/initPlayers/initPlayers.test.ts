import Player from '../player/player';
import initPlayers from './initPlayers';

const PLAYERS = Object.freeze({
  player1: Player(),
  player2: Player(),
});

const { player1, player2 } = initPlayers(PLAYERS);

describe('initPlayers function', () => {
  describe('should return an object', () => {
    it('includes both "player1" and "player2" which contains a generated set of 5 ship piecies for each player', () => {
      expect(Object.keys(player1.ships).length).toBe(5);
      expect(Object.keys(player2.ships).length).toBe(5);
    });
    it('contains the right number of positions for each of the ship pieces', () => {
      for (let i = 0; i < 2; i += 1) {
        const player = i === 0 ? player1 : player2;
        expect(player.ships.carrier.positions.length).toBe(5);
        expect(player.ships.battleship.positions.length).toBe(4);
        expect(player.ships.cruiser.positions.length).toBe(3);
        expect(player.ships.submarine.positions.length).toBe(3);
        expect(player.ships.destroyer.positions.length).toBe(2);
      }
    });
  });
});

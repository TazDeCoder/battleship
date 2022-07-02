import Gameboard from './gameboard';
import Ship from '../ship/ship';

describe('Gameboard function', () => {
  describe('setPiece method', () => {
    describe('should be able to place ships at specific coordinates', () => {
      it('places "carrier" at coordinates from [A, 1] to [A, 5]', () => {
        const gameboard = Gameboard();
        const carrier = Ship(1);
        gameboard.setPiece(carrier, ['A', 1], 'vert');
        expect(gameboard.getPiece('carrier').positions).toEqual([
          ['A', 1],
          ['A', 2],
          ['A', 3],
          ['A', 4],
          ['A', 5],
        ]);
      });
      it('places "destroyer" at coordinates from [E, 1] to [F, 1]', () => {
        const gameboard = Gameboard();
        const destroyer = Ship(5);
        gameboard.setPiece(destroyer, ['E', 1], 'horz');
        expect(gameboard.getPiece('destroyer').positions).toEqual([
          ['E', 1],
          ['F', 1],
        ]);
      });
    });
    describe('should not be able to place ships at coordinates out-of-bound', () => {
      it('throws error when trying to place "submarine" at coordinates [I, 1] horizontally', () => {
        const gameboard = Gameboard();
        const submarine = Ship(4);
        expect(() => gameboard.setPiece(submarine, ['I', 1], 'horz')).toThrow(
          "Ship couldn't be place there as it will be out-of-bounds"
        );
      });
      it('throws error when trying to place "battleship" at coordinates [D, 8] vertically', () => {
        const gameboard = Gameboard();
        const battleship = Ship(2);
        expect(() => gameboard.setPiece(battleship, ['D', 8], 'vert')).toThrow(
          "Ship couldn't be place there as it will be out-of-bounds"
        );
      });
    });
    describe('should not be able to place ships in collision with another ship', () => {
      it('throws error when trying to place "submarine" at coordinates [G, 1] horizontally', () => {
        const gameboard = Gameboard();
        const destroyer = Ship(5);
        gameboard.setPiece(destroyer, ['G', 1], 'horz');
        const submarine = Ship(4);
        expect(() => gameboard.setPiece(submarine, ['G', 1], 'horz')).toThrow(
          "Ship couldn't be place there as it will cause collision"
        );
      });
      it('throws error when trying to place "battleship" at coordinates [H, 5] vertically', () => {
        const gameboard = Gameboard();
        const destroyer = Ship(5);
        gameboard.setPiece(destroyer, ['H', 5], 'vert');
        const battleship = Ship(2);
        expect(() => gameboard.setPiece(battleship, ['H', 5], 'vert')).toThrow(
          "Ship couldn't be place there as it will cause collision"
        );
      });
    });
  });
  describe('receiveAttack method', () => {
    describe('should take a pair of coordinates and mark that position where a ship has been shot as "hit"', () => {
      it('records "hit" at coordinates [B, 5] of the "cruiser"', () => {
        const gameboard = Gameboard();
        const cruiser = Ship(3);
        gameboard.setPiece(cruiser, ['B', 3], 'vert');
        gameboard.receiveAttack(['B', 5]);
        expect(gameboard.getPiece('cruiser').hits).toContainEqual(['B', 5]);
      });
      it('records "hit" at coordinates [I, 1] of the "destroyer"', () => {
        const gameboard = Gameboard();
        const destroyer = Ship(5);
        gameboard.setPiece(destroyer, ['H', 1], 'horz');
        gameboard.receiveAttack(['I', 1]);
        expect(gameboard.getPiece('destroyer').hits).toContainEqual(['I', 1]);
      });
    });
    describe('should take a pair of coordinates and mark that position as a "hit" missed', () => {
      it('records "hit" at coordinates [E, 3] as missed', () => {
        const gameboard = Gameboard();
        gameboard.receiveAttack(['E', 3]);
        expect(gameboard.missed).toContainEqual(['E', 3]);
      });
      it('records "hit" at coordinates [G, 7] as missed', () => {
        const gameboard = Gameboard();
        gameboard.receiveAttack(['G', 7]);
        expect(gameboard.missed).toContainEqual(['G', 7]);
      });
    });
  });
  describe('areShipsSunk method', () => {
    describe('should return true when all ships on the board have "sunk"', () => {
      it('returns true when there is only one ship on the board', () => {
        const gameboard = Gameboard();
        const destroyer = Ship(5);
        gameboard.setPiece(destroyer, ['C', 1], 'vert');
        gameboard.receiveAttack(['C', 1]);
        gameboard.receiveAttack(['C', 2]);
        expect(gameboard.areShipsSunk()).toBe(true);
      });
      it('returns true when there is more than one ship on the board', () => {
        const gameboard = Gameboard();
        const destroyer = Ship(5);
        gameboard.setPiece(destroyer, ['C', 1], 'vert');
        gameboard.receiveAttack(['C', 1]);
        gameboard.receiveAttack(['C', 2]);
        const cruiser = Ship(3);
        gameboard.setPiece(cruiser, ['D', 1], 'horz');
        gameboard.receiveAttack(['D', 1]);
        gameboard.receiveAttack(['E', 1]);
        gameboard.receiveAttack(['F', 1]);
        expect(gameboard.areShipsSunk()).toBe(true);
      });
    });
    describe('should return false when not all ships on the board have "sunk"', () => {
      it('returns false when there is only one ship on the board', () => {
        const gameboard = Gameboard();
        const destroyer = Ship(5);
        gameboard.setPiece(destroyer, ['C', 1], 'vert');
        expect(gameboard.areShipsSunk()).toBe(false);
      });
      it('returns false when there is more than one ship on the board', () => {
        const gameboard = Gameboard();
        const destroyer = Ship(5);
        gameboard.setPiece(destroyer, ['C', 1], 'vert');
        const cruiser = Ship(3);
        gameboard.setPiece(cruiser, ['D', 1], 'horz');
        gameboard.receiveAttack(['D', 1]);
        gameboard.receiveAttack(['E', 1]);
        gameboard.receiveAttack(['F', 1]);
        expect(gameboard.areShipsSunk()).toBe(false);
      });
    });
  });
});

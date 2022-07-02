import Ship from './ship';

describe('Ship function', () => {
  describe('should return correct ship piece based on ship n.o.', () => {
    it('returns carrier piece', () => {
      const carrier = Ship(1);
      expect(carrier).toMatchObject({
        name: 'Carrier',
        size: 5,
        hits: [],
      });
      expect(carrier.isSunk()).toBe(false);
    });
    it('returns battleship piece', () => {
      const battleship = Ship(2);
      expect(battleship).toMatchObject({
        name: 'Battleship',
        size: 4,
        hits: [],
      });
      expect(battleship.isSunk()).toBe(false);
    });
    it('returns cruiser piece', () => {
      const cruiser = Ship(3);
      expect(cruiser).toMatchObject({
        name: 'Cruiser',
        size: 3,
        hits: [],
      });
      expect(cruiser.isSunk()).toBe(false);
    });
    it('returns submarine piece', () => {
      const submarine = Ship(4);
      expect(submarine).toMatchObject({
        name: 'Submarine',
        size: 3,
        hits: [],
      });
      expect(submarine.isSunk()).toBe(false);
    });
    it('returns destroyer piece', () => {
      const destroyer = Ship(5);
      expect(destroyer).toMatchObject({
        name: 'Destroyer',
        size: 2,
        hits: [],
      });
      expect(destroyer.isSunk()).toBe(false);
    });
  });
  describe('should be able to mark positions as "hit" if ship not sunk', () => {
    it('marks ship piece at position [A, 1] as "hit"', () => {
      const ship = Ship(1);
      ship.hit(['A', 1]);
      expect(ship.isSunk()).toBe(false);
      expect(ship.hits).toEqual([['A', 1]]);
    });
    it('marks ship piece at positions [C, 3] and [D, 3] as "hit"', () => {
      const ship = Ship(4);
      ship.hit(['C', 3]);
      ship.hit(['D', 3]);
      expect(ship.isSunk()).toBe(false);
      expect(ship.hits).toEqual([
        ['C', 3],
        ['D', 3],
      ]);
    });
  });
  describe('should not be able to mark any more positions as "hit" if ship sunk', () => {
    it('does not mark ship piece at position [F, 7] as "hit"', () => {
      const ship = Ship(5);
      ship.hit(['F', 5]);
      ship.hit(['F', 6]);
      ship.hit(['F', 7]);
      expect(ship.isSunk()).toBe(true);
      expect(ship.hits).toEqual([
        ['F', 5],
        ['F', 6],
      ]);
    });
  });
});

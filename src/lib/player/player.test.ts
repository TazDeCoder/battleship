import Player from './player';

describe('Player function', () => {
  it('should return an object', () => {
    expect(Player()).toMatchObject({
      shots: [],
      missed: [],
    });
  });
  describe('takeShot method', () => {
    describe('should allow a player to take a "shot"', () => {
      it('registers "shot" at coordinates [A, 3]', () => {
        const player = Player();
        player.takeShot(['A', 3]);
        expect(player.shots).toContainEqual(['A', 3]);
      });
    });
    describe('should not allow a player to take a "shot" at invalid coordinates', () => {
      it('throws error when trying to register "shot" at coordinates [K, 1]', () => {
        const player = Player();
        expect(() => player.takeShot(['K', 1])).toThrow(
          'Invalid coordinates provided'
        );
      });
      it('throws error when trying to register "shot" at coordinates [B, 11]', () => {
        const player = Player();
        expect(() => player.takeShot(['B', 11])).toThrow(
          'Invalid coordinates provided'
        );
      });
    });
  });
});

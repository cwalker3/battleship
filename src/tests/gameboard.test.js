import { createGameboard } from '../js/gameboard';

let gameboard;
beforeEach(() => {
  gameboard = createGameboard();
});

describe('isValidPlacement', () => {
  it('returns false when ship would be off the board', () => {
    expect(gameboard.isValidPlacement(0, 0, 6, 'horizontal')).toBe(
      false
    );
  });

  it('returns false when when would overlap another ship', () => {
    gameboard.placeShip(0, 0, 0, 'horizontal');
    expect(gameboard.isValidPlacement(1, 0, 0, 'vertical')).toBe(
      false
    );
  });

  it('returns true when ship placement is valid', () => {
    expect(gameboard.isValidPlacement(4, 0, 0, 'horizontal')).toBe(
      true
    );
  });
});

describe('placeShip', () => {
  it('places a ship horizontally when valid', () => {
    gameboard.placeShip(0, 0, 0, 'horizontal');
    expect([
      gameboard.isOccupied(0, 0),
      gameboard.isOccupied(0, 1),
      gameboard.isOccupied(0, 2),
      gameboard.isOccupied(0, 3),
      gameboard.isOccupied(0, 4),
    ]).toEqual([true, true, true, true, true]);
  });

  it('places a ship verticaly when valid', () => {
    gameboard.placeShip(1, 0, 0, 'vertical');
    expect([
      gameboard.isOccupied(0, 0),
      gameboard.isOccupied(1, 0),
      gameboard.isOccupied(2, 0),
      gameboard.isOccupied(3, 0),
    ]).toEqual([true, true, true, true]);
  });

  it('places with the right length', () => {
    gameboard.placeShip(2, 5, 5, 'horizontal');
    expect([
      gameboard.isOccupied(5, 4),
      gameboard.isOccupied(5, 5),
      gameboard.isOccupied(5, 6),
      gameboard.isOccupied(5, 7),
      gameboard.isOccupied(5, 8),
      gameboard.isOccupied(4, 5),
      gameboard.isOccupied(4, 6),
      gameboard.isOccupied(4, 6),
      gameboard.isOccupied(6, 4),
      gameboard.isOccupied(6, 5),
      gameboard.isOccupied(6, 6),
    ]).toEqual([
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  });

  //this function should be tested to make sure it
  //sends hit but testing this would require mocking
  //which I'm not sure how to do yet
  describe('receiveAttack', () => {
    it('calls hit if a ship is hit', () => {});
  });

  describe('sunkCoordinates', () => {
    it('returns the coordinates of the sunk ship', () => {
      gameboard.placeShip(3, 7, 0, 'vertical');
      gameboard.receiveAttack(7, 0);
      gameboard.receiveAttack(8, 0);
      gameboard.receiveAttack(9, 0);
      expect(gameboard.isSunk(9, 0)).toBe(true);
    });

    it('returns false when the ship is not sunk', () => {
      gameboard.placeShip(0, 9, 0, 'horizontal');
      gameboard.receiveAttack(9, 0);
      gameboard.receiveAttack(9, 1);
      gameboard.receiveAttack(9, 2);
      gameboard.receiveAttack(9, 3);
      expect(gameboard.isSunk(9, 0)).toBe(false);
    });
  });

  describe('shipAllCoordinates', () => {
    it('returns the coordinates of each square a ship occupies', () => {
      gameboard.placeShip(1, 3, 3, 'vertical');
      expect(gameboard.shipAllCoordinates(3, 3)).toEqual([
        [3, 3],
        [4, 3],
        [5, 3],
        [6, 3],
      ]);
    });

    it('returns the coordinates of each square a ship occupies', () => {
      gameboard.placeShip(3, 6, 5, 'horizontal');
      expect(gameboard.shipAllCoordinates(6, 5)).toEqual([
        [6, 5],
        [6, 6],
        [6, 7],
      ]);
    });
  });

  describe('allSunk', () => {
    beforeEach(() => {
      gameboard.placeShip(0, 0, 0, 'horizontal');
      gameboard.placeShip(1, 1, 0, 'horizontal');
      gameboard.placeShip(2, 2, 0, 'horizontal');
      gameboard.placeShip(3, 3, 0, 'horizontal');
      gameboard.placeShip(4, 4, 0, 'horizontal');
    });

    it('returns true when all ships are sunk', () => {
      gameboard.receiveAttack(0, 0);
      gameboard.receiveAttack(0, 1);
      gameboard.receiveAttack(0, 2);
      gameboard.receiveAttack(0, 3);
      gameboard.receiveAttack(0, 4);
      gameboard.receiveAttack(1, 0);
      gameboard.receiveAttack(1, 1);
      gameboard.receiveAttack(1, 2);
      gameboard.receiveAttack(1, 3);
      gameboard.receiveAttack(2, 0);
      gameboard.receiveAttack(2, 1);
      gameboard.receiveAttack(2, 2);
      gameboard.receiveAttack(3, 0);
      gameboard.receiveAttack(3, 1);
      gameboard.receiveAttack(3, 2);
      gameboard.receiveAttack(4, 0);
      gameboard.receiveAttack(4, 1);
      expect(gameboard.allSunk()).toBe(true);
    });

    it('returns false when no ships are sunk', () => {
      expect(gameboard.allSunk()).toBe(false);
    });

    it('returns false when not all ships are sunk', () => {
      gameboard.receiveAttack(1, 0);
      gameboard.receiveAttack(1, 1);
      gameboard.receiveAttack(1, 2);
      gameboard.receiveAttack(1, 3);
      gameboard.receiveAttack(2, 0);
      gameboard.receiveAttack(2, 1);
      gameboard.receiveAttack(2, 2);
      gameboard.receiveAttack(3, 0);
      gameboard.receiveAttack(3, 1);
      gameboard.receiveAttack(3, 2);
      gameboard.receiveAttack(4, 0);
      gameboard.receiveAttack(4, 1);
      expect(gameboard.allSunk()).toBe(false);
    });
  });
});

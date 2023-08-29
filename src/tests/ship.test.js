import { createShip } from '../js/ship';

//hit() does not have any direct public side effects to test
//it only indirectly affects isSunk()
//it is indirectly tested by testing isSunk()

describe('isSunk', () => {
  it('returns true when ship is sunk', () => {
    const ship = createShip(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  it('returns false when ship is not sunk', () => {
    const ship = createShip(4);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});

export function createShip(length) {
  let _hits = 0;

  function hit() {
    _hits++;
  }

  function isSunk() {
    return _hits >= length;
  }

  return { length, hit, isSunk };
}

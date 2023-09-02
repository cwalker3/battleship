import { createShip } from './ship';

export function createGameboard() {
  //ships and grid are both created explicity for simplicity
  //as I don't plan for them to change

  const _ships = [
    createShip(5),
    createShip(4),
    createShip(3),
    createShip(3),
    createShip(2),
  ];
  const _grid = _createGrid();

  function _createGrid() {
    const grid = [];
    for (let i = 0; i < 10; i++) {
      const gridRow = [];
      for (let i = 0; i < 10; i++) {
        gridRow.push(null);
      }
      grid.push(gridRow);
    }

    return grid;
  }

  function isValidPlacement(shipIndex, row, column, orientation) {
    const ship = _ships[shipIndex];
    const length = ship.length;
    for (let i = 0; i < length; i++) {
      if (
        _grid[row][column] === undefined ||
        isOccupied(row, column)
      ) {
        return false;
      }
      if (orientation == 'horizontal') {
        column++;
      } else {
        row++;
      }
    }

    return true;
  }

  function placeShip(shipIndex, row, column, orientation) {
    const ship = _ships[shipIndex];
    const length = ship.length;
    for (let i = 0; i < length; i++) {
      _grid[row][column] = ship;
      if (orientation == 'horizontal') {
        column++;
      } else {
        row++;
      }
    }
  }
  function receiveAttack(row, column) {
    if (isOccupied(row, column)) {
      _grid[row][column].hit();
    }
  }

  function isOccupied(row, column) {
    return _grid[row][column] instanceof Object;
  }

  function isSunk(row, column) {
    if (isOccupied(row, column)) {
      return _grid[row][column].isSunk();
    }

    return false;
  }

  //takes the coordinates of a ship
  //returns all coords of that ship
  //so the dom controller can mark it as sunk
  function shipAllCoordinates(row, column) {
    const allCoords = [];
    if (isOccupied(row, column)) {
      const ship = _grid[row][column];
      for (let row = 0; row < 10; row++) {
        for (let column = 0; column < 10; column++) {
          if (_grid[row][column] === ship) {
            allCoords.push([row, column]);
          }
        }
      }
    }
    return allCoords;
  }

  function allSunk() {
    return _ships.every((ship) => ship.isSunk());
  }

  return {
    isValidPlacement,
    placeShip,
    receiveAttack,
    isOccupied,
    isSunk,
    shipAllCoordinates,
    allSunk,
  };
}

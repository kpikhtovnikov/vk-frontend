import BOMB from './bombValue';
import boardSize from './bombsQuantity';
import createFilledState from '../../../utils/createFilledState'

const addHints = (array) => {
  let number
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {

      if (array[x][y] === BOMB)
        continue

      number = 0

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

          if (i === 0 && j === 0)
            continue

          if (
            x + i >= 0 &&
            x + i < boardSize &&
            y + j >= 0 &&
            y + j < boardSize &&
            array[(x + i)][(y + j)] === BOMB
          ) {
            number++;
          }
        }
      }

      array[x][y] = number
    }
  }
}

export const setBombs = (x, y, bombsQuantity) => {

  let array = createFilledState(0)
  let counter = 0
  while (counter < bombsQuantity) {

    const bombX = Math.floor(Math.random() * boardSize);
    const bombY = Math.floor(Math.random() * boardSize);

    if (array[bombX][bombY] !== BOMB) {
      if (bombX !== x || bombY !== y) {
        array[bombX][bombY] = BOMB;
        counter++
      }
    }
  }

  addHints(array)

  return array
}
import BOMB from "../../actions/bombs/bombValue"
import boardSize from "../../actions/bombs/bombsQuantity"
import { getCopyOfState } from "../../../utils/getCopyOfState"

export const openNearestCells = (x, y, cells, board) => {

  let array = getCopyOfState(cells)

  const stack = [{ x, y }]
  let candidates

  while (stack.length !== 0) {

    const element = stack.pop()
    const curX = element.x, curY = element.y

    if (board[curX][curY] !== BOMB) {
      array[curX][curY] = 1

      if (board[curX][curY] !== 0)
        break
    }

    candidates = []
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {

        if (i === 0 && j === 0)
          continue

        if (
          curX + i >= 0 &&
          curX + i < boardSize &&
          curY + j >= 0 &&
          curY + j < boardSize
        ) {
          candidates.push({ x: curX + i, y: curY + j })
        }
      }
    }

    for (let candidate of candidates) {

      if (board[candidate.x][candidate.y] === 0 && array[candidate.x][candidate.y] === 0) {
        stack.push({ ...candidate })
      } else {

        if (board[candidate.x][candidate.y] !== BOMB)
          array[candidate.x][candidate.y] = 1
      }
    }
  }

  return array
}
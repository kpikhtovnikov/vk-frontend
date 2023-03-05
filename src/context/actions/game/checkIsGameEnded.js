import BOMB from "../../actions/bombs/bombValue"
import boardSize from "../../actions/bombs/bombsQuantity"

export const checkIsGameEnded = (board, cells, bombs, setIsGameEnded, setIsWin) => {
  let openedCellsCounter = 0

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      if (board[x][y] !== BOMB) {
        if (cells[x][y] === 1) {
          openedCellsCounter++
        } else {
          return
        }
      }
    }
  }

  if (openedCellsCounter === (boardSize * boardSize - bombs)) {

    setIsGameEnded(true)
    setIsWin(prev => !prev)
  }
}
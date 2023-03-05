import React, { useContext, useEffect } from 'react';

import SapperContext from '../../context';
import BOMB from '../../context/actions/bombs/bombValue';
import { setBombs } from '../../context/actions/bombs/setBombs';
import { setEndGame } from '../../context/actions/game/setEndGame';
import { updateCellsState } from '../../context/actions/cells/updateCellState';
import { openNearestCells } from '../../context/actions/cells/openNearestCells';

import Bomb from '../../resources/icons/Bomb';
import Flag from '../../resources/icons/Flag';
import QuestionMark from '../../resources/icons/QuestionMark';
import CrossedOutBomb from '../../resources/icons/CrossedOutBomb';
import css from './index.module.css';

const Cell = ({ x, y }) => {

  let {
    board, setBoard,
    cells, setCells,
    bombs,
    setUserBombs,

    isFirstClick, setIsFirstClick,
    firstCellX, setFirstCellX,
    firstCellY, setFirstCellY,

    isGameEnded, setIsGameEnded,

    setHoldMouseClick,
  } = useContext(SapperContext)

  const cellState = cells[x][y]

  const openCells = (x, y) => {
    setCells(openNearestCells(x, y, cells, board))
  }

  const setCellState = (x, y, value) => {
    setCells(updateCellsState(x, y, cells, value))
  }

  const leftClick = () => {

    if (!isFirstClick) {

      if (cellState === 2 || cellState === 3)
        return

      setFirstCellX(x)
      setFirstCellY(y)

      setBoard(setBombs(x, y, bombs))

      setIsFirstClick(true)
    } else {

      if (cellState === 2 || cellState === 3 || isGameEnded)
        return

      if (board[x][y] === BOMB) {
        setCellState(x, y, 4)
        setEndGame(setIsGameEnded, setCells, cells, board)

      } else {
        openCells(x, y)
      }
    }
  }

  const rightClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (cellState === 0) {
      setCellState(x, y, 2)
      setUserBombs(prev => prev - 1)
    }
    if (cellState === 2) {
      setCellState(x, y, 3)
      setUserBombs(prev => prev + 1)
    }
    if (cellState === 3) {
      setCellState(x, y, 0)
    }
  }

  const auxClick = (e) => {
    if (isGameEnded) return
    if (e.button === 0) {
      setHoldMouseClick(true)
    }
  }

  useEffect(() => {
    if (isFirstClick && x === firstCellX && y === firstCellY) {
      openCells(firstCellX, firstCellY)

      setFirstCellX(null)
      setFirstCellY(null)
    }

  }, [isFirstClick])

  const componentClasses = [css.Cell]
  if (cellState === 0) {
    componentClasses.push(css.Closed)
  }
  if (cellState === 2 || cellState === 3) {
    componentClasses.push(css.Flagged)
  }
  if (cellState === 4) {
    componentClasses.push(css.Exploded)
  }

  if (board[x][y] === 1) componentClasses.push(css.NumberBlue)
  if (board[x][y] === 2) componentClasses.push(css.NumberGreen)
  if (board[x][y] === 3) componentClasses.push(css.NumberRed)
  if (board[x][y] === 4) componentClasses.push(css.NumberDarkblue)
  if (board[x][y] === 5) componentClasses.push(css.NumberBrown)
  if (board[x][y] === 6) componentClasses.push(css.NumberCyan)
  if (board[x][y] === 7) componentClasses.push(css.NumberDark)
  if (board[x][y] === 8) componentClasses.push(css.NumberGray)

  const handleContent = () => {
    if (board[x][y] === BOMB) {
      return <Bomb svgSize={25} />
    } else {
      if (board[x][y] !== 0)
        return board[x][y]
    }
  }

  return (
    <div
      className={componentClasses.join(" ")}
      onContextMenu={(e) => rightClick(e)}
      onMouseDown={(e) => auxClick(e)}
      onMouseUp={(e) => {
        setHoldMouseClick(false)
        if (e.button === 0)
          leftClick()
      }}
    >
      {cellState === 0 && " "}
      {cellState === 1 && handleContent()}
      {cellState === 2 && <Flag svgSize={30} />}
      {cellState === 3 && <QuestionMark svgSize={30} />}
      {cellState === 4 && handleContent()}
      {cellState === 5 && <CrossedOutBomb svgSize={30} />}
    </div>
  );
}

export default Cell;
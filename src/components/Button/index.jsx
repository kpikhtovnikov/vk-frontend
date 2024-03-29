import React, { useContext } from 'react';

import SapperContext from '../../context';
import createFilledState from '../../utils/createFilledState';

import './index.module.css'

const Button = ({ children }) => {

  let {
    setBoard,
    setCells,
    bombs,

    setUserBombs,
    setIsFirstClick,
    setFirstCellX,
    setFirstCellY,
    setIsGameEnded,
    setIsWin,

    timer
  } = useContext(SapperContext)

  const newGame = () => {
    setBoard(createFilledState(0))
    setCells(createFilledState(0))

    setIsFirstClick(null)
    setFirstCellX(null)
    setFirstCellY(null)

    setIsGameEnded(false)
    setIsWin(false)

    setUserBombs(bombs)

    clearInterval(timer.current)
    timer.current = {}
  }

  return (
    <button
      onClick={newGame}
    >
      {children}
    </button>
  );
}

export default Button;
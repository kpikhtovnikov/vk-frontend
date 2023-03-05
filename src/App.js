import React, { useRef, useState } from 'react';
import SapperContext from './context'
import createFilledState from './utils/createFilledState';
import Game from './components/Game';
import './resources/styles/index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';

const App = () => {

  const [board, setBoard] = useState(createFilledState(0))
  const [cells, setCells] = useState(createFilledState(0))

  const [bombs, setBombs] = useState(40)
  const [userBombs, setUserBombs] = useState(bombs)

  const [isFirstClick, setIsFirstClick] = useState(null)
  const [firstCellX, setFirstCellX] = useState(null)
  const [firstCellY, setFirstCellY] = useState(null)

  const [isGameEnded, setIsGameEnded] = useState(false)
  const [isWin, setIsWin] = useState(false)

  const [holdMouseClick, setHoldMouseClick] = useState(false)

  const timer = useRef({})

  return (
    <SapperContext.Provider value={{

      board: board,
      cells: cells,
      bombs: bombs,
      userBombs: userBombs,

      isFirstClick: isFirstClick,
      firstCellX: firstCellX,
      firstCellY: firstCellY,

      isGameEnded: isGameEnded,
      isWin: isWin,

      holdMouseClick: holdMouseClick,

      timer: timer,

      setBoard: setBoard,
      setCells: setCells,
      setUserBombs: setUserBombs,

      setIsFirstClick: setIsFirstClick,
      setFirstCellX: setFirstCellX,
      setFirstCellY: setFirstCellY,

      setIsGameEnded: setIsGameEnded,
      setIsWin: setIsWin,

      setHoldMouseClick: setHoldMouseClick,
    }}>

      <div className='GlobalEventWrapper'
        onMouseUp={() => setHoldMouseClick(false)}
      >
        <Header />
        <Game />
        <Footer />
        <Modal />
      </div>

    </SapperContext.Provider>
  );
}

export default App;
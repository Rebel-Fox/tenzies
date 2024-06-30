import React from 'react'
import Die from './Components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  const highscore = JSON.parse(localStorage.getItem('Highscore'))

  const [numArr, setNumArr] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  const [numRoll, setNumRoll] = React.useState(0)

  const [time, setTime] = React.useState(0)
  React.useEffect(() => {
    const numValue = numArr[0].value
    const isAllHeld = numArr.every(num => num.isHeld) // this returns a boolean
    const isAllEqual = numArr.every(num => num.value === numValue)
    if (isAllHeld && isAllEqual) {
      setTenzies(true)
    }
  }, [numArr])

  React.useEffect(() => {
    let timer
    if(!tenzies){
      timer =setInterval(() => setTime(prevTime => prevTime + 1),1000)
    }else{
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  },[tenzies])

  function newDice() {
    const randomNum = Math.floor(Math.random() * 6) + 1
    return {
      value: randomNum,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const randomNumArr = []
    for (let i = 0; i < 10; i++) {
      randomNumArr.push(newDice())
    }
    return randomNumArr
  }


  function holdDice(id) {
    console.log(id)
    setNumArr(oldNumArr =>
      oldNumArr.map(oldNum =>
        oldNum.id === id ?
          { ...oldNum, isHeld: !oldNum.isHeld } : oldNum))
  }

  const numElements = numArr.map(numElement =>
    <Die key={numElement.id}
      value={numElement.value}
      isHeld={numElement.isHeld}
      holdDice={() => holdDice(numElement.id)}
    />)

  function generateNewNumArr() {
    if (tenzies) {
      if (highscore) {
        if (highscore > numRoll) {
          localStorage.setItem('Highscore', JSON.stringify(numRoll))
        }
      } else {
        localStorage.setItem('Highscore', JSON.stringify(numRoll))
      }

      setTenzies(false)
      setNumArr(allNewDice())
      setNumRoll(0)
      setTime(0)
    } else {
      setNumRoll(prevNumRoll => prevNumRoll + 1)
      setNumArr(oldNumArr => oldNumArr.map(oldNum => oldNum.isHeld ? oldNum : newDice()))
    }
  }


  return (
    <main>

        <span className='counter'>Roll: {numRoll}</span>
        {highscore && <span className='highscore'>Highscore:{highscore}</span>}
        {time!==0 && <span className='timer'>{time}s</span>}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="boxes">
        {numElements}
      </div>
      <button className='roll-btn' onClick={generateNewNumArr}>{tenzies ? 'New Game' : 'Roll'}</button>
      {tenzies && <Confetti />}
    </main>
  )
}
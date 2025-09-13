import React, { useState } from 'react'
import "./Dice.css"
function Dice() {
    const [diceValue, setDiceValue] = useState(0)

    function rollDice() {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        setDiceValue(randomNumber)
    }
  return (
    <div className='dice-container'>
    Dice value: {diceValue}
    <button onClick={rollDice}> Roll Dice </button>
    </div>

  )
}

export default Dice
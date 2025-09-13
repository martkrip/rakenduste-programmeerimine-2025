import { useState } from "react"
import "../App.css"
function Counter() {
  const [count, setCount] = useState(0)

  function increaseCounter(amount: number) {
    setCount(count => count + amount)
  }

  return (
    <>
      <h1>Vite + React + Raimo</h1>
      <div className="card">
        <button onClick={() => increaseCounter(10)}>count is {count}</button>
        {/* <button onClick={() => setCount(count => count + 1)}>count is {count}</button> sama kui ülemine*/}
        </div>
    </>
    )
}

export default Counter

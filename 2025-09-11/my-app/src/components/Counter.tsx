import { useState } from "react"
import "../App.css"
function Counter() {
  const [count, setCount] = useState(1)

  function increaseCounter(amount: number) {
    setCount(count => count + amount)
  }

  return (
    <>
      <h1>Vite + React + Raimo</h1>
      {count}
      <div className="card">
        <button onClick={() => increaseCounter(100)}> +100 </button>        
        </div>
      <div className="card">
        <button onClick={() => increaseCounter(50)}> +50 </button>        
        </div>
      <div className="card">
        <button onClick={() => increaseCounter(25)}> +25 </button>        
        </div>
      <div className="card">
        <button onClick={() => increaseCounter(1)}> +1 </button>        
        </div>
      <div className="card">
        <button onClick={() => increaseCounter(-1)}> -1 </button>        
        </div>
      <div className="card">
        <button onClick={() => increaseCounter(-25)}> -25 </button>        
        </div>
      <div className="card">
        <button onClick={() => increaseCounter(-50)}> -50 </button>        
        </div>
      <div className="card">
        <button onClick={() => increaseCounter(-100)}> -100 </button>        
        </div>
    </>
    )
}

export default Counter

import './App.css'
import Cats from './components/Cats'
import ContextExample from "./components/ContextExample"
import PropDrilling from "./components/PropDrilling"

function App() {
  return (
    <div>
      <h2>Prop Drilling:</h2>
      <PropDrilling />

      <h2>Context:</h2>
      <ContextExample />

      <h2>Cats:</h2>
        <Cats />
    </div>
  )
}

export default App

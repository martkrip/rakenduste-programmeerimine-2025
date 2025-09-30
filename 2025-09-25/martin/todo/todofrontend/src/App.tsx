import { Routes, Route } from "react-router-dom";
import "./App.css";
import Todos from "./components/Todos";
import AdminTodos from "./components/AdminTodos";

function App() {
  return (
    <div>
    <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/admin" element={<AdminTodos />} /> 
      </Routes>
    </div>
  );
}

export default App;

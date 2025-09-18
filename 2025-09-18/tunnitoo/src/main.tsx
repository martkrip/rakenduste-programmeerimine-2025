import './index.css'
import App from './App.tsx'
import ReactDOM from "react-dom/client";
import {HashRouter } from "react-router"

const root = document.getElementById("root")

ReactDOM.createRoot(root!).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
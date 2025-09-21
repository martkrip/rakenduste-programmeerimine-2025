import './App.css'
import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import Something from './components/Something'
import MyAppBar from "./components/MyAppBar" 
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
      <MyAppBar>
{/*         <p>
          <Button variant="text">Text</Button>
        </p> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="something" element={<Something />} />
          </Route>
        </Routes>
      </MyAppBar>
{/*       <p>
        <Button variant="text">Text</Button>
      </p>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="something" element={<Something />} />
        </Route>
      </Routes> */}
      </ThemeProvider>
    </>
  );
}

export default App

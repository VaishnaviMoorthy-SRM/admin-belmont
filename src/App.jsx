import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import  New from "./Components/New";
import NavBar from "./Components/NavBar";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar></NavBar>
      <New></New>
    </>
  )
}

export default App

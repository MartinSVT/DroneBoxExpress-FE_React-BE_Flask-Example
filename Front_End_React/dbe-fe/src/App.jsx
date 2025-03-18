import { Route, Routes } from 'react-router'
import './App.css'
import Header from './components/HeaderComponent/HeaderComp'
import Home from './components/HomeComponent/HomeComp'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App

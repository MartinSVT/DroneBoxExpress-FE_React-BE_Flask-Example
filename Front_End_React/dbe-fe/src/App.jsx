import { Route, Routes } from 'react-router'
import globalStyles from './App.module.css'
import Header from './components/HeaderComponent/HeaderComp'
import Home from './components/HomeComponent/HomeComp'

function App() {

  return (
    <div className={globalStyles.main_body}>
      <Header/>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </div>
  )
}

export default App

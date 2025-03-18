import { Route, Routes } from 'react-router'
import globalStyles from './App.module.css'
import Header from './components/HeaderComponent/HeaderComp'
import Home from './components/HomeComponent/HomeComp'
import Footer from './components/FooterComponent/FooterComp'
import AboutUs from './components/AboutUsComponent/AboutUsComp'
import Contacts from './components/ContactsComponent/ContactsComp'

function App() {

  return (
    <div className={globalStyles.main_body}>
      <Header/>
      <main class={globalStyles.block_content_main}>
        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/about' element={<AboutUs />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App

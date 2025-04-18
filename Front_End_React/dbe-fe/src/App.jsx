import { useState } from 'react'
import { Route, Routes } from 'react-router'
import globalStyles from './App.module.css'
import { UserContext } from './contexts/userContext'
import { useUserDetails } from './services/userService'
import { localData } from './utilities/localUserData'
import { getUserDataFromLocal } from './utilities/localUserData'
import AuthGuard from './guards/AuthGuard'
import GuestGuard from './guards/GuestGuard'
import CustomerGuard from './guards/CustomerGuard'
import PermissionGuard from './guards/PermissionGuard'
import Header from './components/HeaderComponent/HeaderComp'
import Footer from './components/FooterComponent/FooterComp'
import AboutUs from './components/AboutUsComponent/AboutUsComp'
import Contacts from './components/ContactsComponent/ContactsComp'
import Login from './components/UserComponents/LoginComp'
import Logout from './components/UserComponents/LogoutComp'
import Register from './components/UserComponents/RegisterComp'
import SuccsefulRegister from './components/UserComponents/SuccesfullRegistrationComp'
import Profile from './components/UserComponents/ProfileComp'
import UserEditComp from './components/UserComponents/UserEditComp'
import ChangePassword from './components/UserComponents/ChangePasswordComp'
import DeleteUser from './components/UserComponents/DeleteUserComp'
import Home from './components/HomePageComponents/HomeComp'
import AddArticle from './components/HomePageComponents/AddArticleComp'
import DeleteArticle from './components/HomePageComponents/DeleteArticleComp'
import EditArticle from './components/HomePageComponents/EditArticleComp'
import Operations from './components/OperationsComponents/OperationsComp'
import AddAirport from './components/OperationsComponents/AddAirportComp'
import EditAirport from './components/OperationsComponents/EditAirportComp'
import DeleteAirport from './components/OperationsComponents/DeleteAirportComp'
import AddRoute from './components/OperationsComponents/AddRouteComp'
import EditRoute from './components/OperationsComponents/EditRouteComp'
import DeleteRoute from './components/OperationsComponents/DeleteRouteComp'
import StaffListOrders from './components/OrdersComponents/StaffListOrdersComp'
import OrderDetails from './components/OrdersComponents/OrderDetailsComp'
import ListOrders from './components/OrdersComponents/ListOrders'
import CreateOrder from './components/OrdersComponents/CreateOrderComp'
import OrderDelete from './components/OrdersComponents/DeleteOrderComp'
import CompleteOrder from './components/OrdersComponents/CompleteOrder'
import EditOrder from './components/OrdersComponents/EditOrderComp'

function App() {
  const [currentUserData, setCurrentUserData] = useState(() => getUserDataFromLocal());
  const { getUserDetails } = useUserDetails();

  const userLoginHandler = async (resultData) => {
    localData.set("token", resultData.token);
    const userDetails = await getUserDetails(resultData.token);
    localData.set("userId", userDetails.id)
    localData.set("username", userDetails.username)
    localData.set("isStaff", userDetails.is_staff)
    setCurrentUserData({userId: userDetails.id, username: userDetails.username, token: resultData.token, isStaff: userDetails.is_staff})
  };

  const userLogoutHandler = () => {
    setCurrentUserData({userId: undefined, username: undefined, token: undefined, isStaff: undefined});
    localData.remove("userId");
    localData.remove("username")
    localData.remove("token")
    localData.remove("isStaff")
  };
  
  return (
    <UserContext.Provider value={{ ...currentUserData, userLoginHandler, userLogoutHandler }}>
      <div className={globalStyles.main_body}>
        <Header/>
        <main className={globalStyles.block_content_main}>
          <Routes>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/about' element={<AboutUs />}></Route>
            <Route path='/contacts' element={<Contacts />}></Route>
            <Route element={<AuthGuard />}>
              <Route path='/logout' element={<Logout />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/editProfile' element={<UserEditComp/>}></Route>
              <Route path='/deleteProfile' element={<DeleteUser/>}></Route>
              <Route path='/changePassword' element={<ChangePassword />}></Route>
              <Route path='/orderDetails/:orderId' element={<OrderDetails />}></Route>
              <Route path='/deleteOrder/:orderId' element={<OrderDelete />}></Route>
              <Route element={<CustomerGuard />}>
                <Route path='/orders/' element={<ListOrders />}></Route>
                <Route path='/addOrder/' element={<CreateOrder />}></Route>
                <Route path='/editOrder/:orderId' element={<EditOrder />}></Route>
              </Route>
              <Route element={<PermissionGuard />}>
                <Route path='/addArticle' element={<AddArticle />}></Route>
                <Route path='/editArticle/:articleId' element={<EditArticle />}></Route>
                <Route path='/deleteArticle/:articleId' element={<DeleteArticle />}></Route>
                <Route path='/operations' element={<Operations />}></Route>
                <Route path='/addAirport' element={<AddAirport />}></Route>
                <Route path='/editAirport/:airportId' element={<EditAirport />}></Route>
                <Route path='/deleteAirport/:airportId' element={<DeleteAirport />}></Route>
                <Route path='/addRoute' element={<AddRoute />}></Route>
                <Route path='/editRoute/:routeId' element={<EditRoute />}></Route>
                <Route path='/deleteRoute/:routeId' element={<DeleteRoute />}></Route>
                <Route path='/staffOrders/' element={<StaffListOrders />}></Route>
                <Route path='/completeOrder/:orderId' element={<CompleteOrder />}></Route>
              </Route>
            </Route>
            <Route element={<GuestGuard />}>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/successfulregister/:user' element={<SuccsefulRegister />}></Route>
            </Route>
          </Routes>
        </main>
        <Footer/>
      </div>
    </UserContext.Provider>
  )
}

export default App
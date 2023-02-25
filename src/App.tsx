import MainCoin from './Components/Coins/MainCoins/MainCoins';
import Coin from './Components/Coin/Coin';
import './index.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Saved from './Components/Saved/Saved';
import AboutApp from './Components/AboutApp/AboutApp';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import SearchCoin from './Components/SearchCoin/SearchCoin';
import { AuthProvider } from './context/AuthContext';
import SignUp from './Components/Firebase/SignUp/SignUp';
import SignIn from './Components/Firebase/SignIn/SignIn';
import ProtectedRouteProfile from './Components/Firebase/ProtectedRouteProfile';
import ForgotPass from './Components/Firebase/ForgotPass/ForgotPass';
import UpdateProfile from './Components/Firebase/UpdateProfile/UpdateProfile';
import Footer from './Components/Footer/Footer';
import ProtectedRouteLogOut from './Components/Firebase/ProtectedRouteLogOut';
function App() {
  return (
   <div>
    <AuthProvider>
    <Router>
        <Routes>
          <Route path='/' element={<><Navbar/><MainCoin/><Footer/></>}/>
            <Route 
              path='/:id' 
              element={
                <ProtectedRouteProfile>
                  <><Navbar/><Coin/><Footer/></>
                </ProtectedRouteProfile>}
            /> 
          <Route path='/saved' element={<><Navbar/><Saved/><Footer/></>}/> 
            <Route 
              path='/profile' 
              element={
                <ProtectedRouteProfile>
                  <><Navbar/><Profile/><Footer/></>
                </ProtectedRouteProfile> }
            /> 
          <Route path='/about-app' element={<><Navbar/><AboutApp/><Footer/></>}/> 
          <Route path='/search-coin' element={<><Navbar/><SearchCoin/><Footer/></>}/> 
          <Route 
              path='/sign-up' 
              element={
                <ProtectedRouteLogOut>
                  <SignUp/>
                </ProtectedRouteLogOut> }
            />     
            <Route 
              path='/sign-in' 
              element={
                <ProtectedRouteLogOut>
                  <SignIn/>
                </ProtectedRouteLogOut> }
            />     
          <Route path='/forgot-password' element={<><ForgotPass/></>}/>   
          <Route path='/update-profile' element={<><UpdateProfile/></>}/>     
        </Routes>
    </Router>
    </AuthProvider>
   </div>
  )
}

export default App

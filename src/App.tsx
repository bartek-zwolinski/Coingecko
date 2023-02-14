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
import PrivateRoute from './Components/Firebase/PrivateRoute';
import ForgotPass from './Components/Firebase/ForgotPass/ForgotPass';
import UpdateProfile from './Components/Firebase/UpdateProfile/UpdateProfile';
import Footer from './Components/Footer/Footer';

function App() {
  return (
   <div>
    <Router>
        <Routes>
          <Route path='/' element={<><Navbar/><MainCoin/><Footer/></>}/>
          <Route path='/:id' element={<><Navbar/><Coin/><Footer/></>}/> 
          <Route path='/saved' element={<><Navbar/><Saved/><Footer/></>}/> 
          <Route path='/profile' element={<><Navbar/><AuthProvider><Profile/></AuthProvider><Footer/></>}/> 
          <Route path='/about-app' element={<><Navbar/><AboutApp/><Footer/></>}/> 
          <Route path='/search-coin' element={<><Navbar/><SearchCoin/><Footer/></>}/> 
          <Route path='/sign-up' element={<> <AuthProvider><SignUp/></AuthProvider></>}/>
          <Route path='/sign-in' element={<> <AuthProvider><SignIn/></AuthProvider></>}/>     
          <Route path='/forgot-password' element={<> <AuthProvider><ForgotPass/></AuthProvider></>}/>   
          <Route path='/update-profile' element={<> <AuthProvider><UpdateProfile/></AuthProvider></>}/>     
        </Routes>
    </Router>
   </div>
  )
}

export default App

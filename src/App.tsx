import MainCoin from './Components/Coins/MainCoins/MainCoins';
import Coin from './Components/Coin/Coin';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Saved from './Components/Saved/Saved';
import AboutApp from './Components/AboutApp/AboutApp';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import SearchCoin from './Components/SearchCoin/SearchCoin';

function App() {
  return (
   <div>
    <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<MainCoin/>}/>
          <Route path='/:id' element={<> <Coin/></>}/> 
          <Route path='/saved' element={<Saved/>}/> 
          <Route path='/profile' element={<Profile/>}/> 
          <Route path='/about-app' element={<AboutApp/>}/> 
          <Route path='/search-coin' element={<SearchCoin/>}/> 
        </Routes>
    </Router>
   </div>
    // <AuthProvider>
    //   <SingUp></SingUp>
    // </AuthProvider>
  )
}

export default App

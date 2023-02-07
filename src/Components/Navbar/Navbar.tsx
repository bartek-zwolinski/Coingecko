
import {Button } from '@mui/material'
import {Link} from 'react-router-dom'
import './Navbar.css'
import { Image} from "react-bootstrap" 

const Navbar = () => {
  return (
    <div className='container'>
      <div className='company'>
        <Image  className='logo' src='/logoCryptoGeek.png' alt=''></Image>
        <h3>Crypto Geek</h3>
      </div>
      <div className='links'>   
        <Link className='link-nav' to='/about-app'> About App </Link>           
        <Link className='link-nav' to='/'> Popular Coins </Link>            
        <Link className='link-nav' to='/search-coin'> Search for Coin </Link>               
        <Link className='link-nav' to='/saved'> Saved Coins</Link>               
        <Link className='link-nav' to='/profile'> Profile </Link>     
      </div>
      <div className='buttons'>
        <Button className='btn-nav' > Sign in  </Button>
        <Button className='btn-nav'> Sign up </Button>
      </div>
    </div>
  )
}

export default Navbar

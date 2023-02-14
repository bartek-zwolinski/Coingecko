import React from 'react'
import { Image} from "react-bootstrap"
import './AboutApp.css'
import {Button } from '@mui/material'
import {Link} from 'react-router-dom'

const AboutApp = () => {
  return (
    <div className='container2'>
        <div className='text'>
          <h2>  Learn how to Invest on Crypto </h2>
          <h3>  This platform will learn you, how to trade <span> cryptocurrencies. </span> Our goal is to educate and to show how to trade without losing money.    </h3>
          <Button className='btn-mp' > <Link className='link-mp' to='/'> Popular Coins </Link> </Button>
        </div>
       <Image  className='png' src='/mainPageImg.png' alt=''></Image>
       
    </div>
  )
}

export default AboutApp
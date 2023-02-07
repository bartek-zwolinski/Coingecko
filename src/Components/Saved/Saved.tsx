import React from 'react'
import { useLocalStorage } from '../useLocalStorage/useLocalStorage'
import { useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { IconButton, Avatar, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Saved.css'

const Saved = () => {

  const [data, setData] = useState<any>([]);
  const [selectedCoins, setSelectedCoins] = useState<any[]>([]);
  const [localStor, setLocaStore] = useLocalStorage('selectedCoins', selectedCoins);

  useEffect(() =>{
    if (localStor  !== null){
      setLocaStore(selectedCoins)
    }
  },[selectedCoins])

  useEffect(() =>{
    if (localStor !== null && selectedCoins.length === 0 && data.length ===0 ){
    setSelectedCoins(localStor);
    }
  },[localStor])


  const addCoinToFav = (id:string, name:string, symbol:any, market_cap_change_percentage_24h:number, current_price:number, image:string, total_volume:number) => {
    let idMap = selectedCoins.map((item)=> item[0])
    let isSelected = idMap.includes(id)
    if(isSelected){
      setSelectedCoins(selectedCoins.filter(item => item[0]!== id && item[1]!== name && item[2]!== symbol && item[3]!== market_cap_change_percentage_24h && item[4]!== current_price && item[5]!== image && item[6]!== total_volume))
    } else {
      setSelectedCoins([...selectedCoins, [id,name,symbol,market_cap_change_percentage_24h,current_price,image,total_volume]])
    }
    }

  return (
    <div>
      <div className='container5'>
      <div className='table-cont1'>
        <h3>Saved Coins:</h3>
       <TableContainer className='table-cont' component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Total Volume</TableCell>
            <TableCell align="right">Price USD</TableCell>
            <TableCell align="right">Market Cap Change 24h</TableCell>
            <TableCell align="right">Add to favourites</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedCoins.map((coins:any) => {
      
                let isPositive = coins[3] >= 0 ? true : false;
                let idMap = selectedCoins.map((item)=> item[0])
                let isSelected = idMap.includes(coins[0]) ? true : false 
                return <TableRow
                 key={coins[0]}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                 > 
                <TableCell  component="th" scope="row"> 
                  <Link className='link' to={`/${coins[0]}`}>
                  <div className='asset' >
                <Avatar alt="" src={coins[5]}></Avatar>
                {coins[2]}
                 </div>
                </Link>
                </TableCell>
                <TableCell align="right">{coins[1]}</TableCell>
                <TableCell align="right">{coins[6]}</TableCell>
                <TableCell align="right">{coins[4]}</TableCell> 
                <TableCell style={{color: isPositive ? 'green' : 'red'}}
                 align="right">{coins[3]}</TableCell>
                 <TableCell align="right"><IconButton 
                 onClick={e => addCoinToFav(coins[0], coins[1], coins[2], coins[3], coins[4], coins[5] , coins[6])}><FavoriteIcon sx={{ color: isSelected ? 'red' : 'grey'}}/></IconButton></TableCell>
                </TableRow>
                
            })}
        </TableBody>  
        </Table>
        </TableContainer>
        </div>
        </div>
    </div>
  )
}

export default Saved

import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Avatar,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, FormControl, TextField } from '@mui/material'
import './SearchCoin.css'

const SearchCoin = () => {
    const [dataFromSearch, setDataFromSearch] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('bitcoin');

    const getSearchCoins = useCallback(()=> {  
     axios.get(`https://api.coingecko.com/api/v3/search?query=${inputValue}`)
     .then((rest) => rest.data)
     .then((data) => data.coins)
     .then((coins) => coins.map((coiny:any) => coiny))
     .then((name) => setDataFromSearch(name))
   },[inputValue])

  
if(dataFromSearch.length===0){
  return (
    <div>
       <div className='container4'>
        <h3 className='text-center mt-4'>Search for Cryptocurrency</h3>
      <div className='text-field'> 
        <FormControl >
          <TextField size='small'
            sx={{
              color: "white",
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(5, 209, 107)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(5, 209, 107)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(5, 209, 107)',
              },
              '.MuiSvgIcon-root ': {
                fill: "rgb(5, 209, 107)",
              },
              '&:hover $notchedOutline': {
                borderColor: 'rgb(5, 209, 107)'
              }
            
          }}
          id="outlined-basic" label="Search for Coin"
          onKeyPress={event => {
            if (event.key === "Enter") {
                getSearchCoins();
                
        }}}
        InputLabelProps={{
          style: {
            color: 'white',
          },
        }}
        InputProps={{
          style: {
            color: 'white',
          },

      }}
        onChange={e => setInputValue(e.target.value)}
        />
        </FormControl>
        <Button className='btn-search' onClick={getSearchCoins}>Search</Button>
        </div> 
    </div>
    </div>
  )
} else {
  return (
    <div>
      <div className='container4'>
        <h3 className='text-center mt-4'>Search for Cryptocurrency</h3>
        <div className='text-field'> 
        <FormControl >
          <TextField size='small'
            sx={{
              color: "white",
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(5, 209, 107)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(5, 209, 107)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(5, 209, 107)',
              },
              '.MuiSvgIcon-root ': {
                fill: "rgb(5, 209, 107)",
              },
              '&:hover $notchedOutline': {
                borderColor: 'rgb(5, 209, 107)'
              }
            
          }}
          id="outlined-basic" label="Search for Coin"
          onKeyPress={event => {
            if (event.key === "Enter") {
                getSearchCoins();
                
        }}}
        InputLabelProps={{
          style: {
            color: 'white',
          },
        }}
        InputProps={{
          style: {
            color: 'white',
          },

      }}
        onChange={e => setInputValue(e.target.value)}
        />
        </FormControl>
        <Button className='btn-search' onClick={getSearchCoins}>Search</Button>
        </div> 
        <div className='table'>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} >Asset</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}}  align="right">Name</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}}  align="right">Market Cap Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dataFromSearch.map((coins:any) => {
            const {id, name,symbol, thumb, market_cap_rank} = coins;
                return <TableRow 
                 key={id}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 },
                ':hover': {background: 'rgb(217, 223, 219)'} }}
                 > 
               <TableCell  component="th" scope="row"> 
                  <Link className='link' to={`/${id}`}>
                  <div className='asset' >
                <Avatar alt="" src={thumb}></Avatar>
                {symbol}
                 </div>
                </Link>
                </TableCell>
                <TableCell align="right"> {name}</TableCell>
                <TableCell align="right"> {market_cap_rank}</TableCell>
                </TableRow>                
            })}
        </TableBody>  
        </Table>
        </TableContainer>
        </div>
    </div>
  </div>
  )}}


export default SearchCoin

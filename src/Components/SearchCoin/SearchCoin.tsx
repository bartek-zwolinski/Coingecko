import React from 'react'
import axios from 'axios'
import { useEffect, useState, useMemo, useCallback } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, IconButton, Pagination, Stack, Avatar,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, InputLabel, MenuItem, Select, FormControl, Autocomplete, TextField } from '@mui/material'
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

  return (
    <div>
      <div className='container4'>
        <h3 className='text-center mt-4'>Search for Cryptocurrency</h3>
        <div className='text-field'> 
          <TextField 
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
          }}
          id="outlined-basic" label="Search for Coin"
          onKeyPress={event => {
            if (event.key === "Enter") {
                getSearchCoins();
        }}}
        onChange={e => setInputValue(e.target.value)}
        />
        <Button className='btn-search' onClick={getSearchCoins}>Search</Button>
        </div> 
        <div className='table'>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Market Cap Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dataFromSearch.map((coins:any) => {
            const {id, name,symbol, thumb, market_cap_rank} = coins;
                return <TableRow
                 key={id}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
  )
}

export default SearchCoin

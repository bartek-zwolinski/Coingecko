import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IconButton, Pagination, Stack, Avatar, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import {Link} from 'react-router-dom'
import './Table.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocalStorage } from '../../useLocalStorage/useLocalStorage'

const Tables = () => {
  
  const [data, setData] = useState<any[]>([]);
  const listOfCoins:number = 12300
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<any>(10);
  const [currency, setCurrency] = useState<string>('USD');
  const [sortBy, setSortBy] = useState<string>('market_cap_desc');
  const [url, setUrl] = useState<string>('')
  const [selectedCoins, setSelectedCoins] = useState<any[]>([]);
  const [localStor, setLocaStore] = useLocalStorage('selectedCoins', selectedCoins);

  useEffect(() =>{
    if (localStor  !== null){
      setLocaStore(selectedCoins)
    }
  },[selectedCoins])

  useEffect(() =>{
    if (localStor !== null && selectedCoins.length === 0 ){
    setSelectedCoins(localStor);
    }
  },[localStor])
  
  useEffect(() =>{
    setUrl(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false`)
  },[currency,perPage,page,sortBy])

  useEffect(() => {
      axios.get(url)
      .then((rest) => rest.data)
      .then((data) => setData(data))
    },[url, setData])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
   };

  const addCoinToFav = (id:string, name:string, symbol:any, market_cap_change_percentage_24h:number, current_price:number, image:string, total_volume:number) => {
    let idMap = selectedCoins.map((item)=> item[0])
    let isSelected = idMap.includes(id)
     if(isSelected){
        setSelectedCoins(selectedCoins.filter((item) => item[0]!== id || item[1]!== name || item[2]!== symbol || item[3]!== market_cap_change_percentage_24h || item[4]!== current_price || item[5]!== image || item[6]!== total_volume))
      } else {
        setSelectedCoins([...selectedCoins, [id,name,symbol,market_cap_change_percentage_24h,current_price,image,total_volume]])
      }
      }

  return (
  <div>
    <div className='container3'>
      <div className='first-part'>
        <div className='first-part-first'>
          <FormControl size="small" sx={{ m: 1, width: '10em'}}>
        <InputLabel className='text-leb' >Choose currency:</InputLabel>
        <Select className='select' 
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
             }
           }}
          label="Choose currency"
          value={currency}
          onChange={e=> setCurrency(e.target.value)}
        >
          <MenuItem value='USD'>USD</MenuItem>
          <MenuItem value='PLN'>PLN</MenuItem>
          <MenuItem value='BTC'>BTC</MenuItem>
          <MenuItem value='EUR'>EUR</MenuItem>
          <MenuItem value='GBP'>GBP</MenuItem>
         </Select>
         </FormControl>
        </div>
        <div className='first-part-second'>
        <FormControl size="small">
        <InputLabel className='text-leb' id="demo-simple-select-label">Sort by:</InputLabel>
        <Select className='select'
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
              }
            }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sort by"
          value={sortBy}
          onChange={e=> setSortBy(e.target.value)}
          >
          <MenuItem value='market_cap_desc'>Market Cap Desc</MenuItem>
          <MenuItem value='market_cap_asc'>Market Cap Asc</MenuItem>
          <MenuItem value='volume_desc'>Volume Desc</MenuItem>
          <MenuItem value='volume_asc'>Volume Asc</MenuItem>
          <MenuItem value='gecko_desc'>Gecko Desc</MenuItem>
          <MenuItem value='gecko_asc'>Gecko Asc</MenuItem>
         </Select>
         </FormControl>
         </div>
      </div>
      <div className='table-cont' > 
        <TableContainer  className='table-container' component={Paper}>
        <Table sx={{ minWidth: 650, }} size='small' aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} >Asset</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Name</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Total Volume</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Price {`(${currency})`}</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Market Cap Change 24h %</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}}  align="right">Add to favourites</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((coins) => {
            const {id, name, symbol, market_cap_change_percentage_24h, current_price, image, total_volume} = coins;
              let isPositive = market_cap_change_percentage_24h >= 0 ? true : false;
              let idMap = selectedCoins.map((item)=> item[0])
              let isSelected = idMap.includes(id) ? true : false 
                return <TableRow
                 key={id}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 },
                 ':hover': {background: 'rgb(217, 223, 219)'} }}
                 > 
                <TableCell  component="th" scope="row"> 
                  <Link className='link' to={`/${id}`}>
                  <div className='asset' >
                <Avatar alt="" src={image}></Avatar>
                {symbol}
                 </div>
                </Link>
                </TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right">{total_volume}</TableCell>
                <TableCell align="right">{current_price}</TableCell> 
                <TableCell style={{color: isPositive ? 'green' : 'red', fontWeight: 
                '500'}}
                 align="right">{market_cap_change_percentage_24h}</TableCell>
                 <TableCell align="right"><IconButton 
                 onClick={e => addCoinToFav(id, name,symbol,market_cap_change_percentage_24h, current_price, image, total_volume)}><FavoriteIcon sx={{ color: isSelected ? 'red' : 'grey'}}/></IconButton></TableCell>
                </TableRow>  
            })}
        </TableBody>  
        </Table>
        </TableContainer>
        </div>
        <div className='form' >
        <FormControl size="small" sx={{ m: 1, width: '10em'}} >
          <InputLabel className='text-leb' id="demo-simple-select-label">Coins per Page:</InputLabel>
            <Select  sx={{
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
              }
            }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Coins per Page:"
              value={perPage}
              onChange={e=> setPerPage(e.target.value)}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
            </FormControl>
          <FormControl size="small">
          <Stack spacing={2}>
          <Pagination sx={{
              button:{color: '#ffffff'},
              color: "white",
              '.MuiSvgIcon-root ': {
                fill: "rgb(5, 209, 107)!important",
              },
              '& .Mui-selected': {
                backgroundColor: 'transparent',
                color: 'rgb(5, 209, 107)',
               },
              }}
            count={(listOfCoins/perPage)} page={page} onChange={handleChange} size="large" />
          </Stack>
          </FormControl>
       </div>
       </div>
    </div>
  )
}
export default Tables

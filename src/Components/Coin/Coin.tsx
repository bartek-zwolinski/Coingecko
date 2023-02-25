import {useParams} from 'react-router-dom'
import './Coin.css'
import HistoryChart from '../HistoryChart/HistoryChart';
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Coin.css'
import { Image} from "react-bootstrap" 
import { database } from '../Firebase/Firebase';
import { set, ref, onValue, remove} from 'firebase/database'
import {Button,TextField, FormControl } from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

interface CoinData {
  coingecko_rank: number;
  symbol: string;
  image: {
    large: string;
  };
  name: string;
  categories: string[];
  links:{
    homepage: string;
    blockchain_site: string;
    subreddit_url: string
  }
  market_cap_rank: number;
  market_data: {
    current_price: {
      btc: number;
      pln: number;
      usd: number;
      gbp: number;
      eur: number;
    };
    market_cap_change_percentage_24h: number;
    price_change_percentage_1y: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_24h: number;
    price_change_percentage_200d: number;
  }
}
interface Account {
    money: any;
    email: string
}

let tempMapping:any[] = []

const Coin = () => {
const { id } = useParams();
const [data, setData] = useState<CoinData>({coingecko_rank: 0, symbol:'',  image: {large:''}, name: '', categories: [], links: {homepage:'',blockchain_site:'',subreddit_url:''}, market_cap_rank: 0, market_data: { current_price: { btc:0,pln: 0, usd: 0, gbp: 0, eur: 0,}, market_cap_change_percentage_24h:0, price_change_percentage_1y: 0, price_change_percentage_7d:0, price_change_percentage_14d:0, price_change_percentage_30d:0, price_change_percentage_24h:0,price_change_percentage_200d:0}});
const [url, setUrl] = useState<string>(`https://api.coingecko.com/api/v3/coins/${id}`)
const [price, setPrice] = useState<any>('');
const [priceUsd, setPriceUsd] = useState<any>('');
const { currentUser } = useAuth();
const [ account, setAccount ] = useState<Account>({money:'',email:''})
const [ finalMoney, setFinalMoney] = useState<any>();
const [coins, setCoins] = useState<any[]>([]);


useEffect(() =>{
  setUrl(`https://api.coingecko.com/api/v3/coins/${id}`)
},[id])

useEffect(() => {
  axios.get(url)
  .then((rest) => rest.data)
  .then((data) => setData(data))
},[url, setData])

useEffect(() =>{
  if(!price){
    setPriceUsd('')
  }else{
    setPriceUsd(Math.round(price * data.market_data.current_price.usd))
  }
},[price])

useEffect(() =>{
  if(!priceUsd){
    setPrice('')
  } else {
  setPrice((priceUsd / data.market_data.current_price.usd))
  }
},[priceUsd])

useEffect(()=>{
  onValue(ref(database, `/${currentUser.uid}`), (snapshot) => {
    const data = snapshot.val();
    tempMapping=[]
    setAccount(data);
    setFinalMoney(data.money);
    if(data.coins !==null){
      setCoins(data.coins);
    }
  })
},[database])

useEffect(()=>{
 if(coins !== undefined){
  if(coins !== null && tempMapping.length === 0){
    tempMapping = ([...tempMapping, ...coins])
  }}
},[coins])

const buyCoins = () => {
  let date = moment(new Date()).format('DD/MM/YYYY - HH:mm')
    if(finalMoney < priceUsd){
      toast.error('You dont have enough money to buy this coin', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
        });
    } else if (priceUsd> 0){
      toast.success('You bought coin properly', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setFinalMoney(((finalMoney)-priceUsd)) 
      tempMapping = ([...tempMapping, {ammount: price, date: date, name: data.name, boughtFor: priceUsd, id: id ,price: data.market_data.current_price.usd ,sold: false}])
      set(ref(database, `/${currentUser.uid}`),{
        email: account.email,
        money: (account.money-priceUsd),
        coins: tempMapping,
      })
    }
  }

  return (
    <div>
      <div className="buy-cont">
        <div className='container-coin'>
          <div className='info-coin'>
            <div className='symbol'>
              <Image  className='symbol-logo' src={data.image.large} alt=''></Image>    
              <h3>{data.name}</h3>
              <h4>{data.symbol}</h4>            
            </div>
            <div className='price'>
              <h4>Price: <span>{data.market_data.current_price.usd }$</span></h4>
              <h4 style={{background: data.market_data.price_change_percentage_24h>0 ? ' rgb(40, 141, 71)' : 'rgb(154, 33, 14)'}}>{data.market_data.price_change_percentage_24h.toFixed(2)}%</h4>
            </div>
            <div className='rank'>
              <h4>Coin Gecko Rank: <span>{data.coingecko_rank}</span></h4>
              <h4>Market Cap Rank: <span>{data.market_cap_rank}</span></h4>
            </div>
            <div className='categories'>
              <h4>Coin Gecko Category: <span>{data.categories[0]}</span></h4>
            </div>
            <div className='changes'>
              <div className='names'>
              <h4 className='nam'>Change 7d:</h4>
              <h4 className='nam' >Change 14d:</h4>
              <h4 className='nam' >Change 30d:</h4>
              <h4 className='nam' >Change 200d:</h4>
              <h4 className='nam' >Change 1y:</h4>
              </div>
              <div className='precentage'>
              <h4  className='nam' style={{background: data.market_data.price_change_percentage_7d>0 ? ' rgb(40, 141, 71)' : 'rgb(154, 33, 14)'}}>{data.market_data.price_change_percentage_7d.toFixed(2)}%</h4>
              <h4  className='nam' style={{background: data.market_data.price_change_percentage_14d>0 ? ' rgb(40, 141, 71)' : 'rgb(154, 33, 14)'}} >{data.market_data. price_change_percentage_14d.toFixed(2)}%</h4>
              <h4  className='nam' style={{background: data.market_data.price_change_percentage_30d>0 ? ' rgb(40, 141, 71)' : 'rgb(154, 33, 14)'}} >{data.market_data.price_change_percentage_30d.toFixed(2)}%</h4>
              <h4  className='nam' style={{background: data.market_data.price_change_percentage_200d>0 ? ' rgb(40, 141, 71)' : 'rgb(154, 33, 14)'}} >{data.market_data.price_change_percentage_200d.toFixed(2)}%</h4>
              <h4  className='nam' style={{background: data.market_data.price_change_percentage_1y>0 ? ' rgb(40, 141, 71)' : 'rgb(154, 33, 14)'}} >{data.market_data.price_change_percentage_1y.toFixed(2)}%</h4>
              </div>
            </div>
          </div>
          <div className='chart'>
            <HistoryChart  id={id}></HistoryChart>
          </div>
        </div>
        <div>
       <div className='container4'>
        <h3 className='text-center mt-4'>Buy {data.name}</h3>
      <div className='text-field'> 
        <FormControl >
          <TextField size='small'
              sx={{
              width: '30vh',
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
          id="outlined-basic" label={`How much ${data.name} you want to buy`}
          onKeyPress={event => {
            if (event.key === "Enter") {
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
          inputProps: { min: 0}
       }}
       type="number"    
       value={price}
       onChange={e => setPrice(e.target.value)}
        />
        </FormControl>
        <FormControl >
          <TextField size='small'
            sx={{
              width: '30vh',
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
          id="outlined-basic" label='How much $ you want to spend'
          onKeyPress={event => {
            if (event.key === "Enter") {
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
          inputProps: { min: 0 }
       }}
       type="number"
       value={priceUsd}
       onChange={e => setPriceUsd(e.target.value)}
        />
        </FormControl>
        <Button onClick={buyCoins}>BUY</Button>
        </div> 
        <h2>Your wallet amount: <span> {(account.money-priceUsd).toFixed(0)}$</span></h2>
        </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Coin

import {useParams} from 'react-router-dom'
import './Coin.css'
import HistoryChart from '../HistoryChart/HistoryChart';
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Coin.css'
import { Image} from "react-bootstrap" 

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

const Coin = () => {
  const { id } = useParams();
  const [data, setData] = useState<CoinData>({coingecko_rank: 0, symbol:'',  image: {large:''}, name: '', categories: [], links: {homepage:'',blockchain_site:'',subreddit_url:''}, market_cap_rank: 0, market_data: { current_price: { btc:0,pln: 0, usd: 0, gbp: 0, eur: 0,}, market_cap_change_percentage_24h:0, price_change_percentage_1y: 0, price_change_percentage_7d:0, price_change_percentage_14d:0, price_change_percentage_30d:0, price_change_percentage_24h:0,price_change_percentage_200d:0}});
  const [url, setUrl] = useState<string>(`https://api.coingecko.com/api/v3/coins/${id}`)
    
  useEffect(() =>{
    setUrl(`https://api.coingecko.com/api/v3/coins/${id}`)
  },[id])
    
  useEffect(() => {
   axios.get(url)
  .then((rest) => rest.data)
  .then((data) => setData(data))
    },[url, setData])

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
              <h4>Price: <span>{data.market_data.current_price.usd}$</span></h4>
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
        <div className='buy'> Kup Coina </div>
      </div>
    </div>
  )
}

export default Coin

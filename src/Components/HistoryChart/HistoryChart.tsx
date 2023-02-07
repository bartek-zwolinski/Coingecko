import React from 'react'
import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import {Button} from '@mui/material'
import './HistoryChart.css'

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend
  );

  type Props = {  
      id?: string; 
  }

  interface CoinData {
    prices: number[];
  }

const HistoryChart = (props: Props) => {
    
    const [response, setResponse] = useState<CoinData>({prices: []});
    const [days, setDays] = useState<string>('7');
    const [url, setUrl] = useState<string>('');

    useEffect(() =>{
      setUrl(`https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${days}` )
    },[days, props.id])

  useEffect(() => {
      axios.get(url)
      .then((rest) => rest.data)
      .then((data) => setResponse(data))
    },[url, setResponse])
     
  const coinCharData = useMemo(() => response.prices.map((value:any)=> ({x:value[0], y: value[1]})),
  [response]);

    const options = {
        responsive: true
      }
  
   const data = useMemo(()=> ({
   labels: coinCharData.map(value => moment(value.x).format('MMM DD')),
   datasets: [
     {
       fill: true,
       data: coinCharData.map(val => val.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
       }
     ]
   }),[coinCharData])

  return (
    <div>
      <div className='chart-elem'>
        <div className='chart-view'>
          <Line options={options} data={data}>
          </Line> 
        </div>
        <div className='buttons-chart'>
          <Button className='btn-chart' onClick={()=>setDays('7')}>7 days </Button>
          <Button className='btn-chart' onClick={()=>setDays('14')}>14 days </Button>
          <Button className='btn-chart' onClick={()=>setDays('30')}>30 days </Button>
          <Button className='btn-chart' onClick={()=>setDays('max')}>Max</Button>
        </div>
      </div>
    </div>
  )
}

export default HistoryChart

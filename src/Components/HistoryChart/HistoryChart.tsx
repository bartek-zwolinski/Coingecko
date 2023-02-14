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
      plugins:{legend:{display:false}},
      scales: {
        y:{
          ticks:{
            color:"white",
            font:{
              size:15
            }
          },
          grid:{
           display: false,
          }
        },
        x:{
          ticks:{
            color:"white",
            font:{
              size:13,
            },
          
          maxRotation: 70,
          minRotation: 70,
          },
          grid:{
            display: false,
           },
           
        }
      },
    };
  
  
   const data = useMemo(()=> ({
   labels: coinCharData.map(value => moment(value.x).format('MM/DD/YY')),
   datasets: [
     {
       fill: true,
        label: props.id ,
       data: coinCharData.map(val => val.y),
       backgroundColor:"rgb(40, 141, 71)",
       pointBorderColor:"white",
       pointBorderWidth:1,
       pointRadius:1,
       tension: 0.4,

       }
     ],
     title: {
      display: true,
      text: ''
    },
  
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

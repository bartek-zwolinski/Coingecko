import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"
import { useNavigate} from "react-router-dom"
import { set, ref, onValue, update } from 'firebase/database'
import { database } from '../Firebase/Firebase';
import {  Button as Buttonn, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import './Profile.css'
import axios from 'axios'
import { uid } from "uid"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [firstUser, setFirstUser] = useState<boolean>(false);
  const [money, setMoney] = useState<any>(-1);
  const [value, setValue] = useState<any>(-1);
  const [data, setData] = useState<any[]>([])
  const [stringOfIds, setStringOfIds] = useState('')
  const [url, setUrl] = useState<string>(``)
  const [currentPrices, setCurrentPrices] = useState<any>([])
  const [ moneyWallet,setMoneyWallet] = useState(0)
  const nav = useNavigate();
  let num = 0;

  const writeToDatabase = () => {
      set(ref(database, `/${currentUser.uid}`),{
        email: currentUser.email,
        money: value,
        coins: [],
    })
    setMoney(value)
  }

  useEffect(()=>{
    onValue(ref(database, `/${currentUser.uid}`), (snapshot) => {
      const data = snapshot.val();
        if (data===null) {        
           setFirstUser(true);
        } else if(data!== null && data.email === currentUser.email && data.coins === undefined) {
           setFirstUser(false);
           setMoney(data.money);
        } else {
           setData(data.coins)
           setMoneyWallet(data.money)          
        }
        })
  },[database])

 useEffect(()=>{
  let ids = data.map((id:any) => id.id)
    let idsArr = ids.filter((c, index) => {
      return ids.indexOf(c) === index; 
    });
      let idsString = idsArr.reduce((acc,cur) => `${cur},${acc}`, '');
       setStringOfIds( idsString.substring(0, idsString.length-1))
 },[data])

 useEffect(() =>{
  setUrl(`https://api.coingecko.com/api/v3/simple/price?ids=${stringOfIds}&vs_currencies=usd`)
},[stringOfIds])

  useEffect(() => {
   axios.get(url)
    .then((rest) => rest.data)
    .then((data) => setCurrentPrices(data)) 
  },[url])

  async function handleLogout() {
    setError("")
    try {
      await logout()
      nav("/sign-in")
    } catch {
      setError("Failed to log out")
    }
  }

const handleOpen = (coin:any, boughtFor:any, price: any, todayPrice: any) => {
  let index = data.indexOf(coin)
    update(ref(database, `/${currentUser.uid}/coins/${index}`),{
        sold:true
    });
    update(ref(database, `/${currentUser.uid}/`),{
      money: (moneyWallet + ((boughtFor*(price- todayPrice )/todayPrice)+boughtFor))
  });
  toast.success('You sold coin properly', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  }

  if(money === -1 && firstUser ) {
    return (
      <div className="container4">
        <h4>This app is for trading at stock with virtual money.</h4>
        <h4>To beggin choose your ammount of money.</h4>
        <h4>If you don't do it, Market will be blocked</h4>
        <FormControl className='form-cont' size="small" sx={{ m: 1, width: '10em'}}>
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
          value={value}
          onChange={e=> setValue(e.target.value)}
        >
           <MenuItem value={-1} >0</MenuItem>
          <MenuItem value={1000}>1,000</MenuItem>
          <MenuItem value={10000}>10,000</MenuItem>
          <MenuItem value={100000}>100,000</MenuItem>
          <MenuItem value={100000}>1,000,000</MenuItem>
          <MenuItem value={1000000}>10,000,000</MenuItem>
          <MenuItem value={10000000}>100,000,000</MenuItem>
         </Select>
         <Buttonn className='btn-sub' onClick={writeToDatabase}>Submit</Buttonn>
         </FormControl>
         <div className="log-out"> 
        <h4>If you want to login to another account, you have to</h4>
        <Button className='log-out-button' variant="link" onClick={handleLogout}>
          LOGOUT
        </Button>
       </div>
        </div>
    )
  } else if(data.length === 0){
    return <div className="container4">
       <h2>Welcome<span> {currentUser.email}</span></h2>
      <h2>Your wallet amount: <span> {money.toFixed(0)}$</span></h2>
        <h4>You dont't have any transactions to be shown</h4>
        <h4>Go buy some coins and comeback </h4>
        <div className="log-out"> 
        <h4>If you want to login to another account, you have to</h4>
        <Button className='log-out-button' variant="link" onClick={handleLogout}>
          LOGOUT
        </Button>
       </div>
    </div>
  }
  else {
  return (
    <div className='container3'>
      {error}
      <h2>Welcome<span> {currentUser.email}</span></h2>
    <h2>Your wallet amount: <span> {moneyWallet.toFixed(0)}$</span></h2>
    <div className="log-out"> 
        <h4>If you want to login to another account, you have to</h4>
        <Button className='log-out-button' variant="link" onClick={handleLogout}>
          LOGOUT
        </Button>
       </div>
    <div className='table-cont' > 
        <TableContainer  className='table-container' component={Paper}>
        <Table sx={{ minWidth: 650, }} size='small' aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} >Transaction Number:</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Name</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Amount of Coin</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Bought for</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Date of Transaction</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Bought for Price</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Today's Price</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Profit [%]</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Profit [$]</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}} align="right">Close for</TableCell>
            <TableCell sx={{fontWeight:'600', fontSize:'1em'}}  align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((coins) => {
            const {name , ammount ,boughtFor, date, sold, id, price} = coins;
              const todayPrice:number = currentPrices[id]?.usd;
                const percentProfit:number = ((price-todayPrice )/todayPrice);
                  const usdProfit:number = boughtFor*percentProfit;
                    const closeFor:number = boughtFor + usdProfit;
              num++;
                let uuid = uid();
                if(!sold){
                return <TableRow
                 key={uuid}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 },
                 ':hover': {background: 'rgb(217, 223, 219)'} }}
                 > 
                <TableCell  component="th" scope="row"> 
                {num}
                </TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right">{ammount.toFixed(8)}</TableCell> 
                <TableCell align="right">${boughtFor}</TableCell> 
                <TableCell align="right">{date}</TableCell>
                <TableCell align="right">${price}</TableCell>
                <TableCell align="right">${todayPrice}</TableCell>
                <TableCell align="right" style={{color: percentProfit>=0 ? 'green' : 'red', fontWeight: 
                '500'}}>{(percentProfit*100).toFixed(2) + '%'}</TableCell>
                <TableCell align="right" style={{color: percentProfit>=0 ? 'green' : 'red', fontWeight: 
                '500'}}>{(usdProfit).toFixed(2)}$</TableCell>
                <TableCell align="right">{closeFor.toFixed(2)}$</TableCell>
                <TableCell><Buttonn className='btn-cl'onClick={e => handleOpen(coins, boughtFor, price, todayPrice)}>Close</Buttonn></TableCell>
                </TableRow>            
                }           
            })}
        </TableBody>  
        </Table>
        </TableContainer>
        </div>
          <ToastContainer/>
        </div>
  )
}}
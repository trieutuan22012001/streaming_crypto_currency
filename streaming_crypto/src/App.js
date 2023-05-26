import './App.css';
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Coin from './Coins';
function App() {
const [coins, SetCoins] = useState([])
const [search, setSearch] = useState('');
console.log("data",coins)
useEffect(()=>{
  const fetchData = async() =>{
    await axios.request({
      method: 'GET',
      url: 'https://coingecko.p.rapidapi.com/coins/markets',
      params: {
        vs_currency: 'usd',
        page: '1',
        per_page: '100',
        order: 'market_cap_desc'
      },
      headers: {
        'X-RapidAPI-Key': '51b75a1824msh7b5fb29e6ce52b4p1c8861jsn4c8d74d9aea4',
        'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
      }
    }).then((response)=>{
      SetCoins(response.data);
    },(error) =>{
      console.log(error)
    }
    )
  }
  fetchData();
},[])

const handleChange = e => {
  setSearch(e.target.value);
};

const filteredCoins = coins.filter(coin =>
  coin.name.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="coin-app">
     <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;

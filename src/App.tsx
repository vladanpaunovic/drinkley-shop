import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import ItemList, { Item } from './ItemList';
import config from './config';
import Cart from './Cart';


const { SHEET_ID, SHEET_RANGE, GOOGLE_API_KEY } = config
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_RANGE}?key=${GOOGLE_API_KEY}`

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [items, setItems] = useState<Item[]>([])
  const [cart, setCart] = useState<Item[]>([])

  const fetchItems = async () => {
    setLoading(true)
    const response = await axios.get(SHEET_URL)
    if (response.status !== 200) {
      throw new Error("Error connecting to Google Sheets API")
    }

    const items: Item[] = response.data.values.map((i: any) => ({
      productId: i[0],
      displayName: i[1],
      price: i[2],
      stock: i[3],
    }))

    setItems(items)
    setLoading(false)
  }
  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="App">
      <main>
        {loading && "loading..."}
        <ItemList items={items} onAddToCart={(i) => setCart([...cart, i])} />
        <Cart items={cart} />
      </main>
    </div>
  );
}

export default App;

import React from 'react';
import { Item } from './ItemList';

interface Props {
  items: Item[]
}

interface SingleCartItemProps {
  item: Item
  onClick(): void
}

const SingleCartItem: React.FC<SingleCartItemProps> = ({ item: { displayName, price, stock, productId }, onClick }) => {
  return (
    <div>
      product: {displayName}
      price: {price}
      stock: {stock}
      <button onClick={() => onClick()}>Order</button>
    </div>
  )
}

const Cart: React.FC<Props> = ({ items }) => {
  const allItems = items.map((item, index) => <SingleCartItem key={`${item.productId}-${index}`} item={item} onClick={() => console.log(item)} />)
  const summary = items.reduce<number>((prev, curr) => {
    return prev + parseFloat(curr.price)
  }, 0)
  const formatedSummary = summary.toLocaleString('de-AT', { style: 'currency', currency: 'EUR' });

  return (
    <div>
      <h2>Cart:</h2>
      {allItems}
      <div>
        <button>
          Pay: {formatedSummary}
        </button>
      </div>
    </div>
  )
}

export default Cart
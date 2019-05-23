import * as React from 'react'

export interface Item {
  productId: string;
  displayName: string;
  price: string
  stock: number
}

interface ItemListProps {
  items: Item[]
  onAddToCart(item: Item): void
}

interface SingleItemProps {
  item: Item
  onClick(): void
}

const SingleItem: React.FC<SingleItemProps> = ({ item: { displayName, price, stock, productId }, onClick }) => {
  return (
    <div>
      product: {displayName}
      price: {price}
      stock: {stock}
      <button onClick={() => onClick()}>Order</button>
    </div>
  )
}

const ItemList: React.FC<ItemListProps> = ({ items, onAddToCart }) => {
  const allItems = items.map(i => <SingleItem key={i.productId} item={i} onClick={() => onAddToCart(i)} />)
  return (
    <div>
      <h2>Select product</h2>
      {allItems}
    </div>
  )
}

export default ItemList
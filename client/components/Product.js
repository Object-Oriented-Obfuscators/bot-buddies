import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  const {mode} = props
  return (
    <div className="botTile">
      <div>Name: {props.product.name}</div>
      <div>Price: {props.product.price}</div>
      {mode === 'cart' && (
        <div>
          Quantity:
          <input
            placeholder={props.product.CartsProducts.qty}
            onChange={props.handleChange}
          />
          {props.product.CartsProducts.qty}
        </div>
      )}
      <Link to={`/products/${props.product.id}`}>
        <img className="productImage" src={props.product.imageUrl} />
      </Link>
    </div>
  )
}

export default Product

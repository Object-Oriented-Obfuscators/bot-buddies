import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  const {mode} = props
  return (
    <div className="product row">
      <div className="column">
        <Link to={`/products/${props.product.id}`}>
          <div>Name: {props.product.name}</div>
          <div>Price: {props.product.price}</div>
          {mode === 'cart' && (
            <div>Quantity: {props.product.CartsProducts.qty}</div>
          )}
          <img src={props.product.imageUrl} />
        </Link>
      </div>
    </div>
  )
}

export default Product

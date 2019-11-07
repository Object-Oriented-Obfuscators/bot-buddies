import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  const {mode} = props
  console.log('PROPS---->', props)
  return (
    <div className="product row">
      <div className="column">
        <div>Name: {props.product.name}</div>
        <div>Price: {props.product.price}</div>
        {mode === 'cart' && (
          <div>
            Quantity:
            <input
              placeholder={props.product.OrdersProducts.qty}
              onChange={props.handleChange}
            />
          </div>
        )}
        <Link to={`/products/${props.product.id}`}>
          <img src={props.product.imageUrl} />
        </Link>
      </div>
    </div>
  )
}

export default Product

import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  const {mode} = props
  console.log('this is product id', props.product.id)
  console.log('this is cart id', props.cartId)
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
              onChange={evt => props.handleChange(evt, props.product)}
            />
            <button
              type="submit"
              onClick={() =>
                props.removeFromCart({
                  // id: props.product.id,
                  // cartId: props.cartId
                  id: 2,
                  cartId: 9
                })
              }
            >
              Remove from cart
            </button>
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

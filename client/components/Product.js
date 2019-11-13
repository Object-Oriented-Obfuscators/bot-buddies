import React from 'react'
import {Link} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'

const Product = props => {
  const {mode} = props

  return (
    <div>
      <div className="name">{props.product.name}</div>
      <div className="price">${props.product.price / 100}</div>
      {mode === 'cart' && (
        <div>
          Quantity:
          <input
            placeholder={props.product.OrdersProducts.qty}
            onChange={evt => props.handleChange(evt, props.product)}
          />
          <button
            type="button"
            onClick={() => {
              let productToRemove = {
                productId: props.product.id,
                orderId: props.cartId
              }
              props.removeFromCart(productToRemove)
            }}
          >
            <Icon name="trash alternate" />
            Remove from cart
          </button>
        </div>
      )}
      <Link to={`/products/${props.product.id}`}>
        <div
          className={`productImage ${mode}`}
          style={{backgroundImage: `url(${props.product.imageUrl})`}}
        />
      </Link>
    </div>
  )
}

export default Product

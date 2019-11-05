import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  return (
    <div className="product row">
      <div className="column">
        <Link to={`/products/${props.product.id}`}>
          {props.product.name}
          <img src={props.product.imageUrl} />
        </Link>
      </div>
    </div>
  )
}

export default Product

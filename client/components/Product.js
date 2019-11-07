import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  return (
    <div className="botTile">
      <Link to={`/products/${props.product.id}`}>
        {props.product.name}
        <img className="productImage" src={props.product.imageUrl} />
      </Link>
    </div>
  )
}

export default Product

import React from 'react'

const Product = props => {
  return (
    <div className="product row">
      <div className="column">
        {props.product.name}
        <img src={props.product.imageUrl} />
      </div>
    </div>
  )
}

export default Product

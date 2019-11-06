import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/cart'
import Product from './Product'

class DisconnectedCart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    let {products} = this.props.cart
    return (
      <ul id="cart">
        {products &&
          products.map(product => {
            return <Product key={product.id} product={product} mode="cart" />
          })}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => {
    dispatch(getCart())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedCart)

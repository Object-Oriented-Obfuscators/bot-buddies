import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/cart'
import Product from './Product'

class DisconnectedCart extends Component {
  constructor(props) {
    super()
    this.loaded = false
  }
  componentDidMount() {
    this.props.getCart()
    this.loaded = true
  }

  render() {
    let {products} = this.props.cart
    return (
      <div id="cart">
        {!this.loaded ? (
          <div>Loading...</div>
        ) : this.loaded && !products.length ? (
          <div>Your cart is empty!</div>
        ) : (
          products &&
          this.loaded &&
          products.map(product => {
            return <Product key={product.id} product={product} mode="cart" />
          })
        )}
      </div>
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

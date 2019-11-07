import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, removeFromCart} from '../store/cart'
import Product from './Product'

class DisconnectedCart extends Component {
  constructor(props) {
    super()
    this.state = {
      changes: []
    }
    this.loaded = false
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
    this.loaded = true
  }
  handleChange(evt, product) {
    let qty = evt.target.value
    let cartId = this.props.cart.id
    let productId = product.id
    let changedProduct = {
      qty,
      cartId,
      productId
    }
    let newChanges = [...this.state.changes]
    // for (let i = 0; i < newChanges.length; i++){
    //   if(newChanges[i].productId === )
    // }
  }
  render() {
    let {products, id} = this.props.cart
    return (
      <div id="cart">
        {!this.loaded ? (
          <div>Loading...</div>
        ) : this.loaded && !products ? (
          <div>Your cart is empty!</div>
        ) : (
          products &&
          this.loaded &&
          products.map(product => {
            return (
              <Product
                key={product.id}
                cartId={id}
                product={product}
                mode="cart"
                handleChange={this.handleChange}
                removeFromCart={this.props.removeFromCart}
              />
            )
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
  },
  removeFromCart: product => {
    dispatch(removeFromCart(product))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedCart)

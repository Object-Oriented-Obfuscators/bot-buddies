/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, removeFromCart, editCartThunk, checkout} from '../store/cart'
import Product from './Product'
import {Loader} from 'semantic-ui-react'

class DisconnectedCart extends Component {
  constructor() {
    super()
    this.state = {
      changes: [],
      loaded: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
    this.setState({loaded: true})
  }

  handleChange(evt, product) {
    let qty = evt.target.value
    let orderId = this.props.cart.id
    let productId = product.id
    let changedProduct = {
      qty,
      orderId,
      productId
    }

    this.setState(previousState => {
      let newChanges = previousState.changes.filter(productElement => {
        if (productId !== productElement.productId) {
          return true
        } else return false
      })
      newChanges.push(changedProduct)
      return {changes: newChanges}
    })
  }

  submitHandler(evt) {
    evt.preventDefault()
    this.props.editCart({changes: [...this.state.changes]})
  }

  render() {
    let {products, id} = this.props.cart
    return (
      <div id="cartDiv">
        <div id="cartTitle">Shopping Cart</div>

        {!this.state.loaded ? (
          <Loader active inline="centered" />
        ) : this.state.loaded && Array.isArray(products) && !products.length ? (
          <div id="emptyCart">Your cart is empty!</div>
        ) : (
          products &&
          this.state.loaded && (
            <div id="cartListView">
              {products.map(product => {
                return (
                  <div className="cartProduct" key={product.id}>
                    <Product
                      cartId={id}
                      product={product}
                      mode="cart"
                      handleChange={this.handleChange}
                      removeFromCart={this.props.removeFromCart}
                    />
                  </div>
                )
              })}
              <button type="submit" onClick={this.submitHandler}>
                Save
              </button>
              <button type="button" onClick={this.props.checkout}>
                Checkout
              </button>
              <p>
                Total:
                {Array.isArray(products) &&
                  products.length &&
                  products
                    .map(product => {
                      return product.price * product.OrdersProducts.qty
                    })
                    .reduce((acc, index) => {
                      return acc + index
                    })}
              </p>
            </div>
          )
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
  checkout: () => {
    dispatch(checkout())
  },
  removeFromCart: product => {
    dispatch(removeFromCart(product))
  },
  editCart: state => {
    dispatch(editCartThunk(state))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedCart)

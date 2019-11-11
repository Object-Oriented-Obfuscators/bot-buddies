import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, removeFromCart, editCartThunk} from '../store/cart'
import Product from './Product'
import {Loader} from 'semantic-ui-react'

class DisconnectedCart extends Component {
  constructor() {
    super()
    this.state = {
      changes: []
    }
    this.loaded = false
    this.handleChange = this.handleChange.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
    this.loaded = true
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
    this.props.editCart(this.state)
  }

  render() {
    let {products, id} = this.props.cart
    return (
      <div id="cartDiv">
        <div id="cartTitle">Shopping Cart</div>

        {!this.loaded ? (
          <Loader active inline="centered" />
        ) : this.loaded && !products.length ? (
          <div id="emptyCart">Your cart is empty!</div>
        ) : (
          products &&
          this.loaded && (
            <div>
              {products.map(product => {
                return (
                  <div className="cartProduct" key={product.id}>
                    <Product
                      // key={product.id}
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
  removeFromCart: product => {
    dispatch(removeFromCart(product))
  },
  editCart: state => {
    dispatch(editCartThunk(state))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedCart)

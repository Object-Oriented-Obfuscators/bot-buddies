import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, editCartThunk} from '../store/cart'
import Product from './Product'

class DisconnectedCart extends Component {
  constructor(props) {
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
        if (productId !== productElement.id) {
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
    this.props.getCart()
  }

  render() {
    let {products} = this.props.cart
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
                product={product}
                mode="cart"
                handleChange={this.handleChange}
              />
            )
          })
        )}{' '}
        <button type="submit" onClick={this.submitHandler}>
          Save
        </button>
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
  editCart: state => {
    dispatch(editCartThunk(state))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedCart)

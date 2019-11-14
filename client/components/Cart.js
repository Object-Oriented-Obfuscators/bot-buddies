/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, removeFromCart, editCartThunk, checkout} from '../store/cart'
import Product from './Product'
import {Loader, Table, Icon, Button, Input} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

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
            <div id="cartListTable">
              <Table singleLine unstackable>
                <Table.Header>
                  <Table.Row textAlign="center">
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {products.map(product => {
                    return (
                      <Table.Row
                        key={product.id}
                        textAlign="center"
                        className="product"
                      >
                        <Table.Cell>
                          <Link to={`/products/${product.id}`}>
                            <div>{product.name}</div>
                            <div
                              className="productImage cart"
                              style={{
                                backgroundImage: `url(${product.imageUrl})`
                              }}
                            />
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Input
                            label="QTY:"
                            className="qtyInput"
                            placeholder={product.OrdersProducts.qty}
                            onChange={evt => this.handleChange(evt, product)}
                          />

                          <div>
                            <Button
                              inverted
                              color="red"
                              animated="fade"
                              onClick={() => {
                                let productToRemove = {
                                  productId: product.id,
                                  orderId: id
                                }

                                this.props.removeFromCart(productToRemove)
                                toast.warn(`Removed ${product.name}`)
                              }}
                            >
                              <Button.Content visible>
                                <Icon name="trash alternate" />
                              </Button.Content>
                              <Button.Content hidden>Remove</Button.Content>
                            </Button>
                          </div>
                        </Table.Cell>
                        <Table.Cell> $ {product.price / 100}</Table.Cell>
                        <Table.Cell>
                          $ {product.price * product.OrdersProducts.qty / 100}
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
              <div id="grandTotalDiv">
                Grand Total: $
                {Array.isArray(products) &&
                  products.length &&
                  products
                    .map(product => {
                      return product.price * product.OrdersProducts.qty
                    })
                    .reduce((acc, index) => {
                      return acc + index
                    }) / 100}
              </div>
              <div id="cartButtonsDiv">
                <div id="editButtonDiv">
                  <Button
                    onClick={event => {
                      this.submitHandler(event)
                      toast.success('Updated Quantities!')
                    }}
                  >
                    <Icon name="edit" /> Edit Qty
                  </Button>
                </div>
                <div id="checkoutButtonDiv">
                  <Button
                    primary
                    onClick={async () => {
                      await this.props.checkout()
                      console.log(
                        'this.props.cart.error==>',
                        this.props.cart.error
                      )
                      if (this.props.cart.error) {
                        toast.warn(`Checkout Failed: ${this.props.cart.error}`)
                      } else {
                        toast.success('Thanks for your order!')
                      }
                    }}
                  >
                    <Icon name="cart" /> Checkout
                  </Button>
                </div>
              </div>
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

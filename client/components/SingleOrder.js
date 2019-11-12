import React, {Component} from 'react'
import {getOrder} from '../store/singleOrder'
import {connect} from 'react-redux'
import {Button, Icon, Table} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class SingleOrder extends Component {
  componentDidMount() {
    this.props.getOrder(this.props.match.params.orderId)
  }

  render() {
    let {products} = this.props.singleOrder
    return (
      <div>
        <h2>Order #: {this.props.singleOrder.id}</h2>
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
            {products &&
              products.map(product => {
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
                    <Table.Cell>{product.OrdersProducts.qty}</Table.Cell>
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleOrder: state.singleOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrder: id => dispatch(getOrder(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)

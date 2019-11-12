import React, {Component} from 'react'
import {getAllOrders} from '../store/ordersHistory'
import {connect} from 'react-redux'
import Order from './Order'
import {Table} from 'semantic-ui-react'

class AllOrders extends Component {
  componentDidMount() {
    this.props.getAllOrders()
  }
  render() {
    return (
      this.props.ordersHistory && (
        <div className="orders">
          <Table singleLine unstackable>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell>Order Id</Table.HeaderCell>
                <Table.HeaderCell>Order Date</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.ordersHistory.map(order => {
                return <Order order={order} key={order.id} />
              })}
            </Table.Body>
          </Table>
        </div>
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    ordersHistory: state.ordersHistory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllOrders: () => dispatch(getAllOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)

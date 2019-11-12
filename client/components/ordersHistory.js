import React, {Component} from 'react'
import {getAllOrders} from '../store/ordersHistory'
import {connect} from 'react-redux'

class AllOrders extends Component {
  componentDidMount() {
    this.props.getAllOrders()
  }
  render() {
    console.log('what is this? --->', this.props.ordersHistory)
    return <div id="orders">{this.props.ordersHistory}</div>
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

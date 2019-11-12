import React, {Component} from 'react'
import {getOrder} from '../store/singleOrder'
import {connect} from 'react-redux'
import {Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class SingleOrder extends Component {
  componentDidMount() {
    this.props.getOrder(this.props.match.params.orderId)
  }

  render() {
    return <div>{this.props.singleOrder.id}</div>
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

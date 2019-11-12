import React, {Component} from 'react'
import {getSingleProduct} from '../store/singleProduct'
import {connect} from 'react-redux'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    return (
      this.props.singleProduct && (
        <div>
          <p>{`${this.props.singleProduct.name}`}</p>
          <p>{`${this.props.singleProduct.price}`}</p>
          <img src={this.props.singleProduct.imageUrl} />
          <p>{`${this.props.singleProduct.description}`}</p>
        </div>
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

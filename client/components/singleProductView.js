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
    console.log('tthis is props', this.props.singleProduct)
    return (
      Object.keys(this.props.singleProduct) && (
        <div>
          <p>{`${this.props.singleProduct.name}`}</p>
          <img src={this.props.singleProduct.imageUrl} />
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

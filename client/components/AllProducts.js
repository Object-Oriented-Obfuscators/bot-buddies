import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/products'
import {addToCartThunk} from '../store/cart'
import Product from './Product'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <div id="products">
        {this.props.products.map(product => {
          return (
            <div key={product.id}>
              <Product product={product} mode="product" />
              <button
                type="button"
                onClick={() => this.props.addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    addToCart: product => dispatch(addToCartThunk(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)

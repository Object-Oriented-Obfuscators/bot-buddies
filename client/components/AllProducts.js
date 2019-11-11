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
            <div className="botTile" key={product.id}>
              <Product product={product} mode="product" />
              <div className="addButtonDiv">
                <button
                  className="addButton"
                  type="button"
                  onClick={() => this.props.addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
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

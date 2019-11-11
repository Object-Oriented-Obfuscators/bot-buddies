import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/products'
import {addToCartThunk} from '../store/cart'
import Product from './Product'
import {Button, Icon} from 'semantic-ui-react'

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

              <Button
                className="addButton"
                fluid
                onClick={() => this.props.addToCart(product)}
              >
                <Icon name="add to cart" />
                Add to Cart
              </Button>
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

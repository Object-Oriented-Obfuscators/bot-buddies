import React, {Component} from 'react'
import {getSingleProduct} from '../store/singleProduct'
import {connect} from 'react-redux'
import {addToCartThunk} from '../store/cart'
import {Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    return (
      Object.keys(this.props.singleProduct) && (
        <div className="singleProductViewDiv">
          <p className="singleViewName">{`${this.props.singleProduct.name}`}</p>
          <p className="singleViewPrice">
            $ {`${this.props.singleProduct.price / 100}`}
          </p>
          <img
            className="singleViewImage"
            src={this.props.singleProduct.imageUrl}
          />
          <p className="singleViewDescription">{`${
            this.props.singleProduct.description
          }`}</p>

          <Button
            color="green"
            size="huge"
            animated="fade"
            className="singleProductViewAddButton"
            onClick={() => this.props.addToCart(this.props.singleProduct)}
          >
            <Button.Content visible>
              <Icon name="add to cart" />
            </Button.Content>
            <Button.Content hidden>Add to Cart</Button.Content>
          </Button>
          <hr />
          <Link to="/">
            <Icon name="home" /> Continue Shopping
          </Link>
          <Link to="/cart">
            <Icon name="shopping cart" /> View Cart
          </Link>
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
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    addToCart: product => dispatch(addToCartThunk(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

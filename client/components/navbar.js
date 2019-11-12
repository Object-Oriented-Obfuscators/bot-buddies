import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Icon} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn, firstName, lastName}) => (
  <div id="navbar">
    <h1 id="mainTitle">BOT-BUDDIES</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">
            <Icon name="home" /> Home
          </Link>
          <Link to="/cart">
            <Icon name="shopping cart" /> Cart
          </Link>
          <Link to="/orders">
            <Icon name="history" /> Order History
          </Link>
          <a href="#" onClick={handleClick}>
            <Icon name="sign out" /> Logout
          </a>
          <div className="welcome">
            Welcome, {firstName} {lastName}!
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">
            <Icon name="home" /> Home
          </Link>
          <Link to="/login">
            <Icon name="sign in" /> Login
          </Link>
          <Link to="/signup">
            <Icon name="user plus" /> Sign Up
          </Link>
          <Link to="/cart">
            <Icon name="shopping cart" /> Cart
          </Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email,
    firstName: state.user.fname,
    lastName: state.user.lname
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' && (
          <span>
            <div>
              <label htmlFor="fname">
                <small>First Name</small>
              </label>
              <input name="fname" type="text" />
            </div>
            <div>
              <label htmlFor="lname">
                <small>Last Name</small>
              </label>
              <input name="lname" type="text" />
            </div>
            <div>
              <label htmlFor="address">
                <small>Address</small>
              </label>
              <input name="address" type="text" />
            </div>
            <div>
              <label htmlFor="phone">
                <small>Phone</small>
              </label>
              <input name="phone" type="text" />
            </div>
            <div>
              <label htmlFor="imageUrl">
                <small>Profile Picture URL</small>
              </label>
              <input name="imageUrl" type="text" />
            </div>
          </span>
        )}
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const userData = {}
      const formName = evt.target.name
      userData.email = evt.target.email.value
      userData.password = evt.target.password.value
      if (formName === 'signup') {
        userData.fname = evt.target.fname.value
        userData.lname = evt.target.lname.value
        userData.address = evt.target.address.value
        userData.phone = evt.target.phone.value
        userData.imageUrl = evt.target.imageUrl.value
      }
      dispatch(auth(userData, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div id="main">
      <ToastContainer />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App

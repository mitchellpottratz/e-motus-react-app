import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

// component imports
import LoginComponent from './components/users/LoginComponent.js'

class App extends Component {

  constructor() {
    super()

    this.state = {
      loggedIn: false,
      showLogin: true,
      showRegister: false
    }
  }

  render() {

        // if the user is not logged in
        if (this.state.loggedIn === false) {

          // if true this will reander the LoginComponent
          if (this.state.showLogin) {

            return (
              <div className="App">
                <LoginComponent />
              </div>
            )

          // if true this will reander the RegisterComponent
          } else {

            return (
              <div className="App">
                <p>register</p>
              </div>
            )

          }

        // if the user is logged in
        } else {

          return (
              <div className="App">
                <p>logged in</p>
              </div>
            )
      }
  }
}

export default App;

import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

class App extends Component {

  constructor() {
    super()

    this.state = {
      loggedIn: false,
      showLogin: false,
      showRegister: true
    }
  }

  render() {

        // if the user is not logged in
        if (this.state.loggedIn === false) {

          if (this.state.showLogin) {

            return (
              <div className="App">
                <p>login</p>
              </div>
            )

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

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
      showRegister: false,
      userEmail: ''
    }
  }

  // makes api call to log in the user
  login = async (loginData) => {
    console.log('login call with data:', loginData)
    try {
      // makes api call to try to login the user
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // parses the json response
      const parsedResponse = await response.json()

      // if the responses status code is 200
      if (parsedResponse.status.code === 200) {
        console.log('logged in successfully')
        // logs in the user
        this.setState({
          loggedIn: true,
          userEmail: parsedResponse.data.email
        })
      } else {
        console.log('login failed')
      }

    } catch (error) {
      console.log(error)
    }
  }

  render() {

        // if the user is not logged in
        if (this.state.loggedIn === false) {

          // if true this will reander the LoginComponent
          if (this.state.showLogin) {

            return (
              <div className="App">
                <LoginComponent login={this.login} />
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

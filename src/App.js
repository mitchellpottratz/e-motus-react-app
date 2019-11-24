import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import { Container } from 'semantic-ui-react'

// component imports
import LoginComponent from './components/users/LoginComponent.js'
import RegisterComponent from './components/users/RegisterComponent.js'
import MainContainer from './components/account/MainContainer.js'

class App extends Component {

  constructor() {
    super()

    this.state = {
      loggedIn: false,
      showLogin: true,
      showRegister: false,
      user: null
    }
  }

  // switches between the login and register components
  switchComponent = () => {

    // if the LoginComponent is currently being displayed
    if (this.state.showLogin === true) {
      this.setState({
        showLogin: false,
        showRegister: true
      })

    // if the RegisterComponent is currently being displayed
    } else {
       this.setState({
        showRegister: false,
        showLogin: true
      })
    }
  }

  // makes api call to log in the user
  login = async (loginData) => {

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

      // if the user was successfully logged in, log in the user
      if (parsedResponse.status.code === 200) {
        this.setState({
          loggedIn: true,
          user: parsedResponse.data
        })
        console.log(this.state.user)
      } 

    } catch (error) {
      console.log(error)
    }
  }

  // makes api call to register a new user
  register = async (registerData) => {
    try {
      // makes the api call
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/register', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(registerData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // parses the reponse 
      const parsedResponse = await response.json()

      // if the user was successfully creates, log the user in
      if (parsedResponse.status.code === 201) {
        this.setState({
          loggedIn: true,
          user: parsedResponse.data
        })
      } 

    } catch (error) {
      console.log(error);
    }
  }

  render() {

        // if the user is not logged in
        if (this.state.loggedIn === false) {

          // if true this will reander the LoginComponent
          if (this.state.showLogin) {
            return (
              <div className="App">
                <Container className="form-container">
                  <LoginComponent switchComponent={this.switchComponent} login={this.login} />
                </Container>
              </div>
            )

          // if true this will reander the RegisterComponent
          } else {
            return (
              <div className="App">
                <Container className="form-container">
                  <RegisterComponent switchComponent={this.switchComponent} register={this.register} />
                </Container>
              </div>
            )
          }

        // if the user is logged in
        } else {
          return (
              <div className="App">
                <MainContainer user={this.state.user} />
              </div>
            )
      }
  }
}

export default App;

import React, { Component } from 'react'
import { Grid, Segment, Form, Button, Message, Icon } from 'semantic-ui-react'


class RegisterComponent extends Component {

	constructor() {
		super()

		this.state = {
			image: null,
			first_name: '',
			last_name: '',
			username: '',
			email: '',
			password: '',
			confirm_password: '',

			// values for error message
			passwordLengthError: false,
			passwordsMatchError: false,
			passwordErrorMessage: ''
		}
	}

	// handles the change for the inputs on the login form
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// handles the login form submission
	handleSubmit = (e) => {

		// clear all of the error properties in the state
		this.setState({
			passwordLengthError: false,
			passwordsMatchError: false,
			passwordErrorMessage: ''
		})
		
		// if the password is less than 8 characters
		if (this.state.password.length < 8) {

			// set attributes in the state to display password length error
			// on the form
			this.setState({
				passwordLengthError: true,
				passwordErrorMessage: 'Password must be atleast 8 characters long.'
			})	

		// if the passwords do not match
		} else if (this.state.password !== this.state.confirm_password) {

			// set attributes in the state to display passwords dont match
			// error on the form
			this.setState({
				passwordsMatchError: true,
				passwordErrorMessage: 'The passwords you provided do not match.'
			})	

		// if there were no errors with the passwords
		} else {
			// call method in App.js to register the user
			this.props.register(this.state)
		}
	}

	render() {

		// checks if there are any errors in the form, if there are
		// then it renders the error message
		const renderErrorMessage = () => {

			// if there is an error with the passwords
			if (this.state.passwordErrorMessage !== '') {

				// return password error message
				return (
					<Message negative>
						<Message.Header>Password Error</Message.Header>
	    				<p>{this.state.passwordErrorMessage}</p>
					</Message>
				)

			// if the username already exists
			} else if (this.props.usernameExists === true) {

				// return username already exists error message
				return (
					<Message negative>
						<Message.Header>Username Error</Message.Header>
	    				<p>The username you provided already exists.</p>
					</Message>
				)

			// if the email already exists 
			} else if (this.props.emailExists === true) {
				// return username already exists error message
				return (
					<Message negative>
						<Message.Header>Email Error</Message.Header>
	    				<p>The email you provided already exists.</p>
					</Message>
				)

			// if there are no errors, return null
			} else {
				return (null)
			}
		}

		return (
			<Grid onSubmit={this.handleSubmit}>
				<Grid.Row columns={3}>
					<Grid.Column mobile={1} tablet={3} computer={4}></Grid.Column>

					<Grid.Column mobile={14} tablet={10} computer={8}>
						<Segment className="login-segment">
							<h1>Register</h1>
							<Form id="registration-form">
								
								{renderErrorMessage()}
								
								<Form.Group widths="equal">
									<Form.Field>
										<Form.Input type="text"
													label="First Name:"
													name="first_name"
													placeholder="First Name"
													onChange={this.handleChange} 
													error={this.state.firstNameError} />
									</Form.Field>
									<Form.Field>
										<Form.Input type="text"
													label="Last Name:"
													name="last_name"
													placeholder="Last Name"
													onChange={this.handleChange} />
									</Form.Field>
								</Form.Group>

								<Form.Field>
									<Form.Input type="text"
												label="Username:"
												name="username"
												placeholder="Username"
												onChange={this.handleChange} />
								</Form.Field>

								<Form.Field>
									<Form.Input type="email"
												label="Email:"
									  			name="email"
									  			placeholder="Email"
									  			onChange={this.handleChange} />
								</Form.Field>

								<Form.Group widths="equal">
									<Form.Field>
										<Form.Input type="password"
													label="Password:"
										  		    name="password"
										  		    placeholder="Password"
										  		    onChange={this.handleChange} />
									</Form.Field>
									<Form.Field>
										<Form.Input type="password"
													label="Confirm Password:"
										  		    name="confirm_password"
										  		    placeholder="Confirm Password"
										  		    onChange={this.handleChange} />
									</Form.Field>
								</Form.Group>

								<Form.Button type="submit"
											 color="blue"
											 disabled={
											 	!this.state.first_name ||
											 	!this.state.last_name ||
											 	!this.state.username ||
											 	!this.state.email ||
											 	!this.state.password
											 }
										>Register</Form.Button>
							</Form>
							<Message attached='bottom' warning>
						        <Icon name='help' />
						        Already have an account?&nbsp;<a onClick={this.props.switchComponent} href='#'>Login Here</a>&nbsp;
    						</Message>
						</Segment>
					</Grid.Column>

					<Grid.Column mobile={1} tablet={3} computer={4}></Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default RegisterComponent









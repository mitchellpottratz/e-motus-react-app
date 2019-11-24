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

			// values for error message
			firstNameError: false,
			lastNameError: false,
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

		// if the first_name input is blank
		if (this.state.first_name < 1) {
			this.setState({
				firstNameError: true
			})
		}

		// if the lasst_name input is blank
		if (this.state.last_name < 1) {
			this.setState({
				lastNameError: true
			})
		}

		this.props.register(this.state)
	}

	render() {
		return (
			<Grid onSubmit={this.handleSubmit}>
				<Grid.Row columns={3}>
					<Grid.Column mobile={1} tablet={3} computer={4}></Grid.Column>

					<Grid.Column mobile={14} tablet={10} computer={8}>
						<Segment className="login-segment">
							<h1>Register</h1>
							<Form id="registration-form">



								<Form.Group widths="equal">
									<Form.Field>
										<Form.Input type="text"
													label="First Name:"
													name="first_name"
													placeholder="First Name"
													onChange={this.handleChange}  />
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

								<Form.Field>
									<Form.Input type="password"
												label="Password:"
									  		    name="password"
									  		    placeholder="Password"
									  		    onChange={this.handleChange} />
								</Form.Field>

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









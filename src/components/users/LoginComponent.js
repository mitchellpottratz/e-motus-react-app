import React, { Component } from 'react'
import { Grid, Segment, Form, Button, Label } from 'semantic-ui-react'


class LoginComponent extends Component {

	constructor() {
		super()

		this.state = {
			email: '',
			password: ''
		}
	}

	// handles the change for the inputs on the login form
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
		console.log('email:', this.state.email)
		console.log('password:', this.state.password)
	}

	handleSubmit = (e) => {
		
	}

	render() {
		return (
			<Grid>
				<Grid.Row columns={3}>
					<Grid.Column width={4}></Grid.Column>

					<Grid.Column width={8}>
						<Segment className="login-segment">
							<h1>Login</h1>
							<Form>
								<Form.Field>
									<Label>Email</Label>
									<Form.Input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
								</Form.Field>

								<Form.Field>
									<Label>Password</Label>
									<Form.Input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
								</Form.Field>

								<Button type="submit" color="blue">Login</Button>
							</Form>
						</Segment>
					</Grid.Column>

					<Grid.Column width={4}></Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default LoginComponent
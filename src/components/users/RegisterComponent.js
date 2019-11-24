import React, { Component } from 'react'
import { Grid, Segment, Form, Button, Label } from 'semantic-ui-react'


class RegisterComponent extends Component {

	constructor() {
		super()

		this.state = {
			image: null,
			first_name: '',
			last_name: '',
			username: '',
			email: '',
			password: ''
		}
	}

	// handles the change to the image input
	handleFileChange = (e) => {
		this.setState({
			image: e.target.files[0]
		})
	}

	// handles the change for the inputs on the login form
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// handles the login form submission
	handleSubmit = (e) => {
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
							<Form>

								<Form.Group widths="equal">
									<Form.Field>
										<Label>First Name</Label>
										<Form.Input type="text" name="first_name" placeholder="First Name" onChange={this.handleChange} />
									</Form.Field>
									<Form.Field>
										<Label>Last Name</Label>
										<Form.Input type="text" name="last_name" placeholder="Last Name" onChange={this.handleChange} />
									</Form.Field>
								</Form.Group>

								<Form.Field>
									<Label>Username</Label>
									<Form.Input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
								</Form.Field>

								<Form.Field>
									<Label>Email</Label>
									<Form.Input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
								</Form.Field>

								<Form.Field>
									<Label>Password</Label>
									<Form.Input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
								</Form.Field>

								<Button type="submit" color="blue">Register</Button>
							</Form>
							<small>Already have an account? <strong onClick={this.props.switchComponent}>Login Here</strong></small>
						</Segment>
					</Grid.Column>

					<Grid.Column mobile={1} tablet={3} computer={4}></Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default RegisterComponent









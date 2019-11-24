import React, { Component } from 'react'
import { Grid, Segment, Form, Button, Message, Icon } from 'semantic-ui-react'


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
	}

	// handles the login form submission
	handleSubmit = (e) => {
		this.props.login(this.state)
	}

	render() {
		return (
			<Grid onSubmit={this.handleSubmit}>
				<Grid.Row columns={3}>
					<Grid.Column mobile={1} tablet={3} computer={4}></Grid.Column>

					<Grid.Column mobile={14} tablet={10} computer={8}>
						<Segment className="login-segment">
							<h1>Login</h1>
							<Form id="login-form">
								{
									this.props.loginError === true
									?
									<Message negative>
    									<Message.Header>Login Error</Message.Header>
    									<p>The email or password you provided is incorrect</p>
  									</Message>
    								: 
    								null
								}
								<Form.Field>
									<Form.Input type="email" 
												label="Email:"
											    name="email"
											    placeholder="Email" 
											    onChange={this.handleChange} 
											    />
								</Form.Field>

								<Form.Field>
									<Form.Input type="password"
												label="Password:"
									            name="password"
									            placeholder="Password"
									            onChange={this.handleChange} />
								</Form.Field>

								<Button type="submit" color="blue">Login</Button>
							</Form>
							<Message attached='bottom' class="form-help-message" warning>
						        <Icon name='help' />
						        Don't have an account?&nbsp;<a onClick={this.props.switchComponent} href='#'>Register here</a>&nbsp;
    						</Message>
							
						</Segment>
					</Grid.Column>

					<Grid.Column mobile={1} tablet={3} computer={4}></Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default LoginComponent






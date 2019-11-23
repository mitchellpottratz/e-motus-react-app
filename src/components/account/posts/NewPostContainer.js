import React, { Component } from 'react'
import { Container, Grid, Segment, Form, Button, Label } from 'semantic-ui-react'

// emoji picker component
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'


class NewPostContainer extends Component {
	constructor() {
		super()

		this.state = {
			content: '',
			emotion: '',
			emoji: ''
		}
	}

	// handles the change for the inputs on the new post form
	handleChange = (e) => {
		console.log('handleChange called')
		this.setState({
			[e.target.name]: e.target.value
		})
		console.log(this.state)
	}

	// calls the api to create a new post
	addPost = async () => {
		try {
			// makes api call to create a new post
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/posts/', {
				method: 'POST',
				body: JSON.stringify(this.state),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			// parsed the response 
			const parsedResponse = await response.json()
			console.log(parsedResponse)

			// if the new post was successfully created
			if (parsedResponse.status.code === 201) {
				// hides this component and display the AccountContainer
				this.props.postCreated()
			} else {
				console.log('something went wrong....')
			}

		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<Container className="form-container">
				<Grid>
					<Grid.Row columns={3}>
						<Grid.Column width={3}></Grid.Column>

						<Grid.Column width={10}>
							<Segment>
								<h1>New Post</h1>

								<Form onSubmit={this.addPost}>
									<Form.Field>
										<Form.TextArea	name="content"
														label="Content"
														placeholder='Whats on your mind?' 
														onChange={this.handleChange}/>	
									</Form.Field>

									<Form.Group widths="equal">
										<Form.Field>
											<Form.Input type="text"
														label="Emotion"
														name="emotiion"
														placeholder="How you're feeling..."
														onChange={this.handleChange} />
										</Form.Field>
										<Form.Field>
											<Form.Input type="text"
														label="Emoji"
													    name="emoji"
													    placeholder="Emoji"
													    onChange={this.handleChange} />
										</Form.Field>
									</Form.Group>

									<Button type="submit" color="blue">Post</Button>
								</Form>
								
							</Segment>
						</Grid.Column>

						<Grid.Column width={3}></Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		)
	}
}

export default NewPostContainer





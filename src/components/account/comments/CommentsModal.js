import React, { Component } from 'react'
import { Form, Label, Modal, Header, Button, Icon } from 'semantic-ui-react'


class CommentsModal extends Component {

	constructor() {
		super()

		this.state = {
			content: ''
		}
	}

	componentDidMount() {
		// gets all of the comments for this post
		this.getComments(this.props.postId) 
	}

	// handles the change for the comment input
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// gets all of the comments for a post
	getComments = async (postId) => {
		try {
			// makes api call to get all the comments for the post
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/' + postId, {
				method: 'GET',
				credentials: 'include',
			})

			// parses the response
			const parsedResponse = await response.json()
			console.log(parsedResponse)

		} catch (error) {
			console.log(error);
		}
	}

	// creates a new comment for the post
	addComment = () => {
		
	}

	render() {
		return (
			<Modal open={true}>
				<Header content="Edit Dog" />
				<Modal.Content scrolling>
					
					comments here

				</Modal.Content>

				<Modal.Actions>
					<Form>
						<Form.Group>
							<Form.Input type="text"
										name="comment"
										onChange={this.handleChange}
										placeholder="Comment Something..." />
							<Form.Button type="submit"
										 content="Comment" />
						</Form.Group>
					</Form>
				</Modal.Actions>
     		</Modal>
		)
	}
}

export default CommentsModal






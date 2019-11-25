import React, { Component } from 'react'
import { Form, Label, Modal, Header, Button, Icon } from 'semantic-ui-react'

// component imports 
import CommentList from './CommentList.js'


class CommentsModal extends Component {

	constructor(props) {
		super(props)

		this.state = {
			post_id: props.postId,
			comments: [],
			content: ''
		}
	}

	componentDidMount() {
		// gets all of the comments for this post
		this.getComments() 
	}

	// handles the change for the comment input
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
		console.log('content value:', this.state.content)
	}

	// gets all of the comments for a post
	getComments = async () => {
		try {
			// makes api call to get all the comments for the post
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/' + this.state.post_id, {
				method: 'GET',
				credentials: 'include',
			})

			// parses the response
			const parsedResponse = await response.json()
			
			// if the api request was successful
			if (parsedResponse.status.code === 200) {
				// set the comments in the state
				this.setState({
					comments: parsedResponse.data
				})
			} 

		} catch (error) {
			console.log(error);
		}
	}

	// creates a new comment for the post
	addComment = async (e) => {
		e.preventDefault()
		try {
			// makes api call to create a new comment
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			// parses the response
			const parsedResponse = await response.json()
	


		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<Modal open={true}>
				<Header content="Comments" />
				<Modal.Content scrolling>
					
					<CommentList comments={this.state.comments} />

				</Modal.Content>

				<Modal.Actions>
					<Form onSubmit={this.addComment} fluid>
						<Form.Group>
							<Form.Input type="text"
										width={12}
										name="content"
										onChange={this.handleChange}
										placeholder="Comment Something..." />
							<Form.Button type="submit"
										 width={2}
										 color="blue"
										 content="Comment" />
						</Form.Group>
					</Form>
				</Modal.Actions>
     		</Modal>
		)
	}
}

export default CommentsModal






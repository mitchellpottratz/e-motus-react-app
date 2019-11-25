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
			userCommentIds: [],
			content: ''
		}
	}

	componentDidMount() {
		// gets all of the comments for this post
		this.getComments() 

		// gets all the current users comments for this post
		this.getUsersComments()
	}

	// handles the change for the comment input
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
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

	// gets all of the users comments for this post
	getUsersComments = async () => {
		try {
			// makes api call to get all the users comments for the post
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/user/' + this.state.post_id, {
				method: 'GET',
				credentials: 'include',
			})

			// parses the response
			const parsedResponse = await response.json()
			console.log('users comment for this post:', parsedResponse)

			// set the users comment in the state
			this.setState({
				userCommentIds: parsedResponse.data.map(comment => comment.id)
			})

		} catch (error) {
			console.log(error)
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
			console.log(parsedResponse.data)

			// add the new comment to the state, clear the content property 
			// to clear the comment input on
			this.setState({
				comments: [parsedResponse.data, ...this.state.comments],
				userCommentIds: [...this.state.userCommentIds, parsedResponse.data.id],
				content: ''
			})

		} catch (error) {
			console.log(error);
		}
	}

	// deletes a comment
	deleteComment = async (commentId) => {
		try {
			// makes api call to delete a comment
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/' + commentId, {
				method: 'DELETE',
				credentials: 'include',
			})

			// parses the response
			const parsedResponse = await response.json()
			console.log('comment deleted:', parsedResponse)

			// remove the deleted comment from the comments array and userCommentIds array
			this.setState({
				comments: this.state.comments.filter(comment => comment.id != commentId),
				userCommentIds: this.state.userCommentIds.filter(id => id != commentId )
			})

		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<Modal open={true}>
				<Header content="Comments" />
				<Modal.Content scrolling>
					
					{
						this.state.comments.length === 0
						?
						<p>No Comments</p>
						:
						<CommentList comments={this.state.comments} 
								 userCommentIds={this.state.userCommentIds}
								 deleteComment={this.deleteComment} />
					}
					

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
				<Modal.Actions>
					<Button type="button"
							onClick={ () => this.props.closeCommentsModal() } 
							color="red"
							content="Close"/>
				</Modal.Actions>
     		</Modal>
		)
	}
}

export default CommentsModal






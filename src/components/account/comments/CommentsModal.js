import React, { Component } from 'react'
import { Form, Label, Modal, Header, Button, Icon, Dimmer, Loader } from 'semantic-ui-react'

// component imports 
import CommentList from './CommentList.js'


class CommentsModal extends Component {

	constructor(props) {
		super(props)

		this.state = {
			post_id: props.postId, // post id of the comments this modal is displaying
			comments: [], // all of the posts comments
			userCommentIds: [], // all of the ids of the post the user has liked
			modalDoneLoading: false, // determines where to show loading icon or the modals contents
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

			// set the users comment in the state, and changes modalDoneLoading to true
			// so the loading icon disapears and the modals content is shown
			this.setState({
				userCommentIds: parsedResponse.data.map(comment => comment.id),
				modalDoneLoading: true
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

		// determine if the modal should show its contents
		const renderModalContent = () => {

			// if the modal is not done loading
			if (this.state.modalDoneLoading === false) {
				return <Dimmer active inverted>
        					<Loader inverted>Loading</Loader>
      					</Dimmer>

			// if the modal is done loading
			} else {

				// if there are no comments for this post
				if (this.state.comments.length === 0) {
					return <p>No Comments</p>

				// if there are comments for this post
				} else {
					return <CommentList comments={this.state.comments} 
								 	 	userCommentIds={this.state.userCommentIds}
								 	 	deleteComment={this.deleteComment} />
					
				}
			}
		}

		return (
			<Modal open={true}>
				<Header content="Comments" />
				<Modal.Content scrolling>

					{renderModalContent()}

				</Modal.Content>
				<Modal.Actions>
					<Form onSubmit={this.addComment} fluid>
						<Form.Group>
							<Form.Input type="text"
										width={12}
										name="content"
										onChange={this.handleChange}
										value={this.state.content}
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






import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'


class LikeButtons extends Component {

	constructor() {
		super()

		this.state = {
			usersLikedPostIds: []
		}
	}

	// called after every time the component renders
	componentDidMount() {
		this.getUsersLikedPostIds()
	}

	// gets all of the posts the user has liked
	getUsersLikedPostIds = async () => {
		try {
			// makes call to api to gets all of the posts the user has liked
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/likes/user', {
				method: 'GET',
				credentials: 'include',
			})

			// parses the response
			const parsedResponse = await response.json()

			// set the all of the posts ids in the state
			this.setState({
				usersLikedPostIds: parsedResponse.data.map(post => post.id)
			})
			console.log(this.state.usersLikedPostIds)

		} catch (error) {
			console.log(error);
		}
	}

	// likes a post 
	likePost = async (postId) => {
		try {
			// makes call to the api to like a post
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/likes/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({'postId': postId}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			// parses the response
			const parsedResponse = await response.json()
			console.log(parsedResponse)

			// adds the liked post to the state
			this.setState({
				usersLikedPostIds: [...this.state.usersLikedPostIds, postId]
			})

			console.log(this.state.usersLikedPostIds)

		} catch (error) {
			console.log(error);
		}
	}

	// removes a like from a post 
	removeLike = async (postId) => {
		try {
			// makes call to the api to remove a like from a post
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/likes/' + postId, {
				method: 'DELETE',
				credentials: 'include',
			})	

			// parses the response
			const parsedResponse = await response.json()
			console.log(parsedResponse)

			// adds the liked post to the state
			this.setState({
				usersLikedPostIds: this.state.usersLikedPostIds.filter(id => id !== postId)
			})

			console.log(this.state.getUsersLikedPostIds)

		} catch (error) {
			console.log(error);
		}
	}

	render() {

		// if the post is already liked by the user
		if (this.state.usersLikedPostIds.includes(this.props.postId)) {

			// show the button that shows they already liked the pst
			return (<Button color="grey" onClick={ () => this.removeLike(this.props.postId) }>Liked</Button>)

		// if the post has not already been liked by the user
		} else {

			// show the button that shows they havent already liked the post
			return (<Button icon='thumbs up outline' color="blue" onClick={ () => this.likePost(this.props.postId) } />)
		}

	}
}

export default LikeButtons





import React, { Component } from 'react'
import { Button, Icon, Loader } from 'semantic-ui-react'


class LikeButtons extends Component {

	constructor(props) {
		super(props)

		this.state = {
			likeCount: parseInt(props.likeCount),
		}
	}

	// // called after every time the component renders
	// componentDidMount() {
	// 	this.getUsersLikedPostIds()
	// }

	// // gets all of the posts the user has liked
	// getUsersLikedPostIds = async () => {

	// 	// set loadedLikedPosts to false so the loader shows up
	// 	this.setState({
	// 		loadedLikedPosts: false
	// 	})

	// 	try {
	// 		// makes call to api to gets all of the posts the user has liked
	// 		const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/likes/user', {
	// 			method: 'GET',
	// 			credentials: 'include',
	// 		})

	// 		// parses the response
	// 		const parsedResponse = await response.json()

	// 		// set the all of the posts ids in the state
	// 		this.setState({
	// 			usersLikedPostIds: parsedResponse.data.map(post => post.id),
	// 			loadedLikedPosts: true
	// 		})

	// 		console.log('initial users liked posts ids:', this.state.usersLikedPostIds)

	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

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
			console.log('like post response:', parsedResponse)

			// adds one to the liked posts like count
			this.setState({
				likeCount: this.state.likeCount += 1
			})

			this.props.addLikedPostId(postId)

			console.log('users liked post ids after new like:', this.props.usersLikedPostIds)

		} catch (error) {
			console.log(error);
		}
	}

	// removes a like from a post 
	removeLike = async (postId) => {
		try {
			console.log('post id being sent:', postId)
			// makes call to the api to remove a like from a post
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/likes/' + postId, {
				method: 'DELETE',
				credentials: 'include',
			})	

			// parses the response
			const parsedResponse = await response.json()
			console.log('like post response:', parsedResponse)

			console.log('users liked post ids before delete:', this.props.usersLikedPostIds)

			// removes the liked posts from the state and subtracts one from the posts like count
			this.setState({
				likeCount: this.state.likeCount -= 1
			})

			this.props.removeLikedPostId(postId)

			console.log('users liked post ids after delete:', this.props.usersLikedPostIds)

		} catch (error) {
			console.log(error);
		}
	}

	render() {

		// if the users liked posts have not loaded
		if (this.props.loadedLikedPosts === false) {

			// show a loader icon instead of a button
			return (
				<Loader active />
			)

		// if the users liked posts have not loaded
		} else {

			// if the post is already liked by the user
			if (this.props.usersLikedPostIds.includes(this.props.postId)) {

				// show the button that shows they already liked the post
				return (
					<Button
					  floated="right"
				      content='Liked'
				      icon='heart'
				      label={{ as: 'a', basic: true, pointing: 'right', content: this.state.likeCount }}
				      labelPosition='left'
				      onClick={() => this.removeLike(this.props.postId) }
	    			/>
				)

			// if the post has not already been liked by the user
			} else {

				// show the button that shows they havent already liked the post
				return (
					<Button
					  floated="right"
				      content='Like'
				      icon='heart'
				      color="red"
				      label={{ as: 'a', basic: true, pointing: 'right', content: this.state.likeCount }}
				      labelPosition='left'
				      onClick={() => this.likePost(this.props.postId) }
	    			/>
				)
			}
		}

	}
}

export default LikeButtons





import React, { Component } from 'react'
import { Segment, Grid, Menu, Container, Header, Image } from 'semantic-ui-react'

// component imports 
import PostsList from './posts/PostsList.js'


class FeedContainer extends Component {

	constructor() {
		super()

		this.state = {
			posts: [],
			usersLikedPostIds: [],
			loadedLikedPosts: false,
		}
	}

	// called after every time the component renders
	componentDidMount() {
		this.getPosts() // gets posts from other users the user follows
		this.getUsersLikedPostIds() // gets all of the post ids form the post the uses has liked
	}

	// gets all of the posts from users the current users follows
	getPosts = async () => {
		try {
			// makes api call to get posts for the users feed
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/posts/feed', {
				method: 'GET',
				credentials: 'include'
			})

			// parses the response
			const parsedResponse = await response.json()

			// set the posts in the state
			this.setState({
				posts: parsedResponse.data
			})

		} catch (error) {
			console.log(error);
		}
	}

	// gets all of the posts the user has liked
	getUsersLikedPostIds = async () => {

		// set loadedLikedPosts to false so the loader shows up
		this.setState({
			loadedLikedPosts: false
		})

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
				usersLikedPostIds: parsedResponse.data.map(post => post.id),
				loadedLikedPosts: true
			})

			console.log('initial users liked posts ids:', this.state.usersLikedPostIds)

		} catch (error) {
			console.log(error);
		}
	}

	addLikedPostId = (postId) => {
		this.setState({
			usersLikedPostIds: [...this.state.usersLikedPostIds, postId]
		})
	}

	removeLikedPostId = (postId) => {
		this.setState({
			usersLikedPostIds: this.state.usersLikedPostIds.filter(id => id !== postId),
		})
	}

	render() {
		return (
			<Container id="feed-container">
				<Segment className="feed-segment">
					<PostsList posts={this.state.posts}
							   header={'Your Feed'}
							   userIsOwner={false} 
							   usersLikedPostIds={this.state.usersLikedPostIds}
							   addLikedPostId={this.addLikedPostId}
							   removeLikedPostId={this.removeLikedPostId}
							   loadedLikedPosts={this.state.loadedLikedPosts} />
				</Segment>
			</Container>
		)
	}
}

export default FeedContainer








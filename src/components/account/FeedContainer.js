import React, { Component } from 'react'
import { Segment, Grid, Menu, Container, Header, Image } from 'semantic-ui-react'

// component imports 
import PostsList from './posts/PostsList.js'


class FeedContainer extends Component {

	constructor() {
		super()

		this.state = {
			posts: [],
			usersLikes: [] 
		}
	}

	// called after every time the component renders
	componentDidMount() {
		this.getPosts()
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
			console.log(parsedResponse.data[0].likes)

			// set the posts in the state
			this.setState({
				posts: parsedResponse.data
			})
			console.log(this.state.posts)

		} catch (error) {
			console.log(error);
		}
	}

	getUsersLikes = async () => {
		try {
			// makes call to api to gets all of the users likes
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/likes/user', {
				method: 'GET',
				credentials: 'include',
			})

			// parses the response
			const parsedResponse = await response.json()

			// set the posts in the state
			this.setState({
				usersLikes: parsedResponse.data
			})
			console.log(this.state.usersLikes)

		} catch (error) {
			console.log(error);
		}
	}

	// likes a post 
	likePost = async (postId) => {
		try {
			// makes call to the api like a post
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


		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<Container>
				<Segment>
					<PostsList posts={this.state.posts} header={'Your Feed'} userIsOwner={false} likePost={this.likePost} />
				</Segment>
			</Container>
		)
	}
}

export default FeedContainer








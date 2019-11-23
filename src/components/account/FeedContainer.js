import React, { Component } from 'react'
import { Segment, Grid, Menu, Container, Header, Image } from 'semantic-ui-react'

// component imports 
import PostsList from './posts/PostsList.js'


class FeedContainer extends Component {

	constructor() {
		super()

		this.state = {
			posts: [],
		}
	}

	// called after every time the component renders
	componentDidMount() {
		this.getPosts() // gets posts from other users the user follows
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

	render() {
		return (
			<Container id="feed-container">
				<Segment className="feed-segment">
					<PostsList posts={this.state.posts}
							   header={'Your Feed'}
							   userIsOwner={false} />
				</Segment>
			</Container>
		)
	}
}

export default FeedContainer








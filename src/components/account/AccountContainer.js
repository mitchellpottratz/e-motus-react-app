import React, { Component } from 'react'
import { Segment, Grid, Menu, Container, Header, Image, Button, Loader } from 'semantic-ui-react'

// component imports
import PostsList from './posts/PostsList.js'
import LikesList from './likes/LikesList.js'
import FollowersList from './follows/FollowersList.js'


class AccountContainer extends Component {

	constructor() {
		super()

		this.state = {
			showPosts: true, // whether to show the PostList tab
			showLikes: false, // whether to show the LikesList tab
			showFollowers: false, // whether to show the FollowersList tab

			posts: [], // holds the users posts
			likedPosts: [], // holds the users likes
			followers: [], // holds the users comments

			loadedPosts: false,
			loadedLikes: false,
			loadedFollowers: false
		}

		// makes api call to populate the users posts tab, because that tab
		// will always be open when the component is initially rendered
		this.getUsersPosts()
	}
	
	// handles the logic for switching between the 
	// posts, likes and followers tabs
	handleTabClick = (e) => {
		// text of the tab that was clicked
		const tab = e.target.text

		// if posts tab was clicked
		if (tab === 'Posts') {
			this.setState({
				showPosts: true,
				showLikes: false,
				showFollowers: false
			})
			// calls method to get all of the users posts
			this.getUsersPosts()

		// if likes tabs was clicked
		} else if (tab === 'Likes') {
			this.setState({
				showPosts: false,
				showLikes: true,
				showFollowers: false
			})			
			// calls method to get all of the users liked posts
			this.getUsersLikes()

		// if followers tab was clicked
		} else if (tab === 'Followers') {
			this.setState({
				showPosts: false,
				showLikes: false,
				showFollowers: true
			})
			// calls methods to get all of the users followers
			this.getUsersFollowers()
		} 

	}

	// makes api call to get all of the users posts, then passes 
	// then to PostsLists.js to display the posts
	getUsersPosts = async () => {

		// set loadPosts to false so the loading icon shows until
		// the posts are loaded
		this.setState({
			loadedPosts: false
		})

		try {
			// calls api to get all of the users posts
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/posts/', {
				method: 'GET',
				credentials: 'include'
			})

			// parses the response
			const parsedResponse = await response.json()

			// if the api call was successful
			if (parsedResponse.status.code === 200) {
				// sets the posts returned from the api into the state
				this.setState({
					posts: parsedResponse.data,
					loadedPosts: true
				})

			} else {
				console.log('error')
			}

		} catch (error) {
			console.log(error);
		}	
	}

	// makes api call to delete a post
	deletePost = async (postId) => {
		try {
			// makes api call to delete a post 
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/posts/' + postId, {
				method: 'DELETE',
				credentials: 'include',
			})

			// parses the response
			const parsedResponse = await response.json()

			// if the post was deleted successfully 
			if (parsedResponse.status.code === 200) {
				// remove the deleted post from the array of posts in the state
				this.setState({
					posts: this.state.posts.filter(post => post.id != postId)
				})
			} else {
				console.log('something went wrong')
			}

		} catch (error) {
			console.log(error);
		}
	} 

	// gets all of the post the user has liked
	getUsersLikes = async () => {

		// set loadLikes to false so the loading icon shows until
		// the likes are loaded
		this.setState({
			loadedLikes: false
		})

		try {
			// makes api call to get all of the post the user has liked
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/likes/user', {
				method: 'GET',
				credentials: 'include',
			})

			// parses the response
			const parsedResponse = await response.json()

			// if the api call was successful
			if (parsedResponse.status.code === 200) {
				// add the liked post to the state
				this.setState({
					likedPosts: parsedResponse.data,
					loadedLikes: true
				})
			} else {
				console.log('something went wrong')
			}	

		} catch (error) {
			console.log(error);
		}	
	}

	// deletes a like
	deleteLike = async (postId) => {
		try {
			// makes api call to delete a like
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/likes/' + postId, {
				method: 'DELETE',
				credentials: 'include',
			})

			// parses the response
			const parsedResponse = await response.json()

			// if the api call was successful
			if (parsedResponse.status.code === 200) {
				// remove the newly deleted like from the array
				this.setState({
					likedPosts: this.state.likedPosts.filter(post => post.id !== postId)
				})
			} else {
				console.log('something went wrong')
			}	

		} catch (error) {
			console.log(error);
		}
	}

	// gets all of the users followers
	getUsersFollowers = async () => {

		// set loadLikes to false so the loading icon shows until
		// the likes are loaded
		this.setState({
			loadedFollowers: false
		})

		try {
			// makes call to the api to get all of the users follower
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/follows/followers', {
				method: 'GET',
				credentials: 'include',
			})

			// parses the response
			const parsedResponse = await response.json()

			// if the response was successful
			if (parsedResponse.status.code === 200) {

				// sets the users followers in the state
				this.setState({
					followers: parsedResponse.data,
					loadedFollowers: true
				})

			} else {
				console.log('error')
			}

		} catch (error) {
			console.log(error);
		}
	}


	render() {

		// determines which content to show depending on what tab the user 
		// has open
		const tabToRender = () => {

			if (this.state.showPosts === true) {

				// if the users posts have not loaded yet
				if (this.state.loadedPosts === false) {
					return <Loader active />

				// if the users posts have loaded
				} else {
					return <PostsList posts={this.state.posts}
								  deletePost={this.deletePost}	
								  header={'Your Posts'} 
								  userIsOwner={true} />
				}
				
			} else if (this.state.showLikes === true) {

				// if the users likes have not loaded yet
				if (this.state.loadedLikes === false) {
					return <Loader active />

				// if the users likes have loaded
				} else {
					return <LikesList likedPosts={this.state.likedPosts} 
								  	  deleteLike={this.deleteLike}
								  	  header={'Your Liked Posts'}
								      userIsOwner={true} />
				}

			} else if (this.state.showFollowers === true) {

				// if the users followers have not loaded yet
				if (this.state.loadedFollowers === false) {
					return <Loader active />

				// if the users followers have loaded
				} else {
					return <FollowersList followers={this.state.followers}
									  	  unfollower={this.unfollowUser}
									      header={'Your Followers'}
									      userIsOwner={true} />
				}
			}
		}

		// content that will render on the page
		return (
			<Container>
				<Segment clearing className="account-header-segment">
					<Grid>
						<Grid.Row>

							<Grid.Column width={3}>
								<Header as="h1" className="small-margin-header">
									<Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> 
								</Header>
							</Grid.Column>

							<Grid.Column width={13}>
								<Container floated="left">
									<Header as="h1" className="small-margin-header">
										{this.props.user.first_name} {this.props.user.last_name}
									</Header>
									<Header as="h4" className="small-margin-header">
										@{this.props.user.username}
									</Header>
									<Header as="h5" className="small-margin-header">
										{this.props.user.followers.length} Followers
									</Header>
								</Container>
							</Grid.Column>

						</Grid.Row>
					</Grid>
					

				</Segment>

				<Segment id="tab-segment">
					<Menu tabular widths={4}>
			        	<Menu.Item
				            name='Posts'
				            active={this.state.showPosts}
				            onClick={this.handleTabClick}
			          	/>
			            <Menu.Item
				            name='Likes'
				            active={this.state.showLikes}
				            onClick={this.handleTabClick}
			          	/>
			          	<Menu.Item
				            name='Followers'
				            active={this.state.showFollowers}
				            onClick={this.handleTabClick}
			          	/>
			        </Menu>

			        <Container className="tab-container">
			      
			        	{tabToRender()}

			        </Container>
			       
				</Segment>
				
			</Container>
		)
	}
}

export default AccountContainer



import React, { Component } from 'react'
import { Segment, Grid, Menu, Container, Header, Image } from 'semantic-ui-react'

// component imports
import PostsList from './posts/PostsList.js'


class AccountContainer extends Component {

	constructor() {
		super()

		this.state = {
			showPosts: true,
			showLikes: false,
			showFollowers: false,
			posts: [], // holds the users posts
			likes: [], // holds the users likes
			comments: [] // holds the users comments
		}

		// makes api call to populate the users posts tab, because that tab
		// will always be open when the component is initially rendered
		this.getUsersPosts()
	}

	// this is called everytime the component renders
	// componentDidMount() {
	
	// }
	
	// handles the logic for switching between the 
	// posts, likes and followers tabs
	handleTabClick = (e) => {
		console.log('handleTabClick called')
		console.log(e.target.text)

		// text of the tab that was clicked
		const tab = e.target.text

		// if posts tab was clicked
		if (tab === 'Posts') {
			this.setState({
				showPosts: true,
				showLikes: false,
				showFollowers: false
			})

		// if likes tabs was clicked
		} else if (tab === 'Likes') {
			this.setState({
				showPosts: false,
				showLikes: true,
				showFollowers: false
			})			
	
		// if followers tab was clicked
		} else if (tab === 'Followers') {
			this.setState({
				showPosts: false,
				showLikes: false,
				showFollowers: true
			})
		} 

	}

	// makes api call to get all of the users posts, then passes 
	// then to PostsLists.js to display the posts
	getUsersPosts = async () => {
		try {
			// calls api to get all of the users posts
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/posts/', {
				method: 'GET',
				credentials: 'include'
			})

			// parses the response
			const parsedResponse = await response.json()

			// sets the posts returned from the api into the state
			this.setState({
				posts: parsedResponse.data
			})

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
			console.log(parsedResponse)

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

	getUsersLikes = async () => {
		console.log('getUsersLikes called')
	}

	getUsersFollowers = async () => {
		console.log('getUsersComments called')
	}

	render() {

		// determines which content to show depending on what tab the user 
		// has open
		const tabToRender = () => {
			if (this.state.showPosts === true) {
				return <PostsList posts={this.state.posts} header={'Your Posts'} userIsOwner={true} />
			} else if (this.state.showLikes === true) {
				return 'show likes'
			} else if (this.state.showFollowers === true) {
				return 'show followers'
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

							<Grid.Column width={6}>
								<Container floated="left">
									<Header as="h1" className="small-margin-header">
										{this.props.user.first_name} {this.props.user.last_name}
									</Header>
									<Header as="h4" className="small-margin-header">
										@{this.props.user.username}
									</Header>
									<Header as="h5" className="small-margin-header">
										followers count here
									</Header>
								</Container>
							</Grid.Column>

						</Grid.Row>
					</Grid>
				</Segment>

				<Segment>
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



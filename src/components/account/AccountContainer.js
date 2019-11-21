import React, { Component } from 'react'
import { Segment, Grid, Menu, Container, Header, Image } from 'semantic-ui-react'

// component imports
import PostsList from './posts/PostsList.js'


class AccountContainer extends Component {

	constructor() {
		super()

		this.state = {
			activeTab: 'posts', // determines what tab to show the user
			posts: [], // holds the users posts
			likes: [], // holds the users likes
			comments: [] // holds the users comments
		}
	}

	// this is called everytime the component renders
	componentDidMount() {
		// switch state determines which tab should be displayed
		// between 'posts', 'likes' and comments, and also detemines
		// which api should be called to get the correct content
		switch (this.state.activeTab) {
			case 'posts':
				// this method gets all of the users post and renders them
				this.getUsersPosts()
				break
			case 'likes':
				// this method gets all of the posts the user has liked
				this.getUsersLikes()
				return 'likes container'
			case 'comments':
				// this method gets all of the users comments
				this.getUserComments()
				return 'comments container'
		}
	}

	renderTab = () => {
		
	}

	// handles the logic for switching between the 
	// 'posts', 'likes' and 'comments' tabs
	handleTabClick = (tab) => {
		console.log('handleTabClick called')
		console.log(tab)

		// // set the state to the tab that was just clicked
		// this.setState({})
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
			
			console.log(typeof this.state.posts)

			// sets the posts returned from the api into the state
			this.setState({
				posts: parsedResponse.data
			})

		} catch (error) {
			console.log(error);
		}	
	}

	getUsersLikes = async () => {
		console.log('getUsersLikes called')
	}

	getUsersComments = async () => {
		console.log('getUsersComments called')
	}

	render() {

		// determines which content to show depending on what tab the user 
		// has open
		const tabToRender = () => {
			switch (this.state.activeTab) {
				case 'posts':
					return <PostsList posts={this.state.posts} />
				case 'likes':
					return 'likes container'
				case 'comments':
					return 'comments container'
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
				            active={this.state.activeTab === 'posts'}
				            onClick={this.handleTabClick('posts')}
			          	/>
			            <Menu.Item
				            name='Likes'
				            active={this.state.activeTab === 'likes'}
				            onClick={this.handleTabClick('likes')}
			          	/>
			          	<Menu.Item
				            name='Comments'
				            active={this.state.activeTab === 'comments'}
				            onClick={this.handleTabClick('comments')}
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



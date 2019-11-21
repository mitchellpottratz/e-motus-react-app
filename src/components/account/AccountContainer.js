import React, { Component } from 'react'
import { Segment, Grid, Menu, Container, Header, Image } from 'semantic-ui-react'


class AccountContainer extends Component {

	constructor() {
		super()

		this.state = {
			activeTab: 'posts'
		}
		this.getUsersPosts()
	}

	// handles the logic for switching between the 
	// 'posts', 'likes' and 'comments' tabs
	handleTabClick = (e) => {
		console.log('handleTabClick called')
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
			console.log(parsedResponse)

		} catch (error) {
			console.log(error);
		}	
	}

	render() {
		return (
			<Container>
				<Segment clearing className="account-header-segment">
					<Grid>
						<Grid.Row>

							<Grid.Column width={3}>
								<Header as="h1">
									<Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> 
								</Header>
							</Grid.Column>

							<Grid.Column width={6}>
								<Container floated="left">
									<Header as="h1">
										{this.props.user.first_name} {this.props.user.last_name}
									</Header>
									<Header as="h4">
										@{this.props.user.username}
									</Header>
									<Header as="h5">
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
				            onClick={this.handleTabClick}
			          	/>
			            <Menu.Item
				            name='Likes'
				            active={this.state.activeTab === 'likes'}
				            onClick={this.handleTabClick}
			          	/>
			          	<Menu.Item
				            name='Comments'
				            active={this.state.activeTab === 'comments'}
				            onClick={this.handleTabClick}
			          	/>
			        </Menu>



				</Segment>

			</Container>
		)
	}
}

export default AccountContainer



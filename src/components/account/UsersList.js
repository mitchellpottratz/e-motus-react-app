import React from 'react'
import { Grid, Card, Image, Button } from 'semantic-ui-react'

// component imports 
import FollowButtons from './follows/FollowButtons.js'


function UsersList(props) {

	// iterate through the array of user object and create cards
	// out of each one
	const userCards = props.users.map(user => {
		return (
			<Grid.Column key={user.id} computer={5} tablet={8} mobile={16}>
				<Card fluid>
					<Card.Content>
						<Image
	            			floated='right'
	            			size='mini'
	          				src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
	        			/>
	       	 			<Card.Header>{user.first_name} {user.last_name}</Card.Header>
				        <Card.Meta>@{user.username}</Card.Meta>
				        <Card.Meta>{user.followers.length} Followers</Card.Meta>
	 				</Card.Content>
	 				<Card.Content id="follow-btns-container" extra>
	 					<FollowButtons userId={user.id} followersCount={user.followers.length} />
	 				</Card.Content>
				</Card>
			</Grid.Column>
		)
	})

	return (
		<Grid centered id="search-results-cards">
			{userCards}
		</Grid>
	)

}

export default UsersList



import React from 'react'
import { Grid, Card, Image, Button } from 'semantic-ui-react'

// component imports 
import FollowButtons from './follows/FollowButtons.js'


function UsersList(props) {

	// iterate through the array of user object and create cards
	// out of each one
	const userCards = props.users.map(user => {
		return (
			<Card key={user.id}>
				<Card.Content>
					<Image
            			floated='right'
            			size='mini'
          				src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        			/>
       	 			<Card.Header>{user.first_name} {user.last_name}</Card.Header>
			        <Card.Meta>something here</Card.Meta>
			        <Card.Description>
          				something else here
        			</Card.Description>
 				</Card.Content>
 				<Card.Content extra>
 					<FollowButtons userId={user.id} />
 				</Card.Content>
			</Card>
		)
	})

	return (
		<Card.Group id="search-results-cards">	
			{userCards}
		</Card.Group>
	)

}

export default UsersList



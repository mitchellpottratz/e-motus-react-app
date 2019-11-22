import React from 'react'
import { Grid, Card, Image, Button } from 'semantic-ui-react'


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
 					<Button type="button" color="blue">Follow</Button>
 				</Card.Content>
			</Card>
		)
	})

	return (
		<Card.Group>	
			{userCards}
		</Card.Group>
	)

}

export default UsersList



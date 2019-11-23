import React from 'react'
import { Grid, Card, Header, Button } from 'semantic-ui-react'


function FollowersList(props) {

	const followersList = props.followers.map(follow => {
		return (
			<Card fluid key={follow.followed_by.id}>
		      	<Card.Content>
		      		<Card.Header>{follow.followed_by.first_name} {follow.followed_by.last_name}</Card.Header>
			        <Card.Meta>{follow.followed_by.username}</Card.Meta>
			        <Card.Meta>{follow.timestamp}</Card.Meta>
		      	</Card.Content>	
    		</Card>
		)
	})

	return (
		<div>
			<Header as="h3">
				{props.header}
			</Header>
			<Card.Group centered>
				{followersList}
			</Card.Group>
		</div>
	)
}

export default FollowersList







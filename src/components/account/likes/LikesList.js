import React from 'react'
import { Grid, Card, Header, Button } from 'semantic-ui-react'


function LikesList(props) {

	const likedPostsList = props.likedPosts.map(post => {
		return (
			<Card fluid key={post.id}>
		      	<Card.Content>
			        <Card.Header>{post.user.username}</Card.Header>
			        <Card.Meta>{post.timestamp}</Card.Meta>
			        <Card.Description>
			        	{post.content}
			        </Card.Description>
		      	</Card.Content>
		      	<Card.Content extra>
		      		<Button type="button" color="red" onClick={ () => props.deleteLike(post.id) }>Delete Like</Button>
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
				{likedPostsList}
			</Card.Group>
		</div>
	)
}

export default LikesList

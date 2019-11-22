import React from 'react'
import { Grid, Card, Header, Button } from 'semantic-ui-react'


function PostsList(props) {

	// maps all of the posts into an array of cards
	const posts = props.posts.map((post) => {
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
		      		<Button type="button" color="red" onClick={ () => props.deletePost(post.id) }>Delete</Button>
		      	</Card.Content>
    		</Card>
		)
	})

	return (
		<div>
			<Header as="h3">
				Your Posts
			</Header>
			<Card.Group centered>
				{posts}
			</Card.Group>
		</div>
	)
}

export default PostsList
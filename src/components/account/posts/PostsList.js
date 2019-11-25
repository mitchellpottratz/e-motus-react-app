import React from 'react'
import { Grid, Card, Header, Button, Icon } from 'semantic-ui-react'

// component imports 
import LikeButtons from '../likes/LikeButtons.js'


function PostsList(props) {

	// maps all of the posts into an array of cards
	const posts = props.posts.map((post) => {
		return (
			<Card fluid key={post.id}>
		      	<Card.Content>

		      		{
		      			props.userIsOwner === true
		      			?
		      			<Button floated="right" type="button" color="red" onClick={ () => props.deletePost(post.id) }>Delete</Button>
		      			:
						<LikeButtons 
							likeCount={post.likes.length}
							postId={post.id} 
							usersLikedPostIds={props.usersLikedPostIds}
							addLikedPostId={props.addLikedPostId}
							removeLikedPostId={props.removeLikedPostId}
							loadedLikedPosts={props.loadedLikedPosts}/>
		      		}
		      
		      		<Card.Header>{post.user.first_name} {post.user.last_name}</Card.Header>
			        <Card.Meta>@{post.user.username}</Card.Meta>
			        <Card.Meta>{post.timestamp}</Card.Meta>
			        <Card.Description id="post-description-contianer">
			        	<div id="content-card-container">
			        		<p>{post.content}</p>
			        	</div>

			        	<div id="emotion-emoji-card-container">
			        		<strong><p>{post.emotion}</p></strong>
							<p>{post.emoji}</p>
						</div>
			        </Card.Description>
		      	</Card.Content>
		      	<Card.Content extra>
		      		<Button type="button"
		      				color="blue"
		      				content="View Comment"
		      				onClick={ () => props.openCommentsModal(post.id) } />
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
				{posts}
			</Card.Group>
		</div>
	)
}

export default PostsList






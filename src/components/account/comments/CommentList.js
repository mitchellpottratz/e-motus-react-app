import React from 'react'
import { Comment, Header, Button, Icon } from 'semantic-ui-react'


function CommentList(props) {

	const commentList = props.comments.map(comment => {
		return (
			<Comment key={comment.id}>
		      <Comment.Content>
		        <Comment.Author as="a">{comment.user.first_name} {comment.user.last_name}</Comment.Author>
		        <Comment.Metadata>
		          <div>{comment.timestamp}</div>
		        </Comment.Metadata>
		        <Comment.Text>{comment.content}</Comment.Text>

		        {
		        	props.userCommentIds.includes(comment.id)
		        	?
		        	<Comment.Actions>
         				<a onClick={ () => props.deleteComment(comment.id) }>Delete</a>
        			</Comment.Actions>
        			: 
        			null
		        }
		        


		      </Comment.Content>
    		</Comment>		
    	)
	})

	return (
		<div>
			<Comment.Group>
				{commentList}
			</Comment.Group>
		</div>
	)

}

export default CommentList
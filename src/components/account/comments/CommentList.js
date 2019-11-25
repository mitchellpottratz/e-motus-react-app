import React from 'react'
import { Grid, Card, Header, Button, Icon } from 'semantic-ui-react'


function CommentList(props) {

	const commentList = props.comments.map(comment => {
		return (
			<p key={comment.id}>{comment.content}</p>
		)
	})

	return (
		<div>
			{commentList}
		</div>
	)

}

export default CommentList
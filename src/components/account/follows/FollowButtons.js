import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'


class FollowButtons extends Component {
	
	constructor() {
		super()

		this.state = {
			usersFollowedIds: []
		}
	}

	componentDidMount() {
		this.getFollowedUsersIds()
	}

	// gets all of the user ids from users the current user follows
	getFollowedUsersIds = async () => {
		try {
			// makes api call to get all the followed users
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/follows/following', {
				method: 'GET',
				credentials: 'include'
			})

			// parses the response
			const parsedResponse = await response.json()
			console.log('get followed user response:', parsedResponse)

			// add the user ids to the state
			this.setState({
				usersFollowedIds: parsedResponse.data.map(user => user.id)
			})

		} catch (error) {
			console.log(error);
		}
	}

	// follows a user
	followUser = async (userId) => {
		try {
			// makes api call to follow the user
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/follows/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({'user_followed': userId}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			
			// parses the response
			const parsedResponse = await response.json()
			console.log('follow user response:', parsedResponse)

			// if the api call was successful
			if (parsedResponse.status.code === 201) {
				// set the newly followed user id in the state
				this.setState({
					usersFollowedIds: [...this.state.usersFollowedIds, userId]
				})
			}

		} catch (error) {
			console.log(error);
		}
	}

	// unfollows a user
	unfollowUser = async (userId) => {
		try {
			// makes api call to unfollow the user
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/follows/' + userId, {
				method: 'DELETE',
				credentials: 'include'
			})

			// parses the response
			const parsedResponse = await response.json()
			console.log('unfollow user response:', parsedResponse)

			// if the api call was successful
			if (parsedResponse.status.code === 200) {
				// remove the users id from the state
				this.setState({
					usersFollowedIds: this.state.usersFollowedIds.filter(id => id !== userId)
				})
			}

		} catch (error) {
			console.log(error);
		}		
	}

	render() {

		// if the user is already following this user
		if (this.state.usersFollowedIds.includes(this.props.userId)) {

			// show button that allows them to unfollow the user
			return (<Button onClick={ () => this.unfollowUser(this.props.userId) }>Unfollow</Button>)

		// if the user is not already following this user
		} else {

			// show button that allows them to follow the user
			return (<Button onClick={ () => this.followUser(this.props.userId) }>Follow</Button>)
		}
	}

}


export default FollowButtons




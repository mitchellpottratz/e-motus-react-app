import React, { Component } from 'react'
import { Button, Loader } from 'semantic-ui-react'


class FollowButtons extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			usersFollowedIds: [], // the user ids of every user the current user follows
			followersCount: props.followersCount, // the number of followers the user has
			isLoading: true // shows loading icon on buttons until getFollowedUsersIds finished executing
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

			// add the user ids to the state
			this.setState({
				usersFollowedIds: parsedResponse.data.map(user => user.id),
				isLoading: false
			})

			this.props.toggleFollowersDoneLoading()
		

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
				// set the newly followed user id in the state, increase followers count by one
				this.setState({
					usersFollowedIds: [...this.state.usersFollowedIds, userId],
					followersCount: this.state.followersCount += 1
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
				// remove the users id from the state, decrement followers count by one
				this.setState({
					usersFollowedIds: this.state.usersFollowedIds.filter(id => id !== userId),
					followersCount: this.state.followersCount -= 1
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
			return (
				<Button
			        content='Unfollow'
			        icon='user'
			        label={{ as: 'a', basic: true, pointing: 'right', content: this.state.followersCount }}
			        labelPosition='left' 
			        onClick={ () => this.unfollowUser(this.props.userId) }
			        />
			)

		// if the user is not already following this user
		} else {

			// show button that allows them to follow the user
			return (
				<Button
			        content='Follow'
			        icon='user'
			        color="red"
			        label={{ as: 'a', basic: true, pointing: 'right', content: this.state.followersCount }}
			        labelPosition='left' 
			        onClick={ () => this.followUser(this.props.userId) }
			        />
			)
		}
	}

}


export default FollowButtons




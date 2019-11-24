import React, { Component } from 'react'
import { Segment, Container, Form, Card, Dimmer, Loader, Header } from 'semantic-ui-react'

// component imports 
import UsersList from './UsersList.js'


class FindContainer extends Component {
	constructor() {
		super()

		this.state = {
			value: '', // search value
			results: [], // array of users 
			isLoading: false // if the search results are still loading

		}
	}

	// handles the change for the search input
	handleChange = (e) => {
		
		// sets the state for the value property
		this.setState({
			value: e.target.value
		})

		// calls function to make api call to show search results
		this.getResults()
	}

	// makes an api call to get the search results 
	getResults = async () => {
		try {

			// change isLoading to true so the loading icon shows while the api call is executing
			this.setState({isLoading: true})

			// makes api call to get the search results
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/find', {
				method: 'POST',
				body: JSON.stringify({value: this.state.value}),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			// parses the response
			const parsedResponse = await response.json()

			// set the search results in that state and isLoading back to false
			// to display the results and hide the loading icon
			this.setState({
				results: [...parsedResponse.data],
				isLoading: false
			})

		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<Container id="find-container">

				<Segment id="find-segment">

					<Header as="h3">Find Users</Header>

					<Form.Input type="text"
								id="search-input"
								value={this.state.value}
						 		onChange={this.handleChange} 
						 		placeholder="Search For Other Users..." />

					 { this.state.isLoading === true 
					   ?
        			   <Loader active />
					   : 
					   <UsersList users={this.state.results} /> } 

				</Segment>
				
			</Container>
		)
	}
}

export default FindContainer






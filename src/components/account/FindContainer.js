import React, { Component } from 'react'
import { Segment, Container, Search, Form, Card } from 'semantic-ui-react'

// component imports 
import UsersList from './UsersList.js'


class FindContainer extends Component {
	constructor() {
		super()

		this.state = {
			value: '', // search value
			results: [], // array of users 

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

			// if the api call was successful
			// if (parsedResponse.status.code === 200) {
				// set the results in the state
				this.setState({
					results: [...parsedResponse.data]
				})

			// if there was an error in the api call
			// } else {
			// 	console.log('error')
			// }
			console.log('results:', this.state.results)


		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<Container>
				<Form.Input type="text" value={this.state.value} onChange={this.handleChange} />

				{this.state.results.length > 0 ? <UsersList users={this.state.results} /> : null}
				
			</Container>
		)
	}
}

export default FindContainer






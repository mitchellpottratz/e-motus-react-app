import React, { Component } from 'react'
import { Segment, Container, Search, Form } from 'semantic-ui-react'


class FindContainer extends Component {
	constructor() {
		super()

		this.state = {
			value: '',
			isLoading: false,
			results: []
		}
	}

	// handles the change for the search input
	handleChange = (e) => {
		
		// sets the state for the search property
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
			console.log(parsedResponse)


		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<Container>
				<Form.Input type="text" value={this.state.value} onChange={this.handleChange} />
			</Container>
		)
	}
}

export default FindContainer






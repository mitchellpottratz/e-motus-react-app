import React, { Component } from 'react'
import { Menu, Segment, Container } from 'semantic-ui-react'

// component imports 
import AccountContainer from './AccountContainer.js'
import NewPostContainer from './posts/NewPostContainer.js'
import FindContainer from './FindContainer.js'


class MainContainer extends Component {
	constructor() {
		super()

		this.state = {
			showAccount: true,
			showFind: false,
			showNew: false
		}
	}

	// handles the clicks on the menu to change the 
	// component being rendered 
	handleMenuClick = (e) => {
		console.log('handleMenuClick called')
		console.log(e.target.text)

		// text of the tab that was clicked
		const tab = e.target.text

		// if the account tab was clicked show AccountContainer
		if (tab === 'Account') {
			this.setState({
				showAccount: true,
				showFind: false,
				showNew: false
			})
		// if the find tab was clicked show the FindContainer
		} else if (tab === 'Find') {
			this.setState({
				showAccount: false,
				showFind: true,
				showNew: false
			})
		// if the New tab was clicks show the NewPostContainer
		} else if (tab === 'New') {
			this.setState({
				showAccount: false,
				showFind: false,
				showNew: true
			})
		}

	}

	// this method is passed to the NewPostContainer so from within
	// that component that it is able to hide itselfs and display 
	// the AccountContainer after the post is created
	postCreated = () => {
		this.setState({
			showAccount: true,
			showNew: false
		})	
	}

	render() {

		// determines which component will be shown
		const renderComponent = () => {
			if (this.state.showAccount === true) {
				return <AccountContainer user={this.props.user} />
			} else if (this.state.showFind === true) {
				return <FindContainer />
			} else if (this.state.showNew === true) {
				return <NewPostContainer postCreated={this.postCreated} />
			}	
		}

		return (
			<div>

					{renderComponent()}

				<div>
					<Menu tabular widths={4} className="bottom-menu">
			        	<Menu.Item
				            name='Account'
				            active={this.state.showAccount}
				            onClick={this.handleMenuClick}
			          	/>
			            <Menu.Item
				            name='Feed'
				            active={this.state.showFeed}
				            onClick={this.handleMenuClick}
			          	/>
			          	<Menu.Item
				            name='Find'
				            active={this.state.showFind}
				            onClick={this.handleMenuClick}
			          	/>
						<Menu.Item
				            name='New'
				            active={this.state.showNew}
				            onClick={this.handleMenuClick}
			          	/>
		        	</Menu>
	        	</div>
        	</div>

		)
	}
}

export default MainContainer


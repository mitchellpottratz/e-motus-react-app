import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

// component imports 
import AccountContainer from './AccountContainer.js'


class MainContainer extends Component {
	constructor() {
		super()

		this.state = {
			activeComponent: 'account',
		}
	}

	// handles the clicks on the menu to change the 
	// component being rendered 
	handleMenuClick = (e) => {
		console.log('handleMenuClick called')
	}

	render() {
		return (
			<div>

				<AccountContainer user={this.props.user} />

				<div>
					<Menu tabular widths={4} className="bottom-menu">
			        	<Menu.Item
				            name='Account'
				            active={this.state.activeComponent === 'account'}
				            onClick={this.handleMenuClick}
			          	/>
			            <Menu.Item
				            name='Feed'
				            active={this.state.activeComponent === 'feed'}
				            onClick={this.handleMenuClick}
			          	/>
			          	<Menu.Item
				            name='Find'
				            active={this.state.activeComponent === 'find'}
				            onClick={this.handleMenuClick}
			          	/>
						<Menu.Item
				            name='New'
				            active={this.state.activeComponent === 'new'}
				            onClick={this.handleMenuClick}
			          	/>
		        	</Menu>
	        	</div>
        	</div>

		)
	}
}

export default MainContainer


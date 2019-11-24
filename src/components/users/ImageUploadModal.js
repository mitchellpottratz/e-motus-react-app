import React, { Component } from 'react'
import { Modal, Button, Header, Icon, Form } from 'semantic-ui-react'


class ImageUploadModal extends Component {

	constructor() {
		super()

		this.state = {
			image: null
		}
	}

	// handles the change for the file input
	handleFileChange = (e) => {
		console.log(e.target.files[0])
		this.setState({
			image: e.target.files[0]
		})
	}

	// uploads profile image
	uploadImage = async (e) => {
		e.preventDefault()
		console.log('upload image called')
		console.log('image set in state:', this.state.image)

		// adds the image in the state to the FormData
		let data = new FormData()
		data.append('image', this.state.image)

		try {
			// makes api call to upload image


			// parses the json data


			// if upload was successful

				// closes the modal

		} catch (error) {
			console.log(error);
		}
		



	}

	render() {
		return (
			<Modal open={true} closeIcon>
			    <Header icon='archive' content='Archive Old Messages' />
			    <Modal.Content>
			        <Form>
			        	<Form.Input type="file"
			        				label="Profile Image:"
			        				name="image"
			        				onChange={this.handleFileChange} />
			        	<Button type="submit" color="blue" onClick={this.uploadImage}>
			        		Upload Image
			        	</Button>
			        </Form>
			    </Modal.Content>
			    <Modal.Actions>
			        <Button color='red'>
			        	<Icon name='remove' /> Cancel
			        </Button>
			       
			    </Modal.Actions>
            </Modal>
		)
	}	
}


export default ImageUploadModal







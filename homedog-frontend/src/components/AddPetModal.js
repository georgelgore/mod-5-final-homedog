import React from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import AddDog from './forms/AddDog'

class AddPetModal extends React.Component {
  state = { open: false }

  handleClick = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const { me } = this.props
    return(
      <Modal
        trigger={<Button
          className="ui basic blue button"
          size="tiny" onClick={this.handleClick}><Icon name="paw"/><Icon name="plus"/></Button>}
        open={this.state.open}
        closeIcon>
        <Modal.Header>Pet Info</Modal.Header>
        <Modal.Content>
          <AddDog handleClose={this.handleClose} me={me} />
        </Modal.Content>
        <Modal.Actions>
          </Modal.Actions>
      </Modal>
    )
  }
}

export default AddPetModal

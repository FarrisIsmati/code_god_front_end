import React, { Component }           from 'react'
import { Modal,
         DropdownButton,
         Button,
         MenuItem,
         FormControl,
         ControlLabel,
         Glyphicon,
         Tooltip,
         OverlayTrigger
       }                              from 'react-bootstrap'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/toolbar.css'

class Toolbar extends  Component {
    constructor(props) {
      super(props)
      const { toggleModalAdd, toggleModalCreate, toggleTopic, addTopic } = this.props

      this.addTopic = addTopic.bind(this)
      this.toggleTopic = toggleTopic.bind(this)
      this.toggleModalCreate = toggleModalCreate.bind(this)
      this.toggleModalAdd = toggleModalAdd.bind(this)
      this.createTopic = this.createTopic.bind(this)
    }

    createTopic(e) {
      e.preventDefault()
      this.addTopic(e.target[0].value, localStorage.userToken)
    }

    render(){
      const dropDownItems = this.props.user.activeUser ?
      this.props.user.topics.filter((topic)=>{
        return !topic.show
      }).map((topic,i) => {return (<MenuItem eventKey={String(i)} key={i} onClick={() => {this.toggleModalAdd(); this.toggleTopic(topic._id, localStorage.userToken, this.props.user)}}>{topic.name}</MenuItem>)}) :
      null

      const tooltip = (text)=>{
        return(
        	<Tooltip id="tooltip">
        		{text}
        	</Tooltip>
        )

      }
      return(
        <div>
          <Modal show={this.props.ui.modalAddShow}>
            <Modal.Header closeButton onClick={this.toggleModalAdd}>
              <Modal.Title>Add Topic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              { this.props.user.activeUser ?
                <DropdownButton
                  bsSize="large"
                  title="Topics"
                  id="dropdown-size-large"
                >
                  {dropDownItems}
                </DropdownButton> :
                null
              }
            </Modal.Body>
          </Modal>

          <Modal show={this.props.ui.modalCreateShow}>
            <Modal.Header closeButton onClick={this.toggleModalCreate}>
              <Modal.Title>Create Topic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e) => {this.createTopic(e); this.toggleModalCreate()}}>
                <ControlLabel>Working example with validation</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter text"
                  />
                <Button type="submit">Submit</Button>
              </form>
            </Modal.Body>
          </Modal>

        <div className="flex flex-column toolbar-container">
          <OverlayTrigger placement="left" overlay={tooltip('Add Topic')}>
            <Glyphicon onClick={this.toggleModalAdd} glyph="glyphicon glyphicon-plus" />
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={tooltip('Create Topic')}>
            <Glyphicon onClick={this.toggleModalCreate} glyph="glyphicon glyphicon-pencil" />
          </OverlayTrigger>
        </div>
      </div>
      )
    }
}

export default Toolbar

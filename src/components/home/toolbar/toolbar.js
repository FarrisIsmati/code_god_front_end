import React, { Component }           from 'react'
import { Modal,
         DropdownButton,
         Button,
         MenuItem,
         FormControl,
         ControlLabel
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
      }).map((topic,i) => {return (<MenuItem eventKey={String(i)} key={i} onClick={() => {this.toggleModalAdd(); this.toggleTopic(topic._id)}}>{topic.name}</MenuItem>)}) :
      null

      return(
        <div className="flex toolbar-container">
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

          <p onClick={this.toggleModalAdd}>Add</p>
          <p onClick={this.toggleModalCreate}>Create</p>
        </div>
      )
    }
}

export default Toolbar

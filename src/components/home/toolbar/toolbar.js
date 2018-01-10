import React, { Component }           from 'react'
import { Modal,
         DropdownButton,
         MenuItem
       }                              from 'react-bootstrap'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/toolbar.css'

class Toolbar extends  Component {
    constructor(props) {
      super(props)
      const { toggleModalAdd, toggleTopic } = this.props

      this.toggleTopic = toggleTopic.bind(this)
      this.toggleModalAdd = toggleModalAdd.bind(this)
    }

    componentDidUpdate(){
    }

    render(){
      const dropDownItems = this.props.user.activeUser ?
      this.props.user.topics.map((topic,i) => {return (<MenuItem eventKey={String(i)} key={i} onClick={() => {this.toggleModalAdd(); this.toggleTopic(i)}}>{topic.name}</MenuItem>)}) :
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

          <p onClick={this.toggleModalAdd}>Add</p>
          <p>Create</p>
        </div>
      )
    }
}

export default Toolbar

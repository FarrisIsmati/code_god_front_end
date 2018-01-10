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
      const { toggleModalAdd} = this.props

      this.toggleModalAdd = toggleModalAdd.bind(this)
    }

    componentDidUpdate(){
    }

    render(){
      // const dropDownItems = this.props.user.activeUser ?
      // this.props.user.user.domain.topic.map((topic,i) => {return (<MenuItem eventKey={String(i)} key={i} onClick={() => {this.toggleModalAdd(); this.toggleTopic(topic._id)}}>{topic.name}</MenuItem>)}) :
      // null

      return(
        <div className="flex toolbar-container">
          <Modal show={this.props.ui.modalAddShow}>
            <Modal.Header closeButton onClick={this.toggleModalAdd}>
              <Modal.Title>Add Topic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Hi</div>
            </Modal.Body>
          </Modal>

          <p onClick={this.toggleModalAdd}>Add</p>
          <p>Create</p>
        </div>
      )
    }
}

export default Toolbar

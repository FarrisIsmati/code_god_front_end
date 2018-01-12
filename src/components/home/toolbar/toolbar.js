import React, { Component }           from 'react'
import {
         Button,
         FormControl,
         Glyphicon,
         Tooltip,
         OverlayTrigger,
         ListGroup,
         ListGroupItem
       }                              from 'react-bootstrap'

import ModalForm                      from '../common/modal'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/toolbar.css'

class Toolbar extends  Component {
    constructor(props) {
      super(props)
      const { toggleModalAdd, toggleModalCreate, toggleTopic, addTopic, deleteTopic } = this.props

      this.deleteTopic = deleteTopic.bind(this)
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
      const tooltip = (text)=>{
        return(
          <Tooltip id="tooltip">
            {text}
          </Tooltip>
        )
      }

      const dropDownItems = this.props.user.activeUser ?
        this.props.user.topics.filter((topic)=>{
          return !topic.show
        }).map((topic,i) => {return (
          <div key={i} className="flex topic-list-holder">
            <ListGroupItem onClick={() => {this.toggleTopic(topic._id, localStorage.userToken, this.props.user)}}>{topic.name}</ListGroupItem>
            <OverlayTrigger placement="right" overlay={tooltip('Delete Topic')}>
              <Glyphicon onClick={() => {this.deleteTopic(topic._id, localStorage.userToken, this.props.user)}} className="flex flex-center trash-glyph" glyph="glyphicon glyphicon-trash" />
            </OverlayTrigger>
          </div>
        )}) : null

      return(
        <div>
          <ModalForm toggle={this.props.ui.modalAddShow} title={'Add Topic'} dispatch={this.toggleModalAdd} id={"modal-dropdown"} >
            { this.props.user.activeUser ?
                <ListGroup>
                  {dropDownItems}
              	</ListGroup> :
              null
            }
          </ModalForm>

          <ModalForm toggle={this.props.ui.modalCreateShow} title={'Create Topic'} dispatch={this.toggleModalCreate}>
            <form onSubmit={(e) => {this.createTopic(e); this.toggleModalCreate()}}>
              <FormControl
                type="text"
                placeholder="Enter text"
              />
              <Button bsSize="large" type="submit">Submit</Button>
            </form>
          </ModalForm>

          <div className="flex flex-column toolbar-container">
            <OverlayTrigger placement="left" overlay={tooltip('Add/Delete Topics')}>
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

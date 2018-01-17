//GENERAL
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

//COMPONENTS
import ModalForm                      from '../common/modal'

import '../../stylesheets/flex.css'
import '../../stylesheets/toolbar.css'

class Toolbar extends  Component {
    constructor(props) {
      super(props)

      this.state = {
        "showModalAdd": false,
        "showModalCreate": false
      }

      const { toggleTopic, addTopic, deleteTopic } = this.props

      this.toggleTopic = toggleTopic.bind(this)
      this.addTopic = addTopic.bind(this)
      this.deleteTopic = deleteTopic.bind(this)

      this.toggleModal = this.toggleModal.bind(this)
      this.createTopic = this.createTopic.bind(this)
    }

    toggleModal(modal) {
      this.setState({ [modal]: !this.state[modal] })
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

      const topicList = this.props.user.activeUser ?
        this.props.user.topics.filter((topic)=>{
          return !topic.show
        }).map((topic,i) => {
          return (
            <div key={i} className="flex topic-list-holder">
              <ListGroupItem onClick={() => {this.toggleTopic(topic._id, localStorage.userToken, this.props.user)}}>{topic.name}</ListGroupItem>
              <OverlayTrigger placement="right" overlay={tooltip('Delete Topic')}>
                <Glyphicon onClick={() => {this.deleteTopic(topic._id, localStorage.userToken, this.props.user)}} className="flex flex-center trash-glyph" glyph="glyphicon glyphicon-trash" />
              </OverlayTrigger>
            </div>
          )}) : null

      return(
        <div>
          <ModalForm toggle={this.state.showModalAdd} title={'Topics'} dispatch={()=>{this.toggleModal('showModalAdd')}} id={"modal-dropdown"} >
            {
              this.props.user.activeUser ?
                <ListGroup>
                  {topicList}
              	</ListGroup> :
              null
            }
          </ModalForm>

          <ModalForm toggle={this.state.showModalCreate} title={'Create Topic'} dispatch={()=>{this.toggleModal('showModalCreate')}}>
            <form onSubmit={(e) => {this.createTopic(e); this.toggleModal('showModalCreate')}}>
              <FormControl
                type="text"
                placeholder="Enter text"
              />
              <Button bsSize="large" type="submit">Submit</Button>
            </form>
          </ModalForm>

          <div className="flex flex-column toolbar-container">
            <OverlayTrigger placement="left" overlay={tooltip('Create Topic')}>
              <Glyphicon onClick={()=>{this.toggleModal('showModalCreate')}} glyph="glyphicon glyphicon-pencil" />
            </OverlayTrigger>
            <OverlayTrigger placement="left" overlay={tooltip('Add/Delete Topics')}>
              <Glyphicon onClick={()=>{this.toggleModal('showModalAdd')}} glyph="glyphicon glyphicon-menu-hamburger" />
            </OverlayTrigger>
          </div>
        </div>
      )
    }
}

export default Toolbar

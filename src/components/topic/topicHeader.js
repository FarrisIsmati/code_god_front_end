//GENERAL
import React, { Component }           from 'react'
import {
         Button,
         FormControl,
         Glyphicon,
       }                              from 'react-bootstrap'

//COMPONENTS
import ModalForm                      from '../common/modal.js'

import '../../stylesheets/flex.css'
import '../../stylesheets/topic.css'
import '../../stylesheets/modal.css'

class TopicHeader extends Component{
  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      edit: false
     }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitInputEdit = this.submitInputEdit.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleState = this.toggleState.bind(this)
    this.createSubtopic = this.createSubtopic.bind(this)
    this.backgroundColor = this.backgroundColor.bind(this)
  }

  toggleState() {
    this.setState({showModal:!this.state.showModal})
  }

  //Changes background color of the topic header based on its index pairity
  backgroundColor(){
    if (this.props.topicIndex % 2 === 0 || this.props.topicIndex === 0){
      return "#E7E7E7"
    } else {
      return "#F3F3F3"
    }
  }

  handleInputChange(e){
    this.setState({topicTitle: e.target.value})
  }

  createSubtopic(e){
    e.preventDefault()
    this.props.addSubtopic(e.target[0].value, this.props.topic._id, localStorage.userToken)
  }

  toggleEdit(){
    this.setState({
      edit: !this.state.edit
    })
  }

  submitInputEdit(e){
    e.preventDefault()
    this.toggleEdit()
    this.props.updateTopicName(this.props.topic._id, localStorage.userToken, this.state.topicTitle, this.props.state)
  }

  componentDidMount(){
    this.refs.topicTitle ?
    this.setState({
      topicTitle: this.refs.topicTitle.outerText
    }) :
    null
  }

  render(){
    return (
      <div>
        <ModalForm toggle={this.state.showModal} title={'Add Subtopic'} dispatch={()=>this.toggleState()}>
          <form onSubmit={(e) => {this.createSubtopic(e); this.toggleState()}}>
            <label >{this.props.topic.name}</label>
              <FormControl
                type="text"
                placeholder="Enter text"
              />
            <Button type="submit">Submit</Button>
          </form>
        </ModalForm>

        <div style={{backgroundColor: this.backgroundColor()}} className="flex flex-spacebetween topic-header-holder">
          {
            !this.state.edit ?
            <h2 ref="topicTitle" onDoubleClick={()=>{this.toggleEdit()}}>{this.props.topic.name}</h2>:
            <form onSubmit={(e)=>{this.submitInputEdit(e)}}>
              <input className="topic-input" type="text" name="topicInput" value={this.state.topicTitle} onChange={(e)=>{this.handleInputChange(e)}}/>
            </form>
          }
        </div>
      </div>
    )
  }
}

export default TopicHeader

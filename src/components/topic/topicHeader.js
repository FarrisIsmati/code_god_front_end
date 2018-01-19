//GENERAL
import React, { Component }           from 'react'
import {
         Button,
         FormControl,
         Glyphicon
       }                              from 'react-bootstrap'

//COMPONENTS
import ModalForm                      from '../common/modal.js'

import '../../stylesheets/flex.css'
import '../../stylesheets/topic.css'
import '../../stylesheets/modal.css'

class TopicHeader extends Component{
  constructor(props){
    super(props)
    this.state = { showModal: false }

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

  createSubtopic(e){
    e.preventDefault()
    this.props.addSubtopic(e.target[0].value, this.props.topic._id, localStorage.userToken)
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
          <h2>{this.props.topic.name}</h2>
          <div className="flex glyphicon-header-holder">
            <Glyphicon onClick={()=>this.toggleState()} glyph="glyphicon glyphicon-plus" />
            <Glyphicon onClick={()=>this.props.toggleTopic(this.props.topic._id, localStorage.userToken, this.props.state)} glyph="glyphicon glyphicon-minus" />
          </div>
        </div>
      </div>
    )
  }
}

export default TopicHeader

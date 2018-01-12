import React, {Component}              from 'react'
import { Panel }                       from 'react-bootstrap'

import {
         Glyphicon
       }                              from 'react-bootstrap'

import Quill                           from '../quill/quill.js'

import '../../../stylesheets/subtopic.css'
import '../../../stylesheets/flex.css'

class Subtopics extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const Subtopic = this.props.subtopics.map((subtopic, i)=>{
      return(
        <div className="subtopic-holder" key={i}>
          <Panel id="collapsible-panel-example-2">
            <Panel.Heading>
              <div className="flex flex-spacebetween subtopic-header">
                <Panel.Title toggle>
                  {subtopic.name}
                </Panel.Title>
                <Glyphicon onClick={() => this.props.deleteSubtopic(this.props.topicId, subtopic._id, localStorage.userToken, this.props.user)} className="flex flex-center trash-glyph" glyph="glyphicon glyphicon-trash" />
              </div>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
                <Quill topicIndex={this.props.topicIndex} subtopicIndex={i} topicId={this.props.topicId} updateQuill={this.props.updateQuill} ref="quill" data={this.props.user} subtopicText={subtopic.data} topicId={this.props.topicId} subtopicId={subtopic._id}/>
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </div>
      )
    })

    return(
      <div className="subtopics-holder">
        {Subtopic}
      </div>
    )
  }
}

export default Subtopics

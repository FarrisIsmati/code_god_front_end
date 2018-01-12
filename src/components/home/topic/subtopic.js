import React, {Component}              from 'react'
import { Panel }                       from 'react-bootstrap'

import { connect }                     from 'react-redux'

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
              <Panel.Title toggle>
                {subtopic.name}
              </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
                <Quill ref="quill" data={this.props.user} subtopicText={subtopic.data} topicId={this.props.topicId} subtopicId={subtopic._id}/>
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

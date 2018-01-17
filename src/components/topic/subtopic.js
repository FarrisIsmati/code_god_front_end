//GENERAL
import React                           from 'react'
import { Panel }                       from 'react-bootstrap'
import { Glyphicon }                   from 'react-bootstrap'

//COMPONENTS
import Quill                           from '../quill/quill.js'

import '../../stylesheets/subtopic.css'
import '../../stylesheets/flex.css'

const Subtopics = ({topicIndex, updateQuill, deleteSubtopic, subtopics, user, topicId}) => {
  const Subtopic = subtopics.map((subtopic, i) => {
    return(
      <div className="subtopic-holder" key={i}>
        <Panel id="collapsible-panel-example-2">
          <Panel.Heading>

            <div className="flex flex-spacebetween subtopic-header">
              <Panel.Title toggle>
                {subtopic.name}
              </Panel.Title>
              <Glyphicon
              onClick={() => deleteSubtopic(topicId, subtopic._id, localStorage.userToken, user)}
              className="flex flex-center trash-glyph" glyph="glyphicon glyphicon-trash" />
            </div>

          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>

              <Quill topicIndex={topicIndex} subtopicIndex={i} topicId={topicId} updateQuill={updateQuill} data={user} subtopicText={subtopic.data} subtopicId={subtopic._id}/>

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

export default Subtopics

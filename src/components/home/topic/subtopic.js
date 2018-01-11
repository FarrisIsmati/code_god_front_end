import React              from 'react'
import Quill              from '../quill/quill.js'

import '../../../stylesheets/subtopic.css'

const Subtopics = ({subtopics}) => {
  const Subtopic = subtopics.map((subtopic, i)=>{
    return(
      <div key={i}>
        <h3>{subtopic.name}</h3>
        <div className="quill-holder">
          <Quill />
        </div>
      </div>
    )
  })
  return(
    <div>
      {Subtopic}
    </div>
  )
}

export default Subtopics

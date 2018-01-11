import React              from 'react'

const Subtopics = ({subtopics}) => {
  const Subtopic = subtopics.map((subtopic, i)=>{
    return(
      <div key={i}>
        <h3>{subtopic.name}</h3>
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

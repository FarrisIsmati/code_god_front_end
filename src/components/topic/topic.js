//GENERAL
import React              from 'react'

//COMPONENTS
import Subtopic          from './subtopic.js'
import TopicHeader        from './topicHeader.js'

import '../../stylesheets/flex.css'
import '../../stylesheets/topic.css'

const Topic = ({updateQuill, updateSubtopicName, updateTopicName, deleteSubtopic, addSubtopic, toggleTopic, topic, state, topicIndex}) => {
  //Change background color of topic based on its index pairity
  const backgroundColor=()=>{
    if (topicIndex % 2 === 0 || topicIndex === 0){
      return "#AFAFAF"
    } else {
      return "#C1C1C1"
    }
  }

  const Subtopics = topic.subtopics.map((subtopic, i) => {
    return(
      <Subtopic
        updateSubtopicName = {updateSubtopicName}
        topic={topic}
        topicId={topic._id}
        topicIndex={topicIndex}
        user={state}
        index={i}
        updateQuill={updateQuill}
        deleteSubtopic={deleteSubtopic}
        subtopic={subtopic}
        subtopicId={subtopic._id}
        key={i}
      />
    )
  })

  return(
    <div className="topic-holder" style={{backgroundColor: backgroundColor()}}>
      <TopicHeader
        updateTopicName={updateTopicName}
        addSubtopic={addSubtopic}
        toggleTopic={toggleTopic}
        topic={topic}
        state={state}
        topicIndex={topicIndex}
      />

      <div className="subtopics-holder">
        {Subtopics}
      </div>
    </div>
  )
}

// <Subtopics
//   topicIndex={topicIndex}
//   updateQuill={updateQuill}
//   deleteSubtopic={deleteSubtopic}
//   subtopics={topic.subtopics}
//   user={state}
//   topicId={topic._id}
// />

export default Topic

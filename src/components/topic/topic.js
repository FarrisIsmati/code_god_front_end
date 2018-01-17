//GENERAL
import React              from 'react'

//COMPONENTS
import Subtopics          from './subtopic.js'
import TopicHeader        from './topicHeader.js'

import '../../stylesheets/flex.css'
import '../../stylesheets/topic.css'

const Topic = ({updateQuill, deleteSubtopic, addSubtopic, toggleTopic, topic, state, topicIndex}) => {
  //Change background color of topic based on its index pairity
  const backgroundColor=()=>{
    if (topicIndex % 2 === 0 || topicIndex === 0){
      return "#AFAFAF"
    } else {
      return "#C1C1C1"
    }
  }

  return(
    <div className="topic-holder" style={{backgroundColor: backgroundColor()}}>
      <TopicHeader
        addSubtopic={addSubtopic}
        toggleTopic={toggleTopic}
        topic={topic}
        state={state}
        topicIndex={topicIndex}
      />
      <Subtopics
        topicIndex={topicIndex}
        updateQuill={updateQuill}
        deleteSubtopic={deleteSubtopic}
        subtopics={topic.subtopics}
        user={state}
        topicId={topic._id}
      />
    </div>
  )
}

export default Topic

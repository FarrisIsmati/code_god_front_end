import React              from 'react'

import {
        toggleTopic,
        addSubtopic,
        updateQuill,
        deleteSubtopic
       }                  from "../../../redux/actions/userActions"
import {
        toggleModalCreateSubtopic
       }                  from "../../../redux/actions/uiActions"

import { connect }        from 'react-redux'

import subtopics          from './subtopic.js'
import topicHeader        from './topicHeader.js'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/topic.css'

const Topic = ({topic, state, topicIndex}) => {
  const backgroundColor=()=>{
    if (topicIndex % 2 === 0 || topicIndex === 0){
      return "#AFAFAF"
    } else {
      return "#C1C1C1"
    }
  }
  return(
    <div className="topic-holder" style={{backgroundColor: backgroundColor()}}>
      <TopicHeader topic={topic} state={state} pairity={topicIndex}/>
      <Subtopics topicIndex={topicIndex} subtopics={topic.subtopics} topicId={topic._id}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.userData,
  ui: state.uiState
})

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTopic: (id, token, state)=>{
      dispatch(toggleTopic(id, token, state))
    },
    toggleModalCreateSubtopic: ()=>{
      dispatch(toggleModalCreateSubtopic())
    },
    addSubtopic: (name, id, token) => {
      dispatch(addSubtopic(name, id, token))
    },
    updateQuill: (topicId, subtopicId, data, state) => {
      dispatch(updateQuill(topicId, subtopicId, data, state))
    },
    deleteSubtopic: (topicId, subtopicId, token, state) => {
      dispatch(deleteSubtopic(topicId, subtopicId, token, state))
    }
  }
}

const TopicHeader = connect(mapStateToProps, mapDispatchToProps)(topicHeader)
const Subtopics = connect(mapStateToProps, mapDispatchToProps)(subtopics)

export default Topic

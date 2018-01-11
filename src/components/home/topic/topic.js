import React              from 'react'

import {
        toggleTopic,
        addSubtopic
       }                  from "../../../redux/actions/userActions"
import {
        toggleModalCreateSubtopic
       }                  from "../../../redux/actions/uiActions"

import { connect }        from 'react-redux'

import subtopics          from './subtopic.js'
import topicHeader        from './topicHeader.js'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/topic.css'

//https://quilljs.com/
//https://github.com/fritz-c/react-sortable-tree/tree/master/src
const Topic = ({topic, state, pairity}) => {
  const backgroundColor=()=>{
    if (pairity % 2 === 0 || pairity === 0){
      return "#AFAFAF"
    } else {
      return "#C1C1C1"
    }
  }
  return(
    <div className="topic-holder" style={{backgroundColor: backgroundColor()}}>
      <TopicHeader topic={topic} state={state} pairity={pairity}/>
      <Subtopics subtopics={topic.subtopics}/>
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
    }
  }
}

const TopicHeader = connect(mapStateToProps, mapDispatchToProps)(topicHeader)
const Subtopics = connect(mapStateToProps)(subtopics)

export default Topic

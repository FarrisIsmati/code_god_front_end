import React              from 'react'

import { toggleTopic }    from "../../../redux/actions/userActions"

import { connect }        from 'react-redux'

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
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.userData
})

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTopic: (id, token, state)=>{
      dispatch(toggleTopic(id, token, state))
    }
  }
}

const TopicHeader = connect(mapStateToProps, mapDispatchToProps)(topicHeader)

export default Topic

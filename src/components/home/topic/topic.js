import React              from 'react'

import { toggleTopic }    from "../../../redux/actions/userActions"

import { connect }        from 'react-redux'

import topicHeader        from './topicHeader.js'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/topic.css'

const Topic = ({topic, pairity}) => {
  const backgroundColor=()=>{
    if (pairity % 2 === 0 || pairity === 0){
      return "#AFAFAF"
    } else {
      return "#C1C1C1"
    }
  }
  return(
    <div style={{backgroundColor: backgroundColor()}}>
      <TopicHeader topic={topic} pairity={pairity}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.userData
})

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTopic: (index)=>{
      dispatch(toggleTopic(index))
    }
  }
}

const TopicHeader = connect(mapStateToProps, mapDispatchToProps)(topicHeader)

export default Topic

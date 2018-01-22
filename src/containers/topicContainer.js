//GENERAL
import React, {Component}         from 'react'
import { connect }                from 'react-redux'

//REDUX
import {
         toggleTopic,
         addTopic,
         deleteTopic,
         updateTopicName,
         addSubtopic,
         deleteSubtopic,
         updateQuill,

       }                          from "../redux/actions/userActions"

//COMPONENT
import topic                      from '../components/topic/topic.js'
import toolbar                    from '../components/toolbar/toolbar.js'

class TopicContainer extends Component{
  constructor(props){
    super(props)

    this.updateGridColumns = this.updateGridColumns.bind(this)
  }

  //Updates style to accomodate for the proper number of columns
  updateGridColumns() {
    let percentage
    const length = this.props.user.activeUser ?
    this.props.user.topics.filter((topic)=>{
      return topic.show
    }).length : 0

    100/length > 100 ?
     percentage = '0%' : percentage = String(100/length) + '% '

    let grids = (percentage).repeat(length)

    return {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: grids
    }
  }

  componentDidUpdate() {
    this.updateGridColumns()
  }

  render(){
    const topics = this.props.user.activeUser ? this.props.user.topics.filter((topic)=>{
      return topic.show
    }).map((topic, i)=>{
      return(
        <Topic topic={topic} state={this.props.user} key={i} topicIndex={i}/>
      )
    }) : null

    return(
      <div className="flex topics-holder">
        <Toolbar />
        <div style={this.updateGridColumns()}>
          { topics ? topics : null }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userData,
  ui: state.uiState
})

const mapDispatchToProps = (dispatch) => {
  return {
    addTopic: (name, token)=>{
      dispatch(addTopic(name, token))
    },
    deleteTopic: (id, token, state)=>{
      dispatch(deleteTopic(id, token, state))
    },
    toggleTopic: (id, token, state)=>{
      dispatch(toggleTopic(id, token, state))
    },
    updateTopicName: (id, token, data, state)=>{
      dispatch(updateTopicName(id, token, data, state))
    },
    addSubtopic: (name, id, token) => {
      dispatch(addSubtopic(name, id, token))
    },
    deleteSubtopic: (topicId, subtopicId, token, state) => {
      dispatch(deleteSubtopic(topicId, subtopicId, token, state))
    },
    updateQuill: (topicId, subtopicId, data, state) => {
      dispatch(updateQuill(topicId, subtopicId, data, state))
    }
  }
}

  const Toolbar = connect(mapStateToProps, mapDispatchToProps)(toolbar)
const Topic = connect(mapStateToProps, mapDispatchToProps)(topic)

export default connect(mapStateToProps)(TopicContainer)

//GENERAL
import React, { Component }   from 'react'

//COMPONENTS
import Subtopic               from './subtopic.js'
import TopicHeader            from './topicHeader.js'

import '../../stylesheets/flex.css'
import '../../stylesheets/topic.css'

class Topic extends Component {
  constructor(props){
    super(props)
    this.state = {}

    this.setSubtopicHeight = this.setSubtopicHeight.bind(this)
    this.backgroundColor = this.backgroundColor.bind(this)
  }

  backgroundColor() {
    if (this.props.topicIndex % 2 === 0 || this.props.topicIndex === 0){
      return "#AFAFAF"
    } else {
      return "#C1C1C1"
    }
  }

  setSubtopicHeight() {
    let topicHeight = this.refs.topicHolder.offsetHeight
    let topicHeaderHeight = this.refs.topicHolder.childNodes[0].offsetHeight
    let subtopicsHeight = topicHeight - topicHeaderHeight
    this.setState({subtopicsHeight: subtopicsHeight})
  }

  componentDidMount() {
    this.setSubtopicHeight()
    window.addEventListener("resize", this.setSubtopicHeight)
  }

  render() {
    const Subtopics = this.props.topic.subtopics.map((subtopic, i) => {
      return(
        <Subtopic
          key={i}
          subtopicIndex={i}
          subtopic={subtopic}
          updateSubtopicName={this.props.updateSubtopicName}
          topicIndex={this.props.topicIndex}
          updateQuill={this.props.updateQuill}
          deleteSubtopic={this.props.deleteSubtopic}
          subtopics={this.props.topic.subtopics}
          user={this.props.state}
          topicId={this.props.topic._id}
        />
      )
    })

    return(
      <div ref="topicHolder" className="topic-holder" style={{backgroundColor: this.backgroundColor()}}>
        <TopicHeader
          updateTopicName={this.props.updateTopicName}
          addSubtopic={this.props.addSubtopic}
          toggleTopic={this.props.toggleTopic}
          topic={this.props.topic}
          state={this.props.state}
          topicIndex={this.props.topicIndex}
        />
      {
        this.state.subtopicsHeight ?
        <div ref="subtopicsHolder" style={{height: this.state.subtopicsHeight + 'px'}} className="subtopics-holder">
          {Subtopics}
        </div>:
        <div ref="subtopicsHolder" className="subtopics-holder">
          {Subtopics}
        </div>
      }

    </div>
    )
  }
}

export default Topic

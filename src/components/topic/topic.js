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
    this.backgroundColor = this.backgroundColor.bind(this)
  }

  backgroundColor() {
    if (this.props.topicIndex % 2 === 0 || this.props.topicIndex === 0){
      return "#AFAFAF"
    } else {
      return "#C1C1C1"
    }
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
      <div className="topic-holder" style={{backgroundColor: this.backgroundColor()}}>
        <TopicHeader
          updateTopicName={this.props.updateTopicName}
          addSubtopic={this.props.addSubtopic}
          toggleTopic={this.props.toggleTopic}
          topic={this.props.topic}
          state={this.props.state}
          topicIndex={this.props.topicIndex}
        />
      <div className="subtopics-holder">
          {Subtopics}
        </div>
      </div>
    )
  }
}

export default Topic

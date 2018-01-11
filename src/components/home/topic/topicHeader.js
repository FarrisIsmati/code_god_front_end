import React              from 'react'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/topic.css'

  const TopicHeader = ({topic, toggleTopic}) => {
    return (
    <div className="flex">
      <p>{topic.name}</p>
      <p onClick={()=>toggleTopic(topic._id)}>X</p>
    </div>
  )
  }

export default TopicHeader

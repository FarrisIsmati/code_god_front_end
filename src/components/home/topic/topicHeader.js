import React              from 'react'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/topic.css'

  const TopicHeader = ({topic, state, toggleTopic}) => {
    return (
      <div className="flex">
        <p>{topic.name}</p>
        <p onClick={()=>toggleTopic(topic._id, localStorage.userToken, state)}>X</p>
      </div>
    )
  }

export default TopicHeader

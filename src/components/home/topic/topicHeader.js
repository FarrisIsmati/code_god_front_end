import React              from 'react'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/topic.css'

  const TopicHeader = ({topic, state, toggleTopic, pairity}) => {
    const backgroundColor=()=>{
      if (pairity % 2 === 0 || pairity === 0){
        return "#E7E7E7"
      } else {
        return "#F3F3F3"
      }
    }

    return (
      <div style={{backgroundColor: backgroundColor()}} className="flex flex-spacebetween topic-header-holder">
        <h2>{topic.name}</h2>
        <h2 onClick={()=>toggleTopic(topic._id, localStorage.userToken, state)}>X</h2>
      </div>
    )
  }

export default TopicHeader

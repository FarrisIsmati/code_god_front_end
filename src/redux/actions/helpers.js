import update from 'immutability-helper'

export function modifyTopic(state, id){
  //Toggles topics state to show on or off
  let topicShowState
  const index = state.topics.findIndex((topic)=>{
    return topic._id === id
  })
  //If topic is off remove topic from array and add it to end of the list of topics
  if (!state.topics[index].show){
    const tempTopic = Object.assign({}, state.topics[index])
    tempTopic.show = true
    const spliced = update(state,
      {topics:
        { $splice: [[index, 1]] }
      }
    )
    topicShowState = update(spliced,
      {topics:
        { $push: [tempTopic]}
      })
  } else {
    topicShowState = update(state,
      {topics:
        {[index]:
          { show: (val)=>{return val?false:true} }
        }
      }
    )
  }
  return topicShowState
}

export function deleteTopicState(state, id){
  const index = state.topics.findIndex((topic)=>{
    return topic._id === id
  })

  const splicedTopic = update(state,
    {topics:
      { $splice: [[index, 1]] }
    }
  )

  return splicedTopic
}

export function updateSubtopic(topicId, subtopicId, dataText, state){
  const indexTopic = state.topics.findIndex((topic)=>{
    return topic._id === topicId
  })

  const indexSubtopic = state.topics[indexTopic].subtopics.findIndex((subtopic)=>{
    return subtopic._id === subtopicId
  })

  const updatedSubtopic = update(state,
    { topics:
      { [indexTopic]:
        { subtopics:
          { [indexSubtopic]:
            { data:
              { $set: dataText }
            }
          }
        }
      }
    }
  )
  return updatedSubtopic
}

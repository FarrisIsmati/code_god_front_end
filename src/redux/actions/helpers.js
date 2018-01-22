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

//Copy of state with an updated a topic name
export function updatedTopicName(id, data, state){
  const index = state.topics.findIndex((topic)=>{
    return topic._id === id
  })

  const updatedTopicNameState = update(state,
    {topics:
      { [index]:
        { name: {
          $set: data
          }
        }
      }
    }
  )

  return { state: updatedTopicNameState, topic: updatedTopicNameState.topics[index] }
}

export function updatedSubtopicName(topicId, subtopicId, token, data, state){
  const indexTopic = state.topics.findIndex((topic)=>{
    return topic._id === topicId
  })

  const indexSubtopic = state.topics[indexTopic].subtopics.findIndex((subtopic)=>{
    return subtopic._id === subtopicId
  })

  const updatedSubtopicNameState = update(state,
    { topics:
      { [indexTopic]:
        { subtopics:
          { [indexSubtopic]:
            { name:
              { $set: data }
            }
          }
        }
      }
    }
  )

  return updatedSubtopicNameState
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

export function deletedSubtopic(topicId, subtopicId, state){
  const indexTopic = state.topics.findIndex((topic)=>{
    return topic._id === topicId
  })

  const indexSubtopic = state.topics[indexTopic].subtopics.findIndex((subtopic)=>{
    return subtopic._id === subtopicId
  })

  const deletedSubtopic = update(state,
    { topics:
      { [indexTopic]:
        { subtopics:
          { $splice: [[indexSubtopic,1]] }
        }
      }
    }
  )
  return deletedSubtopic
}

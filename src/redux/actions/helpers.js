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

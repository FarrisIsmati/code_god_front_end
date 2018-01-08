import { GET_TOPICS } from "../constants/constants"

const DEFAULT_STATE = {
  topics: [ 'react' ]
}

function topicsApp(state = [], action) {
  switch (action.type) {
    case GET_TOPICS:
      return [...state, action.payload]
    default:
      return state
  }
}

export default function codegodApp(state = DEFAULT_STATE, action) {
  return {
    topics: topicsApp(state.topics, action)
  }
}

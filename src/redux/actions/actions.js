import {
  GET_TOPICS
} from "../constants/constants"

export function getTopics(topics) {
  return {
    type: GET_TOPICS,
    payload: {
      topics
    }
  }
}

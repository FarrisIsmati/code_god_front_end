import update                 from 'immutability-helper'

import {
        REQUEST_USER,
        RECEIVE_USER,
        LOGOUT_USER,
        TOGGLE_TOPIC,
        ADD_SUBTOPIC,
        ADD_TOPIC,
        INVALIDATE_USER,
        DELETE_TOPIC,
        UPDATE_QUILL,
        DELETE_SUBTOPIC,
        UPDATE_TOPIC_NAME,
        UPDATE_SUBTOPIC_NAME
}                            from "../constants/constants"

const default_state = {
  activeUser: false
}

function user(
  state = {
    isFetching: false,
  },
  action
) {
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        activeUser: true,
        username: action.payload.user.username,
        googleId: action.payload.user.googleId,
        lastUpdated: action.payload.receivedAt,
        topics: action.payload.user.domain.topics
      })
    case INVALIDATE_USER:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

export function dataReducer(state = default_state, action) {
  switch (action.type) {
    case UPDATE_QUILL:
      return {
        ...state, ...action.updatedSubtopic
      }
    case ADD_TOPIC:
      const newTopicData = update(state,
        {topics:
          {$push: [action.data]}
        }
      )
      return {
        ...state, ...newTopicData
      }
    case UPDATE_TOPIC_NAME:
      return {
        ...state, ...action.updatedState
      }
    case UPDATE_SUBTOPIC_NAME:
      return {
        ...state, ...action.updatedState
      }
    case DELETE_SUBTOPIC:
      return {
        ...state, ...action.deletedSubtopicState
      }
    case ADD_SUBTOPIC:
      console.log(action.data.topics)
      const newSubtopicData = update(state,
        {topics:
          {$set: action.data.topics}
        }
      )
      return {
        ...state, ...newSubtopicData
      }
    case DELETE_TOPIC:
      return {
        ...state, ...action.deletedTopicState
      }
    case TOGGLE_TOPIC:
      return {
        ...state, ...action.topicShowState
      }
    case RECEIVE_USER:
    case REQUEST_USER:
      return {
        ...state, ...user(state[action.userId], action)
      }
    case INVALIDATE_USER:
    case LOGOUT_USER:
      return {
        ...action.payload
      }
    default:
      return state
  }
}

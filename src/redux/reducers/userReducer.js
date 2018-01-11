import update                 from 'immutability-helper';
import {
  REQUEST_USER,
  RECEIVE_USER,
  LOGOUT_USER,
  TOGGLE_TOPIC,
  ADD_TOPIC
}                             from "../constants/constants"

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
    default:
      return state
  }
}

export function userReducer(state = default_state, action) {
  switch (action.type) {
    case ADD_TOPIC:
      const newTopicData = update(state,
        {topics:
          {$push: [action.data]}
        }
      )
      return {
        ...state, ...newTopicData
      }
    case TOGGLE_TOPIC:
      const topicShowState = update(state,
        {topics:
          {[action.payload.index]:
            { show: (val)=>{return val?false:true} }
          }
        }
      )
      return {
        ...state, ...topicShowState
      }
    case RECEIVE_USER:
    case REQUEST_USER:
      return {
        ...state, ...user(state[action.userId], action)
      }
    case LOGOUT_USER:
      return {
        ...action.payload
      }
    default:
      return state
  }
}

import {
  REQUEST_USER,
  RECEIVE_USER,
  LOGOUT_USER
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
        lastUpdated: action.payload.receivedAt
      })
    default:
      return state
  }
}

export function userReducer(state = default_state, action) {
  switch (action.type) {
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

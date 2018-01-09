import {
  REQUEST_USER,
  RECEIVE_USER,
  INVALIDATE_USER,
  LOGOUT_USER
}                             from "../constants/constants"

const default_state = {
  activeUser: false
}

function user(
  state = {
    isFetching: false,
    didInvalidate: false,
    user: {}
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_USER:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        activeUser: true,
        user: action.payload.user,
        lastUpdated: action.payload.receivedAt
      })
    default:
      return state
  }
}

export function userReducer(state = default_state, action) {
  switch (action.type) {
    case INVALIDATE_USER:
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

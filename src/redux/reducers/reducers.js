import { combineReducers }    from 'redux'
import {
  REQUEST_USER,
  RECEIVE_USER,
  INVALIDATE_USER
}                             from "../constants/constants"

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
        user: action.payload.user,
        lastUpdated: action.payload.receivedAt
      })
    default:
      return state
  }
}

function getUser(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_USER:
    case RECEIVE_USER:
    case REQUEST_USER:
      return {
        ...state, ...user(state[action.userId], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  userData: getUser
})

export default rootReducer

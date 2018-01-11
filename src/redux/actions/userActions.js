import fetch               from 'cross-fetch'
import axios               from 'axios'
import {
  REQUEST_USER,
  RECEIVE_USER,
  LOGOUT_USER,
  TOGGLE_TOPIC,
  ADD_TOPIC
}                          from "../constants/constants"

function addTopicState(json) {
  return {
    type: ADD_TOPIC,
    data: json.data.domain.topics[json.data.domain.topics.length - 1]
  }
}

export function addTopic(name, token) {
  return function(dispatch){
    axios.post('http://localhost:3001/data/user/topic/' + token,{
      "name": name
    })
    .then((json)=>{
      dispatch(addTopicState(json))
    })
  }
}

export function toggleTopic(id) {
  return {
    type: TOGGLE_TOPIC,
    id
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: {
      activeUser: false,
      googleId: '',
      username: '',
      loggedOutAt: Date.now(),
      isFetching: false
    }
  }
}

function requestUser(token) {
  return {
    type: REQUEST_USER,
    token
  }
}

function receiveUser(json, normalize) {
  return {
    type: RECEIVE_USER,
    payload: {
      activeUser: true,
      user: json,
      receivedAt: Date.now()
    }
  }
}

function fetchUserData(token) {
  return function (dispatch) {
    dispatch(requestUser(token))
    return fetch(`http://localhost:3001/data/user/` + token)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveUser(json))
      )
  }
}

function shouldFetchUserData(state) {
  const user = state.userData.activeUser
  if (!user) {
    return true
  } else if (user.isFetching) {
    return false
  } else {
    return user.didInvalidate
  }
}

export function fetchUserDataIfNeeded(token) {
  return (dispatch, getState) => {
    if (shouldFetchUserData(getState())) {
      return dispatch(fetchUserData(token))
    } else {
      return Promise.resolve()
    }
  }
}

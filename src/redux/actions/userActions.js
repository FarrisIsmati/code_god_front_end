import fetch               from 'cross-fetch'
import axios               from 'axios'

import {
  REQUEST_USER,
  RECEIVE_USER,
  LOGOUT_USER,
  TOGGLE_TOPIC,
  ADD_SUBTOPIC,
  ADD_TOPIC,
  DELETE_TOPIC,
  UPDATE_QUILL,
  DELETE_SUBTOPIC
}                          from "../constants/constants"
import { modifyTopic,
         deleteTopicState,
         updateSubtopic,
         deletedSubtopic
       }                   from './helpers.js'

//Update Quill State
export function updateQuill(topicId, subtopicId, data, state){
  const updatedSubtopic = updateSubtopic(topicId, subtopicId, data, state)
  return {
    type: UPDATE_QUILL,
    updatedSubtopic
  }
}

//Creating a new Topic
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

function deleteSubtopicState(topicId, subtopicId, token, state) {
  const deletedSubtopicState = deletedSubtopic(topicId, subtopicId, state)
  return {
    type: DELETE_SUBTOPIC,
    deletedSubtopicState
  }
}

export function deleteSubtopic(topicId, subtopicId, token, state) {
  return function(dispatch){
    axios.delete('http://localhost:3001/data/user/topic/' + topicId + '/' + subtopicId + '/' + token)
    .then(()=>{
      dispatch(deleteSubtopicState(topicId, subtopicId, token, state))
    })
  }
}

//Creating a new subtopic
function addSubtopicState(user) {
  return {
    type: ADD_SUBTOPIC,
    data: user.data.domain
  }
}

export function addSubtopic(name, id, token) {
  return function(dispatch){
    axios.post('http://localhost:3001/data/user/topic/' + id + '/' + token,{
      "name": name
    })
    .then(()=>{
      axios.get('http://localhost:3001/data/user/' + token)
      .then((user)=>{
        dispatch(addSubtopicState(user))
      })
    })
  }
}

//Deleting a topic
function deletingTopicState(deletedTopicState) {
  return {
    type: DELETE_TOPIC,
    deletedTopicState
  }
}

export function deleteTopic(id, token, state) {
  return function(dispatch){
    const deletedTopicState = deleteTopicState(state, id)
    axios.delete('http://localhost:3001/data/user/topic/' + id + '/' + token)
    .then(()=>{
      dispatch(deletingTopicState(deletedTopicState))
    })
  }
}

//Toggling topic show on or off
function toggleTopicState(topicShowState) {
  return {
    type: TOGGLE_TOPIC,
    topicShowState
  }
}

export function toggleTopic(id, token, state) {
  return function(dispatch){
    const topicShowState = modifyTopic(state, id)
    axios.put('http://localhost:3001/data/user/topics/' + token, topicShowState.topics)
    .then(()=>{
      dispatch(toggleTopicState(topicShowState))
    })
  }
}

//User logout
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

//User data request/retrival
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

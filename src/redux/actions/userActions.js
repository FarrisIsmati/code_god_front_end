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
  DELETE_SUBTOPIC,
  INVALIDATE_USER,
  UPDATE_TOPIC_NAME,
  UPDATE_SUBTOPIC_NAME
}                          from "../constants/constants"
import {
  modifyTopic,
  deleteTopicState,
  updateSubtopic,
  deletedSubtopic,
  updatedTopicName,
  updatedSubtopicName
}                          from './helpers.js'

//--QUILL ACTIONS--

//Update Quill State
export function updateQuill(topicId, subtopicId, data, state){
  const updatedSubtopic = updateSubtopic(topicId, subtopicId, data, state)
  return {
    type: UPDATE_QUILL,
    updatedSubtopic
  }
}

//---TOPIC ACTIONS---

//Creating a new Topic
function addTopicState(json) {
  return {
    type: ADD_TOPIC,
    data: json.data.domain.topics[json.data.domain.topics.length - 1]
  }
}

export function addTopic(name, token) {
  return function(dispatch){
    axios.post('https://studyjs-ga.herokuapp.com/data/user/topic/' + token,{
      "name": name
    })
    .then((json)=>{
      dispatch(addTopicState(json))
    })
  }
}

//Delete a topic
function deletingTopicState(deletedTopicState) {
  return {
    type: DELETE_TOPIC,
    deletedTopicState
  }
}

export function deleteTopic(id, token, state) {
  return function(dispatch){
    const deletedTopicState = deleteTopicState(state, id)
    axios.delete('https://studyjs-ga.herokuapp.com/data/user/topic/' + id + '/' + token)
    .then(()=>{
      dispatch(deletingTopicState(deletedTopicState))
    })
  }
}

//Update topic name
function updateTopicNameState(state) {
  return {
    type: UPDATE_TOPIC_NAME,
    updatedState: state
  }
}

export function updateTopicName(id, token, data, state) {
  return function(dispatch){
    const updatedTopicNameState = updatedTopicName(id, data, state)
    axios.put('https://studyjs-ga.herokuapp.com/data/user/topic/' + id + '/' + token, updatedTopicNameState.topic)
    .then(()=>{
      dispatch(updateTopicNameState(updatedTopicNameState.state))
    })
  }
}

//Toggle topic show on or off
function toggleTopicState(topicShowState) {
  return {
    type: TOGGLE_TOPIC,
    topicShowState
  }
}

export function toggleTopic(id, token, state) {
  return function(dispatch){
    const topicShowState = modifyTopic(state, id)
    axios.put('https://studyjs-ga.herokuapp.com/data/user/topics/' + token, topicShowState.topics)
    .then(()=>{
      dispatch(toggleTopicState(topicShowState))
    })
  }
}

//---SUBTOPIC ACTIONS---

//Create a new subtopic
function addSubtopicState(user) {
  return {
    type: ADD_SUBTOPIC,
    data: user.data.user.domain
  }
}

export function addSubtopic(name, id, token) {
  console.log(id)
  return function(dispatch){
    axios.post('https://studyjs-ga.herokuapp.com/data/user/topic/' + id + '/' + token,{
      "name": name
    })
    .then(()=>{
      axios.get('https://studyjs-ga.herokuapp.com/data/user/' + token)
      .then((user)=>{
        dispatch(addSubtopicState(user))
      })
    })
  }
}

//Delete a subtopic
function deleteSubtopicState(topicId, subtopicId, token, state) {
  const deletedSubtopicState = deletedSubtopic(topicId, subtopicId, state)
  return {
    type: DELETE_SUBTOPIC,
    deletedSubtopicState
  }
}

export function deleteSubtopic(topicId, subtopicId, token, state) {
  return function(dispatch){
    axios.delete('https://studyjs-ga.herokuapp.com/data/user/topic/' + topicId + '/' + subtopicId + '/' + token)
    .then(()=>{
      dispatch(deleteSubtopicState(topicId, subtopicId, token, state))
    })
  }
}

//Update subtopic name
function updateSubtopicNameState(state) {
  return {
    type: UPDATE_SUBTOPIC_NAME,
    updatedState: state
  }
}

export function updateSubtopicName(topicId, subtopicId, token, data, state) {
  return function(dispatch){
    const updatedSubtopicNameState = updatedSubtopicName(topicId, subtopicId, token, data, state)
    axios.put('https://studyjs-ga.herokuapp.com/data/user/topic/' + topicId + '/' + subtopicId + '/' + token, {text: data, value: 'name'})
    .then(()=>{
      dispatch(updateSubtopicNameState(updatedSubtopicNameState))
    })
  }
}

//---USER ACTIONS---

//Log user out
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

//Request/Retrieve user data
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
      user: json.user,
      receivedAt: Date.now()
    }
  }
}

function invalidateUser() {
   return {
     type: INVALIDATE_USER
   }
 }

function fetchUserData(token) {
  return function (dispatch) {
    dispatch(requestUser(token))
    return fetch(`https://studyjs-ga.herokuapp.com/data/user/` + token)
      .then(
        response => {
          dispatch(invalidateUser())
          return response.json()
        }
      )
      .then(json => dispatch(receiveUser(json)))
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

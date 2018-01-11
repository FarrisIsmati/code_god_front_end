import fetch               from 'cross-fetch'
import axios               from 'axios'
import update              from 'immutability-helper'
import {
  REQUEST_USER,
  RECEIVE_USER,
  LOGOUT_USER,
  TOGGLE_TOPIC,
  ADD_TOPIC
}                          from "../constants/constants"

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

//Toggling topic show on or off
function toggleTopicState(topicShowState) {
  return {
    type: TOGGLE_TOPIC,
    topicShowState
  }
}

export function toggleTopic(id, token, state) {
  return function(dispatch){
    //Toggles topics state to show on or off
    let topicShowState
    const index = state.topics.findIndex((topic)=>{
      return topic._id == id
    })
    //If topic is off remove topic from array and add it to end of the list of topics
    if (!state.topics[index].show){
      let tempTopic = Object.assign({}, state.topics[index])
      tempTopic.show = true
      const spliced = update(state,
        {topics:
          { $splice: [[index, 1]] }
        }
      )
      topicShowState = update(spliced,
        {topics:
          { $push: [tempTopic]}
        })
    } else {
      topicShowState = update(state,
        {topics:
          {[index]:
            { show: (val)=>{return val?false:true} }
          }
        }
      )
    }
    console.log(topicShowState.topics)
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

import React              from 'react'
import {
         Button,
         FormControl,
         ControlLabel,
         Glyphicon
       }                              from 'react-bootstrap'

import ModalForm          from '../common/modal.js'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/topic.css'

  const TopicHeader = ({topic, state, ui, toggleTopic, toggleModalCreateSubtopic, addSubtopic, pairity}) => {
    const backgroundColor=()=>{
      if (pairity % 2 === 0 || pairity === 0){
        return "#E7E7E7"
      } else {
        return "#F3F3F3"
      }
    }

    const createSubtopic = (e)=>{
      e.preventDefault()
      addSubtopic(e.target[0].value, topic._id, localStorage.userToken)
    }

    return (
      <div style={{backgroundColor: backgroundColor()}} className="flex flex-spacebetween topic-header-holder">
        <ModalForm toggle={ui.modalCreateSubtopicShow} title={'Add Subtopic'} dispatch={()=>toggleModalCreateSubtopic()}>
          <form onSubmit={(e) => {createSubtopic(e); toggleModalCreateSubtopic()}}>
            <ControlLabel>Working example with validation</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter text"
              />
            <Button type="submit">Submit</Button>
          </form>
        </ModalForm>
        <h2>{topic.name}</h2>
        <div className="flex glyphicon-header-holder">
          <Glyphicon onClick={()=>toggleModalCreateSubtopic()} glyph="glyphicon glyphicon-plus" />
          <Glyphicon onClick={()=>toggleTopic(topic._id, localStorage.userToken, state)} glyph="glyphicon glyphicon-remove" />
        </div>
      </div>
    )
  }

export default TopicHeader

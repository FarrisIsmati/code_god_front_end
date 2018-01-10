import React, {Component}         from 'react'

import { toggleModalAdd,
         toggleModalCreate
       }                          from "../../../redux/actions/uiActions"
import { toggleTopic,
         addTopic
       }                          from "../../../redux/actions/userActions"
import { connect }                from 'react-redux'

import topic                      from './topic.js'
import toolbar                    from '../toolbar/toolbar.js'

class TopicContainer extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const topics = this.props.user.activeUser ? this.props.user.topics.filter((topic)=>{
      return topic.show
    }).map((topic, i)=>{
      return(
        <p key={i}>{topic.name}</p>
      )
    }) : null

    return(
      <div className="flex topic-container">
        <div>
          {
            topics ?
            topics :
            null
          }
        </div>
        <Toolbar />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userData,
  ui: state.uiState
})

const mapDispatchToProps = (dispatch) => {

  return {
    toggleModalAdd: ()=>{
      dispatch(toggleModalAdd())
    },
    toggleModalCreate: ()=>{
      dispatch(toggleModalCreate())
    },
    toggleTopic: (index)=>{
      dispatch(toggleTopic(index))
    },
    addTopic: (name, token)=>{
      dispatch(addTopic(name, token))
    }
  }
}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(toolbar)
const Topic = connect(mapStateToProps, mapDispatchToProps)(topic)

export default connect(mapStateToProps)(TopicContainer)

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

    this.updateGridColumns = this.updateGridColumns.bind(this)
  }

  updateGridColumns() {
    let length = this.props.user.activeUser ? this.props.user.topics.filter((topic)=>{
      return topic.show
    }).length : 0

    let grids = ('auto ').repeat(length)
    return {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: grids
    }
  }

  componentDidUpdate() {
    this.updateGridColumns()
  }

  render(){
    const topics = this.props.user.activeUser ? this.props.user.topics.filter((topic)=>{
      return topic.show
    }).map((topic, i)=>{
      return(
        <Topic topic={topic} state={this.props.user} key={i} pairity={i}/>
      )
    }) : null

    return(
      <div className="flex topic-container">
        <div style={this.updateGridColumns()}>
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
    toggleTopic: (id, token, state)=>{
      dispatch(toggleTopic(id, token, state))
    },
    addTopic: (name, token)=>{
      dispatch(addTopic(name, token))
    }
  }
}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(toolbar)
const Topic = connect(mapStateToProps, mapDispatchToProps)(topic)

export default connect(mapStateToProps)(TopicContainer)

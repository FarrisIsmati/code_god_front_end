import React, {Component}         from 'react'

import { toggleModalAdd }         from "../../../redux/actions/uiActions"
import { connect }                from 'react-redux'

import Domain                     from './domain.js'
import toolbar                    from '../toolbar/toolbar.js'

class DomainContainer extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

  render(){
    return(
      <div className="flex domain-container">
        <Domain />
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
    }
  }
}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(toolbar)

export default connect(mapStateToProps)(DomainContainer)

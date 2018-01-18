//GENERAL
import React, { Component }            from 'react'
import { Panel }                       from 'react-bootstrap'
import { Glyphicon }                   from 'react-bootstrap'

//COMPONENTS
import Quill                           from '../quill/quill.js'

import '../../stylesheets/subtopic.css'
import '../../stylesheets/flex.css'

class Subtopic extends Component {
  constructor(props){
    super(props)

    this.state = {
      edit: false,
      expanded: false
    }

    this.toggleExpanded = this.toggleExpanded.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.submitInputEdit = this.submitInputEdit.bind(this)
  }

  handleInputChange(e){
    this.setState({subtopicTitle: e.target.value})
  }

  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  toggleEdit(){
    this.setState({
      edit: !this.state.edit
    })
  }

  submitInputEdit(e){
    e.preventDefault()
    this.toggleEdit()
    this.props.updateSubtopicName(this.props.topicId, this.props.subtopicId, localStorage.userToken, this.state.subtopicTitle, this.props.user)
  }

  componentDidMount(){
    this.refs.subtopicTitle && this.setState({subtopicTitle: this.refs.subtopicTitle.outerText})
  }

  render() {
    return(
      <div className="subtopic-holder">
        <Panel id="collapsible-panel-example-2">
          <Panel.Heading>
            <div className="flex flex-spacebetween subtopic-header">
              {
                !this.state.edit ?
                <div onDoubleClick={()=>{this.toggleEdit()}} ref="subtopicTitle">
                  {this.props.subtopic.name}
                </div>:
                <form className="topic-input-form" onSubmit={(e)=>{this.submitInputEdit(e)}}>
                  <input className="topic-input" type="text" name="topicInput" value={this.state.subtopicTitle} onChange={(e)=>{this.handleInputChange(e)}}/>
                </form>
              }
              <div className="flex flex-center">
                <Panel.Title toggle>
                  {
                    !this.state.expanded ?
                    <Glyphicon onClick={this.toggleExpanded} className="flex flex-center trash-glyph" glyph="glyphicon glyphicon-arrow-down" />:
                    <Glyphicon onClick={this.toggleExpanded} className="flex flex-center trash-glyph" glyph="glyphicon glyphicon-arrow-up" />
                  }

                </Panel.Title>
                <Glyphicon
                onClick={() => this.props.deleteSubtopic(this.props.topicId, this.props.subtopic._id, localStorage.userToken, this.props.user)}
                className="flex flex-center trash-glyph" glyph="glyphicon glyphicon-trash" />
              </div>
            </div>

          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>

              <Quill topicIndex={this.props.topicIndex} subtopicIndex={this.props.index} topicId={this.props.topicId} updateQuill={this.props.updateQuill} data={this.props.user} subtopicText={this.props.subtopic.data} subtopicId={this.props.subtopic._id}/>

            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    )
  }
}

export default Subtopic

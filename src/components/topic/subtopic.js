//GENERAL
import React, { Component }            from 'react'
import { Panel }                       from 'react-bootstrap'
import {
         FormControl,
         Button,
         Glyphicon
       }                                from 'react-bootstrap'

//COMPONENTS
import Quill                            from '../quill/quill.js'
import ModalForm                        from '../common/modal.js'

import '../../stylesheets/subtopic.css'
import '../../stylesheets/flex.css'

class Subtopic extends Component {
  constructor(props){
    super(props)

    this.state = { showModalEdit: false }

    this.submitSubtopicName = this.submitSubtopicName.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.onChangeHandle = this.onChangeHandle.bind(this)
  }

  submitSubtopicName(e, subtopicId) {
    e.preventDefault()
    this.props.updateSubtopicName(
      this.props.topicId,
      subtopicId,
      localStorage.userToken,
      this.state.subtopicTitle,
      this.props.user
    )
  }

  onChangeHandle(e) {
    this.setState({subtopicTitle: e.target.value})
  }

  toggleModal() {
    this.setState({showModalEdit: !this.state.showModalEdit})
  }

  render() {
    return(
      <div className="subtopic-holder">
        <ModalForm toggle={this.state.showModalEdit} title={'Edit Subtopic Name'} dispatch={()=>this.toggleModal()}>
          <form onSubmit={(e) => {this.submitSubtopicName(e, this.props.subtopic._id); this.toggleModal()}}>
            <FormControl onChange={(e)=>this.onChangeHandle(e)}
                type="text"
                placeholder={this.props.subtopic.name}
              />
            <Button type="submit">Submit</Button>
          </form>
        </ModalForm>

        <Panel id="collapsible-panel-example-2">
          <Panel.Heading>

            <div className="flex flex-spacebetween subtopic-header">
              <Panel.Title toggle>
                <div onDoubleClick={()=>this.toggleModal()}>{this.props.subtopic.name}</div>
              </Panel.Title>
              <Glyphicon
              onClick={() => this.props.deleteSubtopic(this.props.topicId, this.props.subtopic._id, localStorage.userToken, this.props.user)}
              className="flex flex-center trash-glyph" glyph="glyphicon glyphicon-trash" />
            </div>

          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>

              <Quill topicIndex={this.props.topicIndex} subtopicIndex={this.props.subtopicIndex} topicId={this.props.topicId} updateQuill={this.props.updateQuill} data={this.props.user} subtopicText={this.props.subtopic.data} subtopicId={this.props.subtopic._id}/>

            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    )
  }
}

export default Subtopic

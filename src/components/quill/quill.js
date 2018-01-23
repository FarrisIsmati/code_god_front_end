//GENERAL
import ReactQuill                 from 'react-quill'
import React, {Component}         from 'react'
import { Glyphicon }              from 'react-bootstrap'
import axios                      from 'axios'

import '../../stylesheets/quill.css'

class Quill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      saved: false
     }

    this.saveState = this.saveState.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  //Update store with quill data
  handleChange(value) {
    this.props.updateQuill(this.props.topicId, this.props.subtopicId, value, this.props.data)
  }

  //Save State
  saveState() {
    axios.put('https://studyjs-ga.herokuapp.com/data/user/topic/' + this.props.topicId + '/' + this.props.subtopicId + '/' + localStorage.userToken, {
      text: this.props.subtopicText, value: 'data'
    })
    .then((res)=>{
      console.log(res)
      this.setState({saved: true})
      setTimeout(()=>{ this.setState({saved: false}) }, 1000)
    })
  }

  render() {
    const modules = {
      syntax: true,
      toolbar: [
        [{ header: [1, 2, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['code-block']
      ],
    }

    return (
      <div className="quill-holder">
        <ReactQuill ref="quill" theme="snow" modules={modules} value={this.props.subtopicText} onChange={this.handleChange}/>
        {
          this.state.saved ?
          <Glyphicon id="saved-btn" glyph="glyphicon glyphicon-floppy-saved" /> :
          <Glyphicon id="save-btn" onClick={this.saveState} glyph="glyphicon glyphicon-floppy-disk" />
        }
      </div>
    )
  }
}

export default Quill

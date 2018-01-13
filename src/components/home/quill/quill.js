import ReactQuill                 from 'react-quill'
import React, {Component}         from 'react'
import { Glyphicon }              from 'react-bootstrap'


import axios                      from 'axios'
import '../../../stylesheets/quill.css'

class Quill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      saved: false
     }

    this.saveState = this.saveState.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    // console.log(this.props.subtopicText)
    // this.setState({text:value})
    this.props.updateQuill(this.props.topicId, this.props.subtopicId, value, this.props.data)
  }

  saveState() {
    axios.put('http://localhost:3001/data/user/topic/' + this.props.topicId + '/' + this.props.subtopicId + '/' + localStorage.userToken, {
      text: this.props.subtopicText
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
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['blockquote', 'code-block']
    ],
  }

    return (
      <div className="quill-holder">
        <ReactQuill ref="quill" theme="bubble" modules={modules} value={this.props.subtopicText}
                    onChange={this.handleChange}>
        </ReactQuill>
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

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
    this.setState({ text: value })
  }

  saveState() {
    axios.put('http://localhost:3001/data/user/topic/' + this.props.topicId + '/' + this.props.subtopicId + '/' + localStorage.userToken, {
      text: this.state.text
    })
    .then((res)=>{
      this.setState({saved: true})
      setTimeout(()=>{ this.setState({saved: false}) }, 1000)
    })
  }

  componentDidMount(){
    this.props.subtopicText ? this.setState({text: this.props.subtopicText}):null
  }

  render() {
    const modules = {
    syntax: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote', 'code-block']
    ],
  }

    return (
      <div className="quill-holder">
        <ReactQuill ref="quill" theme="bubble" modules={modules} value={this.state.text}
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

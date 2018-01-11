import ReactQuill                 from 'react-quill'
import React, {Component}         from 'react'

class Quill extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  render() {
    const modules = {
    syntax: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['blockquote', 'code-block']
    ],
  }

    return (
      <ReactQuill theme="bubble" modules={modules} value={this.state.text}
                  onChange={this.handleChange} />
    )
  }
}

export default Quill

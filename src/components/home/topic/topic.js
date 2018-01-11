import React              from 'react'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/topic.css'

const Topic = ({topic}) => (
  <div>
    <p>{topic.name}</p>
  </div>
)

export default Topic

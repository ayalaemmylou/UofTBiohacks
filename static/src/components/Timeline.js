import React, { Component } from 'react'

import timeline from '../assets/js/timeline.js'
import '../styles/Timeline.scss'

export default class Timeline extends Component {

  render() {
    const timelineBlocks = []
    Object.keys(timeline).forEach( (time, i) => {
      let side
      i % 2 === 0 ? side = 'left' : side = 'right'

      const blockClass = `timeline-block ${side}`

      timelineBlocks.push(
        <div className={blockClass} key={i}>
          <span className="time">{time}</span>
          <span className="circle"><i className={timeline[time].icon}></i></span>
          <h3 className="timeline-title" dangerouslySetInnerHTML={{__html: timeline[time].title}}></h3>
          <div dangerouslySetInnerHTML={{__html: timeline[time].content}}></div>
        </div>
      )
    })

    return (
      <div>
        <div className="downTriangle" />
        <div className="container">
          <div className="Timeline">
            {timelineBlocks}
          </div>
        </div>
      </div>
    )
  }
}

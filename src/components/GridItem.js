import React from 'react'
import './GridItem.css'

const clearStyle = elm => elm.classList.remove('over')
// Consider pure css solution.
const getStyle = p => ({
  margin: '0 5px',
  width: `${p.size}vw`,
  height: `calc(${p.size}vw - 10px)`, // 10px - value of margin.
  backgroundColor: p.color || ''
})

export const GridItem = props => {
  const onDragStart = e => {
    e.stopPropagation()
    e.dataTransfer.setData('text/grid', props.id)
  }

  const onDragEnter = e => {
    e.currentTarget.classList.add('over')
  }

  const onDragLeave = e => {
    clearStyle(e.currentTarget)
  }

  const onDrop = e => {
    props.onDrop(e, props.id)
    clearStyle(e.currentTarget)
  }

  return (
    <div className="grid-item" style={getStyle(props)}
      draggable={true} onDragStart={onDragStart} onDragOver={e => e.preventDefault()}
      onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
      <div className="grid-item-title">{props.title || ''}</div>
    </div>
  )
}

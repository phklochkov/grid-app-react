import React from 'react'
import {GridItem} from './GridItem'
import './Grid.css'

// TODO: Move out to lib/utils
const makeList = l => [...Array(l).keys()]

export class Grid extends React.Component {
  state = { grid: {} }

  getItemProps = id => this.state.grid[id] || {}

  renderRow = rowNum => {
    const { size } = this.props
    const offset = size * rowNum

    return makeList(size)
      .map(x => <GridItem
        key={x}
        {...this.getItemProps(offset+x+1)}
        id={offset+x+1}
        size={100 / this.props.size}
        onDrop={this.onDrop} />)
  }

  generateGrid = (nextProps) => {
    const { items, size } = nextProps || this.props
    const grid = {}
    // Do better.
    items.forEach(x => grid[x.id] = x)
    makeList(size * size).forEach(x => {
      const v = grid[x+1]
      grid[x+1] = v ? v : {id: x+1}
    })

    this.setState({ grid })
  }

  onDrop = (e, target) => {
    e.stopPropagation()
    const id = +e.dataTransfer.getData('text/grid')
    if (id && target) {
      this.setState(state => ({
        grid: {...state.grid, [target]: state.grid[id], [id]: state.grid[target]}
      }))
    }
  }

  componentDidMount() {
    this.generateGrid()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      this.generateGrid(nextProps)
    }
  }

  render() {
    return (
      <div className="grid">
        {makeList(this.props.size)
          .map(x => <div key={x} className="grid-row">{this.renderRow(x)}</div>)}
      </div>
    )
  }
}

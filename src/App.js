import React from 'react'
import {Grid} from './components'
import {getGridItem} from './svc/grid'

import './App.css'

export default class extends React.Component {
  state = { items: [] }

  componentDidMount() {
    getGridItem()
      .then(items => this.setState({ items }))
      .catch(e => {console.log('error', e)})
  }

  render() {
    return (
      <div className="App">
        <Grid size={15} items={this.state.items} />
      </div>
    )
  }
}

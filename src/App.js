import React, { Component } from 'react'

import { initialState, StoreContext } from './utils/store'
import RandomEvents from './components/RandomEvents'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = initialState({
      state: this.state,
      setState: this.setState,
    })
  }

  render = () => (
    <StoreContext.Provider value={this.state}>
      <RandomEvents />
    </StoreContext.Provider>
  )
}

export default App

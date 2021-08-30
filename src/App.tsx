import React from 'react'
import { Route } from 'react-router'

import { Signin } from '~/views/access'
import { Main } from '~/views/main'

export function App() {

  return (
    <div className="App">
      <Route exact path="/">
        <Main>
          abc
        </Main>
      </Route>
      <Route path="/signin" component={Signin} />
    </div>
  )
}

export default App

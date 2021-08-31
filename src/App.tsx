import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import { Signin } from '~/views/access'
import { Main } from '~/views/main'

export function App() {

  const match = useRouteMatch()

  console.log(match)

  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/">
          <Main>
            abc { match.url }
            <Switch>
              <Route exact path="/" component={() => <div>13</div>} />
              <Route path="/orders" component={() => <div>orders</div>} />
            </Switch>
            def
          </Main>
        </Route>
      </Switch>
    </div>
  )
}

export default () => (
  <Router>
    <App />
  </Router>
)

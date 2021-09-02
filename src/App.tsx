import React from 'react'
import { Route, Switch, useRouteMatch, useLocation } from 'react-router'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import { Signin } from '~/views/access'
import { Main } from '~/views/main'
import { ButtonPage, FormPage } from '~/views/cmp'

export function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/">
          <Main>
            <Switch>
              <Route path="/dashboard" component={() => <div>00</div>} />
              <Route path="/components_button" component={ButtonPage} />
              <Route path="/components_form" component={FormPage} />
              <Redirect to="/dashboard"/>
            </Switch>
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

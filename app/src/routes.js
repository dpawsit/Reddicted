import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import axios from 'axios'


export default (
  <Route path='/' component={} >
    {/*<IndexRedirect to="/dashboard" />*/}
    <Route path="dashboard" component = {} onEnter={}/>
    <Route path="login" component={} />
  </Route>
)
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, render, loggedIn, ...rest }) => (
  <Route {...rest} render={props => 
    loggedIn ? (<Component {...props} />) : (<Redirect to='/accounts/login' />)
  } />
);

export default PrivateRoute;
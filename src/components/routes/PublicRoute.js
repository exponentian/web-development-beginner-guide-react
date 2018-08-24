import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route {...rest} render={props => 
    loggedIn ? (<Redirect to='/' />) : (<Component {...props} />) 
  } />
);

export default PublicRoute;
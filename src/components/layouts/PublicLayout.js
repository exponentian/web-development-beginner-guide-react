import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PublicRoute from '../routes/PublicRoute';
import NoMatch from '../routes/NoMatch';

import Login from '../Login';
import Signup from '../Signup';
import Landing from '../Landing';

class PublicLayout extends React.Component {
  render() {
    
    return (
      <div className="content">
        <Switch>
          <PublicRoute path='/accounts/login' loggedIn={false} component={() => <Login {...this.props} />} />
          <PublicRoute path='/accounts/signup' loggedIn={false} component={() => <Signup {...this.props} />} />
          <PublicRoute exact path='/' loggedIn={false} component={Landing}/>
          <Route component={props => <NoMatch to='/' />} />
        </Switch>
      </div>
    );
  }
}

export default PublicLayout;
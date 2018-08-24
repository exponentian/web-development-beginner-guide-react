import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeState } from '../localStorage';
import authData from '../authData';
import { Sep, delay } from '../utils';

class Header extends React.Component {

  handleLogout = () => {
    const { history } = this.props;
    
    removeState();
    authData.isLoggedIn = false;
    authData.data = {};
    delay(1000).then(() => history.push('/'));
  };

  render() {
    const { authData } = this.props;

    return (
      <header>
        <nav>
          <Link to='/home'>Home</Link>
          <Sep text='|' />
          
          <span>
            Logged in as <Link to={`/users/${authData.data.username}`}>{authData.data.username}</Link>
          </span>
          <Sep text=' ' />
          
          <button type="button" onClick={this.handleLogout}>Log Out</button>
        </nav>
        <hr />
      </header>
    );
  }
}


Header.propTypes = {
  history: PropTypes.object,
  authData: PropTypes.object,
  userLogout: PropTypes.func
};



export default withRouter(Header);

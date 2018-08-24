import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../routes/PrivateRoute';
import NoMatch from '../routes/NoMatch';
import UserEdit from '../UserEdit';
import User from '../User';
import Home from '../Home';

import { apiUserRead, apiBookinstancesRead } from '../../middlewares/api';

class PrivateLayout extends React.Component {

  state = {
    localLibraryData: {
      userData: {
        isLoaded: false,
        data: {}
      },
      bookinstanceData: {
        isLoaded: false,
        data: []
      }
    },
    errors: {}
  };

  componentDidMount = () => {
    const { authData } = this.props;
    
    if (authData.isLoggedIn) {
      this.fetchData(authData.data);
    }
  };

  fetchData = authData => {

    // get user data
    apiUserRead(authData).then(userResult => {
      this.setState({
        localLibraryData: { ...this.state.localLibraryData,
          userData: { 
            isLoaded: true,
            data: userResult 
          }
        }
      });
    }).catch(error => {
      error.json().then(obj => this.setState({ 
        errors: { failure: obj.message }
      }));
    });

    // get bookinstace data
    apiBookinstancesRead(authData).then(bookinstacneResult => {      
      this.setState({
        localLibraryData: { ...this.state.localLibraryData,
          bookinstanceData: { 
            isLoaded: true,
            data: bookinstacneResult 
          }
        }
      });

    }).catch(error => {
      error.json().then(obj => this.setState({ 
        errors: { failure: obj.message }
      }));
    });
  };


  render() {
    const { localLibraryData, errors } = this.state;
    const { authData } = this.props;

    if ( authData.isLoggedIn 
      && (!localLibraryData.userData.isLoaded || !localLibraryData.bookinstanceData.isLoaded) ) {
      return (
        <div>
          <p>
            Loading...<br />
            Please retry if it is still loading
          </p>
          <button type="button" onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }


    // return errors if errors exist
    if (errors.failure !== undefined) return <div>{errors.failure}</div>;


    return (
      <div className="content">
        <Switch>
          <PrivateRoute path='/users/:username/edit' loggedIn={true} component={props => 
            <UserEdit localLibraryData={localLibraryData} {...this.props} />
          } />
          
          <PrivateRoute path='/users/:username' loggedIn={true} component={props => 
            <User localLibraryData={localLibraryData} {...this.props} />
          } />
          
          <PrivateRoute path='/home' loggedIn={true} component={props => 
            <Home localLibraryData={localLibraryData} {...this.props} />
          } />
          
          <Route component={props => <NoMatch to='/home' />} />
        </Switch>
      </div>
    );
  }
}

export default PrivateLayout;
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { saveState } from '../localStorage';
import { apiUserLogin } from '../middlewares/api';
import { ValidateEmail, ErrorMessage, Sep, delay } from '../utils';


class Login extends React.Component {
  state = {
    isRequesting: false,
    loginData: { 
      email: 'test.user01@example.com', 
      password: '12345678'
    },
    errors: {}
  };

  handleChange = (e) => {
    this.setState({ 
      loginData: {...this.state.loginData, [e.target.name]: e.target.value} 
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    const { loginData } = this.state;
    const { history, authData } = this.props;

    const errors = this.formValidation(loginData);

    // check whether input errors exist or not
    if (Object.keys(errors).length === 0) {
      this.setState({ isRequesting: true });
      apiUserLogin(loginData).then(result => {

        // save state
        if ( saveState(result) ) {

          // update authData
          authData.isLoggedIn = true;
          authData.data = result;
          delay(1000).then(() => {
            this.setState({ isRequesting: false });  
            history.push('/home');
          });
          
        } else {
          this.setState({ 
            isRequesting: false,
            errors: { failure: 'Cannot save state' }
          });
        }

      }).catch(error => {
        error.json().then(obj => this.setState({ 
          isRequesting: false,
          errors: { failure: obj.message }
        }));
      });

    } else {
      this.setState({ 
        isRequesting: false,
        errors: errors 
      });
    }

  };

  formValidation = data => {
    const errors = {};

    // check for email if it is empty or valid
    if (data.email === "" || !ValidateEmail(data.email)) errors.email = 'Invalid email';

    // check for password
    if (data.password === "") errors.password = 'Invalid password';

    return errors;
  };

  render() {
    const { isRequesting, loginData, errors } = this.state;    

    return (
      <div>
        <h1>Log In</h1>

        <section>
          { !!errors.failure && <ErrorMessage text={errors.failure} /> }

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email:</label><br />
            <input type="text" name="email" value={loginData.email} onChange={this.handleChange} /><br />
            { !!errors.email && <ErrorMessage text={errors.email} /> }

            <label htmlFor="password">Password:</label><br />
            <input type="password" name="password" value={loginData.password} onChange={this.handleChange} /><br />     
            { !!errors.password && <ErrorMessage text={errors.password} /> }
            
            <button type="submit">{isRequesting ? 'Logging In...' : 'Log In'}</button>
          </form>

          <br />
          <div>
            <Sep text='or' />
            <Link to='/accounts/signup'>create an account</Link>
          </div>
          
        </section>

      </div>
    );
  }
}

export default withRouter(Login);
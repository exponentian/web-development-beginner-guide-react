import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { saveState } from '../localStorage';
import { apiUserSignup } from '../middlewares/api';
import { ValidateEmail, ErrorMessage, delay } from '../utils';


class Signup extends React.Component {

  state = {
    isRequesting: false,
    singupData: { 
      email: '', 
      password: '', 
      username: '', 
      firstname: '', 
      lastname: '' 
    },
    errors: {}
  };

  handleChange = (e) => {
    this.setState({
      singupData: {...this.state.singupData, [e.target.name]: e.target.value}
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { singupData } = this.state;
    const { history, authData } = this.props;

    const errors = this.formValidation(singupData);

    // check whether input errors exist or not
    if (Object.keys(errors).length === 0) {
      this.setState({ isRequesting: true });
      apiUserSignup(singupData).then(result => {

        // save state
        if ( saveState(result) ) {

          // update authData
          authData.isLoggedIn = true;
          authData.data = result;
          delay(1000).then(() => {
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
      this.setState({ errors: errors });
    }
    
  };


  // form validation for user inputs
  formValidation = data => {
    const errors = {};

    // check for email if it is empty or valid
    if (data.email === "" || !ValidateEmail(data.email)) errors.email = 'Invalid email';
    if (data.password === "") errors.password = 'Invalid password';
    if (data.username === "") errors.username = 'Invalid username';
    if (data.firstname === "") errors.firstname = 'Invalid first name';
    if (data.lastname === "") errors.lastname = 'Invalid last name';

    return errors;
  };

  render() {
    const { isRequesting, singupData, errors } = this.state;

    return (
      <div>
        <h1>Sign Up</h1>
        
        <section>
          { !!errors.failure && <ErrorMessage text={errors.failure} /> }

          <form onSubmit={this.handleSubmit}>
            
            <label htmlFor="email">Email:</label><br />
            <input type="text" name="email" value={singupData.email} onChange={this.handleChange} /><br />
            {!!errors.email && <ErrorMessage text={errors.email} />}

          
            <label htmlFor="password">Password:</label><br />
            <input type="password" name="password" value={singupData.password} onChange={this.handleChange} /><br />
            {!!errors.password && <ErrorMessage text={errors.password} />}

          
            <label htmlFor="username">Username:</label><br />
            <input type="text" name="username"  value={singupData.username} onChange={this.handleChange} /><br />
            {!!errors.username && <ErrorMessage text={errors.username} />}

          
            <label htmlFor="firstname">First Name:</label><br />
            <input type="text" name="firstname" value={singupData.firstname} onChange={this.handleChange} /><br />
            {!!errors.firstname && <ErrorMessage text={errors.firstname} />}

          
            <label htmlFor="lastname">Last Name:</label><br />
            <input type="text" name="lastname" value={singupData.lastname} onChange={this.handleChange} /><br />
            {!!errors.lastname && <ErrorMessage text={errors.lastname} />}          


            <button type="submit">
              {isRequesting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <br />
          <div>or <Link to='/accounts/login'>log in to your account</Link></div>
        </section>

      </div>
    );
  }
}

export default withRouter(Signup);
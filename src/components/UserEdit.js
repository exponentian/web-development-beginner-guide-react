import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';

import { apiUserProfileUpdate, apiUserChangePassword } from '../middlewares/api';
import { ValidateEmail, ErrorMessage, delay } from '../utils';


class UserEdit extends React.Component {
  state = {
    isRequesting: false,
    editData: {
      email: this.props.localLibraryData.userData.data.email,
      username: this.props.localLibraryData.userData.data.username,
      firstname: this.props.localLibraryData.userData.data.firstname,
      lastname: this.props.localLibraryData.userData.data.lastname
    },
    errors: {}
  };

  inputPassword = React.createRef();

  handleChange = (e) => {
    this.setState({
      editData: { ...this.state.editData, [e.target.name]: e.target.value.trim() }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { editData } = this.state;
    const { authData } = this.props;
    const errors = this.formValidation(editData);

    if (Object.keys(errors).length === 0) {
      this.setState({ isRequesting: true });

      apiUserProfileUpdate(authData.data, editData).then(userResult => {        
        const { message, user } = userResult;

        if (message === 'Successfully updated') {
          delay(1000).then(() => { 
            this.setState({
              editData: {
                email: user.email,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
              },
              isRequesting: false
            });
            alert("Successfully updated");
          });
        }

      }).catch(error => {
        error.json().then(obj => this.setState({ 
          isRequesting: false,
          errors: { failure: obj.message }
        }));
      });

    }
  };

  formValidation = data => {
    const errors = {};

    if (data.email === "" || !ValidateEmail(data.email)) errors.email = 'Invalid email';
    if (data.username === "") errors.username = 'Invalid username';
    if (data.firstname === "") errors.firstname = 'Invalid firstname';
    if (data.lastname === "") errors.lastname = 'Invalid lastname';

    return errors;
  };

  changePassword = () => {
    const { authData } = this.props;
    const newPassword = this.inputPassword.current.value.trim();

    if (newPassword !== '') {

      apiUserChangePassword(authData.data, newPassword).then(userResult => {
        if (userResult.message === 'Successfully updated') {
          delay(1000).then(() => {
            this.inputPassword.current.value = '';
            alert("Successfully changed");
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
        errors: { password: 'Invalid password' } 
      });
    }
  };

  render() {
    const { isRequesting, editData, errors } = this.state;
    const { history, authData } = this.props;


    return (
      <div>
        <Header authData={authData} />

        <h3>User Edit</h3>
        
        <section>
          { !!errors.failure && <ErrorMessage text={errors.failure} /> }

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email:</label><br />
            <input type="text" name="email" defaultValue={editData.email} onChange={this.handleChange} /><br />
            {errors.email && <ErrorMessage text={errors.email} />}


            <label htmlFor="username">Username:</label><br />
            <input type="text" name="username"  defaultValue={editData.username} onChange={this.handleChange} /><br />
            {errors.username && <ErrorMessage text={errors.username} />}


            <label htmlFor="firstname">First Name:</label><br />
            <input type="text" name="firstname" defaultValue={editData.firstname} onChange={this.handleChange} /><br />
            {errors.firstname && <ErrorMessage text={errors.firstname} />}


            <label htmlFor="lastname">Last Name:</label><br />
            <input type="text" name="lastname" defaultValue={editData.lastname} onChange={this.handleChange} /><br />
            {errors.lastname && <ErrorMessage text={errors.lastname} />}
            

            <button type="submit">
              {isRequesting ? 'Updating...' : 'Update'}
            </button>
            <button type="button" onClick={() => history.goBack()}>Cancel</button>
          </form>

        </section>

        <br />

        <section>
          <form>
            <label htmlFor="change-password">Change Password:</label><br />
            <input type="password" ref={this.inputPassword} /><br />
          
            <button type="button" onClick={this.changePassword}>Change</button>

            { errors.password && <ErrorMessage text={errors.password} /> }  
          </form>
        </section>

      </div>
    );
  }
}


UserEdit.propTypes = {
  history: PropTypes.object,
  authData: PropTypes.object,
  userData: PropTypes.object
};


export default UserEdit;
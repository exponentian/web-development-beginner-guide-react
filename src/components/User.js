import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import { apiUserReturnBooks, apiBookinstanceMakeAvailable } from '../middlewares/api';
import { delay } from '../utils';

class User extends React.Component {

  state = {
    userData: this.props.localLibraryData.userData,
    errors: {}
  }

  handleReturn = (bookinstanceId) => {
    const { userData } = this.state;
    const { authData, localLibraryData } = this.props;
    const { bookinstanceData } = localLibraryData;

    apiBookinstanceMakeAvailable(authData.data, bookinstanceId).then(bookinstanceResult => {

      if (bookinstanceResult.message === 'Successfully updated'
        && bookinstanceResult.bookinstance.status === 'Available') {

        apiUserReturnBooks(authData.data, bookinstanceId).then(userResult => {

          if (userResult.message === 'Successfully returned a book'
            && userResult.bookinstanceId === bookinstanceId) {

            delay(1000).then(() => {
              if ( this.updateData(userData, bookinstanceData, bookinstanceId) ) {
                alert("Successfully returned");
              }
            });
          }
     
        }).catch(error => {
          error.json().then(obj => this.setState({ 
            errors: { failure: obj.message }
          }));
        });
      }

    }).catch(error => {
      error.json().then(obj => this.setState({ 
        errors: { failure: obj.message }
      }));
    });
  };


  // update data after api call
  updateData = (userData, bookinstanceData, bookinstanceId) => {

    // update user's borrowedBooks
    const newBorrowedBooks = userData.data.borrowedBooks.filter(bookinstance => bookinstance._id !== bookinstanceId);
    const newData = Object.assign({}, userData.data, { borrowedBooks: newBorrowedBooks });
    this.setState({
      userData: {...userData, data: newData}
    });

    // update bookinstanceData
    const newBookinstanceData = bookinstanceData.data.map(bookinstance => {
      if (bookinstance._id === bookinstanceId) {
        bookinstance.status = 'Available';
      }
      return bookinstance;
    });

    bookinstanceData.data = newBookinstanceData;

    return true;
  };

  render() {
    const { userData, errors } = this.state;
    const { match, authData } = this.props;

    // return errors if errors exist
    if (errors.failure !== undefined) return <div>{errors.failure}</div>;


    const borrowedBooks = userData.data.borrowedBooks.map((bookinstance, i) => {
      return (<BorrowedBooks key={i} order={i+1} handleReturn={this.handleReturn} {...bookinstance} />);
    });

    return (
      <div>
        <Header authData={authData} />

        <h2>
          Profile (<Link to={`${match.url}/edit`}>Edit</Link>)
        </h2>

        <ul>
          <li>Username: {userData.data.username}</li>
          <li>Email: {userData.data.email}</li>
          <li>First Name: {userData.data.firstname}</li>
          <li>Last Name: {userData.data.lastname}</li>
        </ul>

        <h3>My Books Borrowed</h3>

        { userData.data.borrowedBooks.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Due Back</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { borrowedBooks }
            </tbody>
          </table>
          : <div>No borrowed books found.</div> }

      </div>
    );
  }
}


User.propTypes = {
  match: PropTypes.object,
  authData: PropTypes.object,
  userData: PropTypes.object,
  userReturnBooks: PropTypes.func,
  bookinstanceMakeAvailable: PropTypes.func
};



class BorrowedBooks extends React.Component {
  handleReturn = () => {
    this.props.handleReturn(this.props._id);
  };

  render() {
    const { order, book, due_back } = this.props;

    return (
      <tr>
        <td>{ order }</td>
        <td>{ due_back.split('T')[0] }</td>
        <td>{ book.title }</td>
        <td>
          <button type="button" onClick={this.handleReturn}>Return</button>
        </td>
      </tr>
    );
  }
}


BorrowedBooks.propTypes = {
  order: PropTypes.number,
  book: PropTypes.object,
  due_back: PropTypes.string
};


export default withRouter(User);
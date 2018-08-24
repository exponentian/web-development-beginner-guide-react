import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import BookInstance from './BookInstance';
import { apiUserBorrowBooks, apiBookinstanceMakeLoan } from '../middlewares/api';
import { delay } from '../utils';


class Home extends React.Component {

  state = {
    isRequesting: false,
    bookinstanceData: this.props.localLibraryData.bookinstanceData,
    errors: {}
  };

  // filter by book status
  filterBooks = bookinstances => {
    const booksAvailable = [];

    for (const bookinstance of bookinstances) {
      if (bookinstance.status === 'Available') {
        booksAvailable.push(bookinstance);
      }
    }
    
    return booksAvailable;
  };

  handleCheckout = bookinstanceId => {
    const { bookinstanceData } = this.state;
    const { authData, localLibraryData } = this.props;
    const { userData } = localLibraryData;

    if (bookinstanceId) {

      apiBookinstanceMakeLoan(authData.data, bookinstanceId).then(bookinstanceResult => {

        if (bookinstanceResult.message === 'Successfully updated'
          && bookinstanceResult.bookinstance.status === 'Loaned') {
          
          apiUserBorrowBooks(authData.data, bookinstanceId).then(userResult => {
            if (userResult.message === 'Successfully borrowed a book'
              && userResult.bookinstance._id === bookinstanceId) {

              delay(1000).then(() => {
                if ( this.updateData(userData, bookinstanceData, bookinstanceId) ) {
                  alert("Successfully borrowed");
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
      
    }

  };

  // update data after api call
  updateData = (userData, bookinstanceData, bookinstanceId) => {
    

    // update user's borrowedBooks
    let bookinstanceFound = {};
    for (let bookinstance of bookinstanceData.data) {
      if (bookinstance._id === bookinstanceId) {
        bookinstanceFound = bookinstance;
      }
    }

    userData.data.borrowedBooks.push(bookinstanceFound);

    // update bookinstanceData
    const data = [...bookinstanceData.data];
    
    const newData = data.map(bookinstance => {
      if (bookinstance._id === bookinstanceId) {
        bookinstance.status = 'Loaned';
      }
      return bookinstance;
    });
    
    this.setState({
      bookinstanceData: { ...bookinstanceData, data: newData }
    });

    return true;
  };


  render() {
    const { bookinstanceData, errors } = this.state;
    const { authData } = this.props;

    // return errors if errors exist
    if (errors.failure !== undefined) return <div>{errors.failure}</div>;

    const bookinstances = {
      available: this.filterBooks(bookinstanceData.data)
    }

    if (bookinstances.available.length < 1) {
      return (
        <div>
          <Header authData={authData} />
          <p>Sorry. There no books available to borrow.</p>
        </div>
      );
    }

    const bookinstanceList = bookinstances.available.map((bookinstance, i) => 
      <BookInstance key={i} handleCheckout={this.handleCheckout} {...bookinstance} />
    );
    
    return (
      <div>
        <Header authData={authData} />

        <h3>A list of books available</h3>
        {bookinstanceList}
      </div>
    );
  }
}


Home.propTypes = {
  authData: PropTypes.object,
  bookinstanceData: PropTypes.object,
  userBorrowBooks: PropTypes.func,
  bookinstanceMakeLoan: PropTypes.func
};


export default Home;
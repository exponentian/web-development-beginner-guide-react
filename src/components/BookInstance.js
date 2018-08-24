import React from 'react';
import PropTypes from 'prop-types';

import { Sep } from '../utils';


class BookInstance extends React.Component {
  handleCheckout = () => {
    this.props.handleCheckout(this.props._id);
  };

  render() {
    const { imprint, due_back } = this.props;

    return (
      <div>
        <h4>Book Info</h4>
        <Book imprint={imprint} due_back={due_back} {...this.props.book} />
        <button type="button" onClick={this.handleCheckout}>Borrow</button>
      </div>
    );
  }
}


BookInstance.propTypes = {
  imprint: PropTypes.string,
  due_back: PropTypes.string
};



class Book extends React.Component {
  render() {
    const { title, author, genre, isbn, summary, imprint, due_back } = this.props;

    const genreList = genre.map((g, i) => <span key={i}>{ g.name } </span>)

    return (
      <div className="book-info">
        <ul>
          <li>
            Title: <b>{ title }</b>
          </li>
          <li>
            Author: { author.first_name + ' ' + author.family_name } 
            <Sep text={" "} />
          </li>
          
          { genre.length > 0 && <li>Genre: { genreList }</li> }
          
          <li>
            ISBN: { isbn }
          </li>
          <li>
            Summary: { summary }
          </li>
          <li>
            Imprint: { imprint }
          </li>
          <li>
            Due back: { due_back.split('T')[0] }
          </li>
        </ul>
      </div>
    );
  }
}


Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.object,
  genre: PropTypes.array,
  isbn: PropTypes.string,
  summary: PropTypes.string,
  imprint: PropTypes.string,
  due_back: PropTypes.string
};


export default BookInstance;
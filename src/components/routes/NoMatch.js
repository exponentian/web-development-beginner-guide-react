import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = ({ to }) => (
  <div>
    <h2>Sorry, this page isn't available.</h2>
    <p>The link you followed may be broken, or the page may have been removed. Go back to <Link to={to}>Local Library Home</Link>.</p>    
  </div>
);

export default NoMatch;
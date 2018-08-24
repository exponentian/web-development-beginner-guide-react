import React from 'react';
import { Link } from 'react-router-dom';

import { Sep } from '../utils';

const Landing = () => (
  <div>
    <h1>Local Library Demo</h1>
    <h3>Part Two: Frontend with React only</h3>

    <Link to='/accounts/login'>Login</Link>
    <Sep text='or' />
    <Link to='/accounts/signup'>Signup</Link>
  </div>
);


export default Landing;
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { loadState } from '../localStorage';
import authData from '../authData';

// keep a user logged in after login or signup
const persistedState = loadState();

if (persistedState) {
  authData.isLoggedIn = true;
  authData.data = persistedState;
}

const Root = () => (
  <BrowserRouter>
    <App authData={authData} />
  </BrowserRouter>
);

export default Root;
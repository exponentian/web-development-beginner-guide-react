import React from 'react';

export const ValidateEmail = email => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
};

export const SuccessMessage = ({ text }) => {
  return <div style={ {'color': 'darkgreen', 'marginBottom': '10px'} }>{text}</div>;  
};

export const ErrorMessage = ({ text }) => {
  return <div style={ {'color': 'maroon', 'marginBottom': '10px'} }>{text}</div>;
};

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const Sep = ({ text }) => <span> {text} </span>;
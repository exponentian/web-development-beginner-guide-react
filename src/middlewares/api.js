import { API_URL } from '../config';

const result = response => {
  // return data if status is 200 and ok is true; otherwise, throw error
  if (response.status === 200 && response.ok) return response.json();
  throw response;
};

/* auth actions */
export const apiUserLogin = data => {
  return fetch(API_URL + '/users/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(data)
  }).then(response => result(response));
};


export const apiUserSignup = data => {
  return fetch(API_URL + '/users/signup', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(data)
  }).then(response => result(response));
};


export const apiUserChangePassword = (auth, password) => {  
  return fetch(API_URL + '/users/' + auth.username + '/change-password', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + auth.token
    },
    mode: 'cors',
    body: JSON.stringify({ password: password })
  }).then(response => result(response));
};



/* user actions */
export const apiUserRead = auth => {
  return fetch(API_URL + '/users/' + auth.username, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + auth.token
    },
    mode: 'cors'
  }).then(response => result(response));
};


export const apiUserProfileUpdate = (auth, data) => {
  return fetch(API_URL + '/users/' + auth.username, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + auth.token
    },
    mode: 'cors',
    body: JSON.stringify(data)
  }).then(response => result(response));
};


export const apiUserBorrowBooks = (auth, bookinstanceId) => {
  return fetch(API_URL + '/users/' + auth.username + '/borrow-books', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + auth.token
    },
    mode: 'cors',
    body: JSON.stringify({ bookinstanceId: bookinstanceId })
  }).then(response => result(response));
};


export const apiUserReturnBooks = (auth, bookinstanceId) => {
  return fetch(API_URL + '/users/' + auth.username + '/return-books', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + auth.token
    },
    mode: 'cors',
    body: JSON.stringify({ bookinstanceId: bookinstanceId })
  }).then(response => result(response));
};




/* bookinstance actions */
export const apiBookinstancesRead = auth => {
  return fetch(API_URL + '/catalog/bookinstances', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + auth.token
    },
    mode: 'cors'
  }).then(response => result(response));
};


export const apiBookinstanceMakeLoan = (auth, bookinstanceId) => {
  return fetch(API_URL + '/catalog/bookinstances/' + bookinstanceId, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + auth.token
    },
    mode: 'cors',
    body: JSON.stringify({ 'status': 'Loaned' })
  }).then(response => result(response));
};


export const apiBookinstanceMakeAvailable = (auth, bookinstanceId) => {
  return fetch(API_URL + '/catalog/bookinstances/' + bookinstanceId, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + auth.token
    },
    mode: 'cors',
    body: JSON.stringify({ 'status': 'Available' })
  }).then(response => result(response));
};

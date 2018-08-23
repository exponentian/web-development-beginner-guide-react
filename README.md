# Beginner's Guide to Web Development
## Example: Local Library
### Technologies: Node.js, React, Redux and MongoDB
#### Author: Ho Seok (Brandon) Oh


## [Demo](https://local-library-redux-hoseokoh.herokuapp.com/)

#### Preface
> I am a sofrware developer, and I’ve been developing web applications with multiple frameworks. Recently, I learn Redux which is an open-source Javascript library for managing data state. It is widely used with React to develop Front-end web applications. I’ve decided to make this toy example from scratch to teach myself and to share cutting-edge technology with people who are eager to learn Node.js, React and Redux. Actually, I learn those web technologies from online resources while working on a project. To be honest, my code is not enough to cover all topics. It may help beginners to understand data mannagement or data flow which is super important in web development. I hope everyone enjoys my tutorial, and please focus more on data flow.


#### Objectives
- Understanding of web development life cycle
- Data model schema design for REST API
- Web authetication and authorization methods
- Communicating data between backend and frontend
- Implimenting basic four [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations


This tutorial consists of three parts: 
- **Part One:** [REST API with Node.js and MongoDB](https://github.com/exponentian/web-development-beginner-guide-rest-api)
- **Part Two:** [Frontend with React only](https://github.com/exponentian/web-development-beginner-guide-react)
- **Part Three:** [Frontend with React and Redux](https://github.com/exponentian/web-development-beginner-guide-react-redux)


Target audiences:
- Beginners of web development
- People who want to learn Node.js, React, Redux and MongoDB


## Overview of Local Library

> I've decided to start with a well-documented online resource, and this [Express Tutorial: The Local Library website](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website) is good for understanding [Express](https://expressjs.com/en/guide/routing.html) on [Node.js](https://nodejs.org/dist/latest-v8.x/docs/api/) and [MongoDB](https://docs.mongodb.com/?_ga=2.252321673.1833710047.1534972335-396144116.1534972335) with [Mongoose](https://mongoosejs.com/docs/index.html). Please read through the Express Tutorial before start coding.


### Features
- Login/Logout and Signup with authentication tools such as [JSON Web Token (JWT)](https://github.com/auth0/node-jsonwebtoken#readme)  and [password hashing function (bcrypt)](https://github.com/kelektiv/node.bcrypt.js#readme)
- Display all books available to borrow
- Display all books borrowed by users
- Users can return the books
- Edit user's profile and password


#### Must be installed
- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://docs.npmjs.com/cli/install)
- [MongoDB](https://docs.mongodb.com/manual/installation/)


---


# **Part Two:** Frontend with React only

### Quick Overview

> I highly recommend reading online resources below. Also, I start off this example with [create-react-app](https://github.com/facebook/create-react-app) supported by Facebook.


#### Resources:
- [React Docs](https://reactjs.org/docs/create-a-new-react-app.html)


#### MongoDB cloud database hosting
- [mLab](https://mlab.com/welcome/) - free sandbox
- [Setting up the MongoDB database](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Setting_up_the_MongoDB_database)


#### Testing
- File: [populatedb.js](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Testing_%E2%80%94_create_some_items)
- Tool: [Postman](https://www.getpostman.com/docs/v6/postman/sending_api_requests/requests)
- Database: localhost MongoDB or cloud hosting MongoDB


#### Important keywords
- Routing: POST, GET, PUT, DELETE
- Mongoose: Schemas, Model, Populate
- [JSON Web Token (JWT)](https://github.com/auth0/node-jsonwebtoken#readme)
- [Password hash function (bcrypt)](https://github.com/kelektiv/node.bcrypt.js#readme)


#### Packages installed
- react-router-dom


#### To start

1. Download or clone

```
$ git clone https://github.com/exponentian/web-development-beginner-guide-react.git
```

2. Install npm packages

```
$ npm install
```

3. Add your MONGOLAB URI in ./src/config.js

4. Start

```
$ npm start
```


Happy coding!
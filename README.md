
[![Build Status](https://travis-ci.org/adydams/hello-books.svg?branch=setup-eslint-houndCI)](https://travis-ci.org/adydams/hello-books)

[![Coverage Status](https://coveralls.io/repos/github/adydams/hello-books/badge.svg?branch=setup-eslint-houndCI)](https://coveralls.io/github/adydams/hello-books?branch=master)

# hello-books
The Hello-books is a digital library management system. It also ensures that users are authorized and able to manage library books.

Visit my app [here] 

# API Documentation
The API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API status and errors.

## Features 

**Users**:
- A Regular User can:
    - Create  books
    - Borrow books
    - Review books
    - Create a document
    - Update books
    - Review books
    - Check all the list of books
    - Mark favorite books
    

**BOOKS**:
Books can be created and must have:
  - Book Title
  - Author
  - Book Summary
  - ISBN
  -Quantity

## Endpoints

**Users**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/users/signup](#create-user) | Create a new user
POST | [/users/signin](#login) | To log a user in
PUT | [/books/:bookId](#adding-A-book) | Updating an existing book
GET | [/books](#get-all-books) | Get all the list of books
POST | [/api/users/:userId/borrow/:bookId](#user-borrow-books) | User borrow books
POST | [/api/users/:userId/return/:bookId](#return-borrow-books) | Remove a book from borrow list
POST | [/api/users/:userId/review/:bookId](#review-existing-books)  |

The following are some sample request and response from the API.

### Create book
#### Request
- Endpoint: POST: `/api/books`
- Status: `200: OK`
- Body `(application/json)`
```json
"books": 
    {
      "bookTitle": "Be courageous",
      "author": "John",
      "bookSummary": "Faith",
      "isbn": "56e56rtfrd566783nj",
      "quantity": 8
    }

#### Response
{
  "message": "Be courageous not coward Succesfully recorded",
  ```

### Borrow Books

#### Request
- Endpoint: POST: `/api/users/1/borrow/1`
- Requires: `A registered user and created`
- Body `(application/json)`
```json

```

#### Response
- Status: `200`
- Body `(application/json)`
```json
{
  "message": "You have just borrowed The man God uses"
  }
}
```

### Borrow Books

#### Request
- Endpoint: POST: `/api/users/1/borrow/1`
- Requires: `Only one copy of a book can be borrowed at a time `
- Body `(application/json)`
```json

```

#### Response
- Status: `404`
- Body `(application/json)`
```json
{
  "message": "You have borrowed a copy of this book before, You are not allowed to borrow it again"
  }
}
```

### Update Books

#### Request
- Endpoint: POST: `/api/users/1/return/1`
- Body `(application/json)`

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "You have just returned The man God uses"
  }
}
```

### Update Books

#### Request
- Endpoint: PUT: `/api/books/8`

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "The man God uses, successfully updated"
}
```

### Get all Books

#### Request
- Endpoint: DELETE: `/api/books`

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
    {
        "id": 3,
        "bookTitle": "Liittle things that matters",
        "author": "Gbile Akanni",
        "isbn": "100m255kllop",
        "bookSummary": "A book for the youth",
        "quantity": 5,
        "createdAt": "2017-11-07T13:33:01.600Z",
        "updatedAt": "2017-11-07T13:33:01.600Z"
    },
    {
        "id": 2,
        "bookTitle": "Battle for the young",
        "author": "Gbile Akanni",
        "isbn": "yuijh767787",
        "bookSummary": "Christian literature",
        "quantity": 13,
        "createdAt": "2017-11-03T17:07:53.518Z",
        "updatedAt": "2017-11-11T15:56:35.390Z"
    },
    {
        "id": 6,
        "bookTitle": "Be courageous not coward",
        "author": "John",
        "isbn": "56e56rtfrd566783nj",
        "bookSummary": "Faith",
        "quantity": 8,
        "createdAt": "2017-11-13T11:01:29.376Z",
        "updatedAt": "2017-11-13T11:01:29.376Z"
    },
    {
        "id": 1,
        "bookTitle": "The man God uses",
        "author": "Gbile Akanni",
        "isbn": "yuijh767jujnbb787l",
        "bookSummary": "Christian literature",
        "quantity": 9,
        "createdAt": "2017-11-03T17:06:54.924Z",
        "updatedAt": "2017-11-13T12:02:50.127Z"
    }
]
```


## Users
Endpoint for Users resource.

### Create new Users

#### Request
- Endpoint: POST: `/api/user/signup`
- Requires: Authentication
-- Body `(application/json)`
```json
{
  "username": "johnson",
  "firstname": "johnson",
  "lastname": "johnson",
  "email": "johnson@mail.com",
  "password": "pass123",
  "roleId":1,
  "mobileNumber":"23434801234567"

}
```
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
 "message" : "Johnson Successfully sign up""
}
```

### Create User

#### Request
- Endpoint: POST: `/users`
- Body `(application/json)`
```json
{
  "username": "johnson",
  "firstname": "johnson",
  "lastname": "johnson",
  "email": "johnson@mail.com",
  "password": "pass123",
  "roleId":1,
  "mobileNumber":"23434801234567"

}
```

#### Response
- Status: `400: Created`
- Body `(application/json)`
```json
{
  "message": "email/password already exist",
}
```

### Login

#### Request
- Endpoint: POST: `/api/user/signin`
- Body `(application/json)`
```json
{
  "email": "johnson",
  "password": "pass123",
}
```

#### Response
- Status: `200: Ok`
- Body `(application/json)`
```json
{
  "message": "johnson, successfully logged in",
}
```
### Review a book

#### Request
- Endpoint: GET: `/api/users/1/review/1`

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
    "id": 6,
    "bookId": 1,
    "userId": 1,
    "comment": "This book has been reviewed",
    "updatedAt": "2017-11-13T14:38:51.898Z",
    "createdAt": "2017-11-13T14:38:51.898Z"
}
```

### Mark a favorite book

#### Request
- Endpoint: GET: `/api/users/1/fav/1`

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
    "message": "Favorite book marked"
}
```

### GET a user favorite book

#### Request
- Endpoint: GET: `/api/users/:userId/favbooks`

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
    "id": 1,
    "bookId": 2,
    "userId": 1,
    "createdAt": "2017-11-07T00:13:27.274Z",
    "updatedAt": "2017-11-07T00:13:27.274Z"
}
```

## Development
HELLO BOOK API is built with the following technologies;
- JavaScript (ES6)
- [NodeJs](https://nodejs.org)
- [Express](http://expressjs.com/)
- [Postgresql](https://www.postgresql.org/)
- [Sequelize ORM](http://docs.sequelizejs.com/en/v3/)

## Installation
  - Install [NodeJs](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) on your machine
  - Clone the repository `$ git clone https://github.com/adydams/hello-books`
  - Install all required dependencies with `$ npm install`
  - Create a `.env` file in your root directory as described in `.env.sample` file
  - Start the app with `npm start`
  
## Contributing
- Fork this repository to your GitHub account
- Clone the forked repository
- Create your feature branch
- Commit your changes
- Push to the remote branch
- Open a Pull Request

## Limitations
The limitations of the API are:
- Users cannot delete themselves using the API
- Books cannot be deleted using the API

## LICENSE
 © [Adigun Oluwadamilola](https://github.com/adydams/hello-books)
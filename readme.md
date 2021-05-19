

## Variables

- grab the id and then input it into the table

data table

bugs table

- id
- problem (string)
- whatshouldbe (string)
- whatactuallyis (string)
- hypothesis (string)
- plan (string)
- user_id (integer)

Frontend variables

- Create a button for each of the rows

- Form: #debuggingForm
- input: problem, whatshouldbe, whatactuallyis, hypothesis, plan

- Form: #updateDebuggingForm
- updateProblem, updateWhatShouldBe,updateWhatActuallyIs,updateHypothesis, updatePlan

## Purpose :dark_sunglasses:

The purpose of this repository is to create a RESTful application that utilizes

- express-handlebars
- knex
- express-basic-auth
- pg
- express
- passport.js
- dotenv

### How to run this package

Copy and paste this template into your .env file

- DB_NAME=
- DB_USERNAME=
- DB_PASSWORD=
- TWITTER_KEY=
- TWITTER_SECRET=
- FACEBOOK_APP_ID=
- FACEBOOK_SECRET=
- GOOGLE_ID=
- GOOGLE_SECRET=

```
npm install
```

```
nodemon app.js
```

### How it works :open_book:

## Planning process

- Postgres - what database looks like
- Folders that we might need
  - User interface
  - Installing packages we might potentially use
  - Express, express-handlebars, knex, etc.
  - Migration and seeds (adding in some dummy data)
  - Body-parser
  - Create routes -> to see if the application is working
  - Login / signup (passport.js)
  - Routes -> /api/users, /api/bugs

## Checklist

| User Story                       |   Task   | How it works | Done |
| -------------------------------- | :------: | :----------: | ---- |
| Users will be able to signup     |          |              |      |
| Users will be able to login      | Frontend |              |      |
| Users will be able to login      | Backend  |              |      |
| Users will be able to add bugs   | Frontend |              |      |
| Users will be able to edit bug   | Backend  |              |      |
| Users will be able to get bugs   | Frontend |              |      |
| Users will be able to delete bug | Backend  |              |      |

## Checklist

| Route                              |     Method     |                     What it does                      | Redirect | Object     |
| ---------------------------------- | :------------: | :---------------------------------------------------: | -------- | ---------- |
| Test all service methods           | Test (postman) |       Ensuring that all my queries are correct        |          |            |
| /api/bugs                          |      GET       |                     Gets all bugs                     |          |            |
| /api/users/:id/bugs                |      GET       |                  Gets all users bugs                  | bugs     | bugs, user |
| /api/bugs/:bugId                   |      GET       |                   Gets specific bug                   |          |            |
| /api/users/:id/bugs/:bugId         |      GET       |                   Gets specific bug                   | bugs     | bugs, user |
| /api/users/:id/bugs                |      POST      |                       Posts bug                       | bugs     | bugs, user |
| /api/users/:id/bugs/:bugId         |      PUT       |                       Edits bug                       | bugs     | bugs, user |
| /api/users/:id/bugs/:bugId         |     DELETE     |                      Deletes bug                      | bugs     | bugs, user |
| /api/users                         |      GET       |                    Gets all users                     |          |            |
| /api/users/:id                     |      GET       |                  Gets specific user                   |          |            |
| /api/users                         |      POST      |                       Adds user                       | Login    |            |
| /api/users/:id                     |      PUT       |                      Edits user                       | Home     |            |
| /login                             |      POST      |                  Login - verify user                  | bugs     | bugs, user |
| /api/users/:id                     |     DELETE     |                     Deletes user                      | Home     |            |
| implement callback for passport js |      get       | Allows us to pass in id into home page via handlebars | Home     | bugs, user |

http://www.passportjs.org/docs/authenticate/

### User Stories :telescope:

1. Users will be able to look through the various examples and understand how to test well.

## Sprint :athletic_shoe:

| Done? | Component              | Priority | Estimated Time | Actual Time |
| ----- | ---------------------- | :------: | :------------: | :---------: |
| x     | This checklist         |    H     |    30 mins     |             |
|       | Read Documentation     |    M     |    30 mins     |             |
|       | Look at three examples | 30 mins  |                |             |
|       | Complete basic example |    M     |    30 mins     |     15      |

### Daily Stand Up :hourglass:

## Issues and Resolutions :flashlight:

**ERROR**: :gear:
**RESOLUTION**: :key:

| Issue                   |     Where it occurs      | Possible solution |        Actual solution        |
| ----------------------- | :----------------------: | :---------------: | :---------------------------: |
| Password authentication | When running my pg files |    PG password    | Not installing hte pg package |

#### What is one thing that I learned from doing this project? :books:

# Route Names

GET /auth/gmail
GET /auth/facebook DONE
GET /todolist (placeholder)
GET /login DONE
GET /signup DONE
POST /login
POST /signup

TABLE

## passport_users

id
username
facebook_id
gmail_id
password
hash

## profile

id
first name
last name
email
number

# Steps

1. Install all needed packages
2. Create app.js
3. Import packages
4. Create queries
   // postUser(username, twitter_id, facebook_id, password)
   // getAllUsers()
   // twitterIdExists(twitterId)
   // facebookIdExists(facebookId)
   // getById(id)
   // getByTwitterId(twitterId)
   // getByFacebookId(facebookId)
   // deserialize(id, done)
   // serialize(user, done)

5. knex init
6. Create migration tables
   1. knex migrate:make passport_users
   2. If doesn't work, delete knex tables from your database (knex_migrations and knex_migrations_lock)
7. Test queries
8. Get facebook id and secret
9. Get twitter id and secret

## Questions

- How do I setup the username and password?

- Check the sign in and create route

// Whenever you use passport, you are essentially using two libraries
// the first is passport
// the second is the "strategy" that you are using

// local strategy verifies username and password
// http://www.passportjs.org/packages/passport-local/

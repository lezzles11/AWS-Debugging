const development = require("../knexfile").development;
const knex = require("knex")(development);
const hashFunction = require("../passport/hashFunction");
const TABLE_NAME = "passport_users";

function postFacebook(username, facebookId) {
  return knex(TABLE_NAME).insert({
    username: username,
    facebook_id: facebookId,
  });
}
function postGmail(username, gmailId) {
  return knex(TABLE_NAME).insert({
    username: username,
    gmail_id: gmailId,
  });
}

function userExists(username) {
  return knex(TABLE_NAME)
    .count("id as n")
    .where("username", username)
    .then((count) => {
      return count[0].n > 0;
    });
}

function createUser(username, password) {
  return userExists(username)
    .then((exists) => {
      if (exists) {
        return Promise.reject(new Error("user exists"));
      }
    })
    .then(() => hashFunction.hashPassword(password))
    .then((hash) => {
      return knex(TABLE_NAME).insert({
        username: username,
        password: password,
        hash: hash,
      });
    });
}

function verify(username, password) {
  getByUsername(username)
    .then((user) => {
      return user;
    })
    .then((user) => {
      let getUser = user[0];
      return hashFunction.checkPassword(
        password,
        getUser.hash
      );
    })
    .then((auth) => {
      console.log("Authorized", auth);
      return auth;
    })
    .then((auth) => {
      if (auth === true) {
        console.log("verified");
        return getByUsername(username);
      } else {
        console.log("not verified");
        return false;
      }
    })
    .then((user) => {
      console.log(user);
      return user[0];
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function signIn(req, res, next) {
  console.log("body", req.body);
  let username = req.body.username;
  let password = req.body.password;
  console.log("Username", username);
  verify(username, password);
  getByUsername(username)
    .then((user) => {
      return user;
    })
    .then((user) => {
      return (
        user &&
        hashFunction.checkPassword(password, user.hash)
      );
    })
    .catch(() => {
      res.status(404).send("error hashing password");
    });
}

// function postUser(
//   username,
//   twitterId,
//   facebookId,
//   password
// ) {
//   return knex(TABLE_NAME).insert({
//     username: username,
//     twitter_id: twitterId,
//     facebook_id: facebookId,
//     password: password,
//   });
// }
function deleteUser(id) {
  return knex(TABLE_NAME)
    .where({ id: id })
    .del()
    .then(() => {
      console.log("deleted user");
    });
}
function getAllUsers() {
  let allUsers = knex(TABLE_NAME).select(
    "id",
    "username",
    "twitter_id",
    "facebook_id",
    "password"
  );
  allUsers
    .then((eachRow) => {
      return eachRow.map((eachUser) => ({
        id: eachUser.id,
        username: eachUser.username,
        twitter_id: eachUser.twitter_id,
        facebook_id: eachUser.facebook_id,
        password: eachUser.password,
      }));
    })
    .then((eachUser) => {
      console.log("Each user");
      console.log(eachUser);
    });
}

function facebookIdExists(facebookId) {
  return knex(TABLE_NAME)
    .count("id as n")
    .where("facebook_id", facebookId)
    .then((count) => {
      return count[0].n > 0;
    });
}
function gmailIdExists(gmailId) {
  return knex(TABLE_NAME)
    .count("id as n")
    .where("gmail_id", gmailId)
    .then((count) => {
      return count[0].n > 0;
    });
}
function getById(id) {
  return knex(TABLE_NAME)
    .select("id", "username")
    .where("id", id);
}
function getByGmail(email) {
  return knex(TABLE_NAME)
    .select("id", "username", "gmail_id", "password")
    .where({ username: email });
}
function getByUsername(username) {
  return knex(TABLE_NAME)
    .select(
      "id",
      "username",
      "twitter_id",
      "facebook_id",
      "hash",
      "password"
    )
    .where("username", username);
}

function getByGmailId(gmailId) {
  return knex(TABLE_NAME)
    .select("")
    .where("gmail_id", gmailId);
}

function getByFacebookId(facebookId) {
  return knex(TABLE_NAME)
    .select()
    .where("facebook_id", facebookId);
}
module.exports = {
  //   postUser: postUser,
  verify: verify,
  postFacebook: postFacebook,
  postGmail: postGmail,
  createUser: createUser,
  gmailIdExists: gmailIdExists,
  facebookIdExists: facebookIdExists,
  getById: getById,
  getByFacebookId: getByFacebookId,
  getByGmail: getByGmail,
  getByGmailId: getByGmailId,
  postFacebook: postFacebook,
};

/**********************************************
 * Test Queries
 * ==================================
 ***********************************************/

// deleteUser(1);

// postUser(
//   "sam",
//   "twitter_id",
//   "facebook_id",
//   "password"
// ).then((obj) => {
//   console.log("inserted!");
// });

// getAllUsers();
// verify("lesley", "password")
// verify("lesley", "notpassword");

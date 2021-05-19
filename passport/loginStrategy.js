/**********************************************
 * Username and Password (Local Strategy)
 * ==================================
 * 1. Look at documentation
 * http://www.passportjs.org/packages/passport-local/
 * 2. Implement callback (verifies username and password)
 * 3. Specify strategy in route
 ***********************************************/

const development = require("../knexfile").development;
const hashFunction = require("./hashFunction");
const knex = require("knex")(development);
const TABLE_NAME = "passport_users";
const LocalStrategy = require("passport-local").Strategy;
// facebook strategy verifies
/**********************************************
 * #TODO: refactor the knex queries here
 * ==================================
 ***********************************************/
module.exports = new LocalStrategy(
  async (username, password, done) => {
    console.log("logging in");
    // try putting the username in
    try {
      let users = await knex(TABLE_NAME).where({
        username: username,
      });
      // if user doesn't exist, then return false - it doesn't exist
      if (users.length == 0) {
        return done(null, false, {
          message: "username does not exists",
        });
      }
      // otherwise, get the user
      let user = users[0];
      console.log("User", user);
      console.log("User password", user.password);
      // check their password
      let result = await hashFunction.checkPassword(
        password,
        user.hash
      );
      console.log(
        "Does the check password function work here?",
        result
      );
      // if you get something back, return the user
      if (result) {
        // pass back the user
        return done(null, user);
      } else {
        // otherwise, give them a message - incorrect credentials
        return done(null, false, {
          message: "incorrect credentials",
        });
      }
    } catch (err) {
      done(err);
    }
  }
);

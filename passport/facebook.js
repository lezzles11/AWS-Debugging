require("dotenv").config();
const userQueries = require("../database/userQueries");
const FacebookStrategy =
  require("passport-facebook").Strategy;

const facebookConfig = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: `${process.env.URL}/auth/facebook/callback`,
};
function facebookCallback(
  accessToken,
  refreshToken,
  profile,
  done
) {
  const user = { username: profile.displayName };
  // get user from database
  console.log(
    "SAVING THIS TO FB",
    profile.displayName,
    profile.id
  );
  console.log("user information", profile);

  console.log("access token", accessToken);
  console.log("refresh token", refreshToken);
  userQueries
    .getByFacebookId(profile.id)
    .then((queryRow) => {
      if (queryRow.length === 0) {
        console.log("Creating new user");
        userQueries
          .postFacebook(profile.displayName, profile.id)
          .then((newIds) => {
            user.id = newIds[0];
            return done(null, user);
          })
          .catch((error) => {
            done(error, false, {
              message: "couldn't add user",
            });
          });
      } else {
        // return user as an object
        user.id = queryRow[0].id;
        console.log("Facebook new user:", user);
        return done(null, user);
      }
    })
    .catch((error) => {
      return done(error, false, {
        message: "couldn't check database",
      });
    });
}

const facebook = new FacebookStrategy(
  facebookConfig,
  facebookCallback
);
module.exports = {
  facebook: facebook,
};

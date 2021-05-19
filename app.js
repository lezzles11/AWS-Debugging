const passportFunctions = require("./passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const expressSession = require("express-session");
const handlebars = require("express-handlebars");
// authenticate requests
const app = express();
const knexConfig = require("./knexfile")["development"];
const knex = require("knex")(knexConfig);
const BugService = require("./database/bugService");
const BugRoutes = require("./routes/bugRoutes");

const result = dotenv.config();

// if (result.error) {
//   throw result.error;
// }

// console.log(result.parsed);
const PORT = process.env.PORT;
let bugService = new BugService(knex);
let bugRouter = new BugRoutes(bugService);

app.use(express.static("public"));
app.use(cookieParser());
app.engine("handlebars", handlebars());

app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  // Creating a new session generates a new session id, stores that in a session cookie, and
  expressSession({
    secret: "secret",
    // save the user
    // if false, will not save session to browser
    resave: true,
    // if saveUninitialized is false, session object will not be stored in sesion store
    saveUninitialized: true,
  })
);

app.use(passportFunctions.initialize());
//
app.use(passportFunctions.session());
// middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("User is totally authenticated");
    return next();
  }

  res.redirect("/login");
}

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post(
  "/signup",
  passportFunctions.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/error",
  })
);

app.post(
  "/login",
  passportFunctions.authenticate("local-login", {
    successRedirect: "/debug",
    failureRedirect: "/error",
  })
);

app.get(
  "/auth/gmail",
  passportFunctions.authenticate("google", {
    // want to get this so you can save information to your database
    // can save it into your database
    scope: ["profile", "email"],
  })
);
app.get("/auth/gmail/callback", function (req, res, next) {
  passportFunctions.authenticate(
    "google",
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/");
      }
      req.logIn(user, function (err) {
        let id = user.id;
        console.log("Id: ", user.id);

        if (err) {
          return next(err);
        }
        // #TODO: will need to change this later to /debug/id
        return res.redirect(`/debug`);
      });
    }
  )(req, res, next);
});

app.get(
  "/auth/facebook/callback",
  function (req, res, next) {
    passportFunctions.authenticate(
      "facebook",
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect("/");
        }
        req.logIn(user, function (err) {
          console.log("Id: ", user.id);
          let id = user.id;
          if (err) {
            return next(err);
          }
          // #TODO: will need to change this later to /debug/id
          return res.redirect(`/debug`);
        });
      }
    )(req, res, next);
  }
);

app.get(
  "/auth/facebook",
  passportFunctions.authenticate("facebook", {
    scope: ["email"],
  })
);
// app.get(
//   "/auth/facebook/callback",
//   passportFunctions.authenticate("facebook", {
//     successRedirect: "/debug",
//     failureRedirect: "/error",
//   })
// );

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/debug", (request, response) => {
  response.render("debug");
});

// app.get("/debug", passport.authenticate(""))

app.get("/error", (request, response) => {
  response.render("error");
});
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.use("/", bugRouter.router());

app.listen(PORT, () => {
  console.log(`Opening channel for client on port ${PORT}`);
});

/**********************************************
 *
 * ==================================
 * 
 * This Works
 ***********************************************/

app.get(
  "/auth/facebook",
  passportFunctions.authenticate("facebook", {
    scope: ["email"],
  })
);
app.get(
  "/auth/facebook/callback",
  passportFunctions.authenticate("facebook", {
    successRedirect: "/debug",
    failureRedirect: "/error",
  })
);





// After user authenticates, redirect to /
// app.get(
//   "/auth/facebook/callback",
//   function (request, response) {
//     passportFunctions.authenticate(
//       "facebook",
//       function (error, user, info) {
//         console.log("error", error);
//         console.log("user", user);
//         console.log("info", info);
//         console.log(
//           "1. Ensure that you get the user information"
//         );
//         console.log("**********");
//         console.log(
//           "What should happen: Get user information"
//         );
//         console.log("Received this data from: facebook ");
//         console.log("This should go: handlebars page ");
//         console.log("What is happening: ");
//         console.log("**********");
//         response.redirect("/debug");

//         // if (error) {
//         //   console.log("error");
//         // }
//         // if (!user) {
//         //   response.redirect("/login");
//         // }
//         // console.log(
//         //   "Facebook login successful. User:",
//         //   user
//         // );
//         // console.log("Information", info);
//         // // response.render("debug", {});
//         // response.send(user);
//       }
//     );
//   }
// );

app.post("/login", function (req, res, next) {
  passport.authenticate(
    "local",
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      // Redirect if it fails
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        // Redirect if it succeeds
        return res.redirect("/users/" + user.username);
      });
    }
  )(req, res, next);
});

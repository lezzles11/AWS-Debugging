const development = require("../knexfile").development;
const knex = require("knex")(development);
const hashFunction = require("../passport/hashFunction");
const TABLE_NAME = "passport_users";
function getByGmail(email) {
  return knex(TABLE_NAME)
    .select("username", "gmail_id", "password")
    .where({ username: email });
}

getByGmail("lesley.yc@gmail.com").then((user) => {
  console.log(user);
});
function userExists(username) {
  return knex(TABLE_NAME)
    .count("id as n")
    .where("username", username)
    .then((count) => {
      return count[0].n > 0;
    });
}

console.log(userExists("lezzles"));

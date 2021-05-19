/**********************************************
 * Knex Queries
 * ==================================
 *
 ***********************************************/

require("dotenv").config();
const TABLE_NAME = "bugs";
const development = require("../knexfile").development;
const knex = require("knex")(development);

class BugService {
  constructor(knex) {
    this.knex = knex;
  }
  // getting all bugs
  getAll() {
    return this.knex(TABLE_NAME)
      .select()
      .then((eachRow) => {
        console.log(eachRow);
        return eachRow.map((row) => ({
          id: row.id,
          problem: row.problem,
          whatshouldbe: row.whatshouldbe,
          whatactuallyis: row.whatactuallyis,
          hypothesis: row.hypothesis,
          plan: row.plan,
          user_id: row.user_id,
        }));
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  // getting all of the user's bugs
  getUsersBugs(id) {
    return this.knex(TABLE_NAME)
      .select()
      .where({ user_id: id })
      .then((eachRow) => {
        console.log(eachRow);
        return eachRow.map((row) => ({
          id: row.id,
          problem: row.problem,
          whatshouldbe: row.whatshouldbe,
          whatactuallyis: row.whatactuallyis,
          hypothesis: row.hypothesis,
          plan: row.plan,
          user_id: row.user_id,
        }));
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  // getting specific bug
  get(id) {
    return this.knex(TABLE_NAME)
      .select()
      .where({ id: id })
      .then((eachRow) => {
        console.log(eachRow);
        return eachRow;
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  // adding bug
  add(bug) {
    return this.knex(TABLE_NAME)
      .max("id")
      .then((getCount) => {
        console.log(getCount);
        let currCount = parseInt(getCount[0].max);
        console.log(currCount);
        return currCount;
      })
      .then((count) => {
        console.log("Can get new id: ", count);
        let newId = count + 1;
        console.log("Can increment by one", newId);
        console.log(bug);
        let object = bug.bug;
        object.id = newId;
        console.log("adding bug: ", bug);
        return this.knex(TABLE_NAME).insert(object);
      })
      .then(() => {
        console.log("inserted");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  // deleting bug
  delete(id) {
    return this.knex(TABLE_NAME)
      .where({ id: id })
      .del()
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  // editing bug
  edit(id, newBug) {
    return this.knex(TABLE_NAME)
      .where({ id: id })
      .update(newBug)
      .then(() => {
        console.log("updated");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
}

module.exports = BugService;
// let database = new BugService(knex);

// database.getAll();
// database.get(1);
// database.add({
// id: 4
//   problem: "password authentication",
//   whatshouldbe: "we should be able to run our queries",
//   whatactuallyis:
//     "we had an error that said we were not authenticated",
//   hypothesis:
//     "postgres database -> username and password were not valid",
//   plan: "google it first - turns out we needed to install pg (thanks JC!) as well as ensure that we hardcode our values into the knexfile.js",
//   user_id: 1,
// });

// database.edit(4, {
//   problem: "dotenv",
//   whatshouldbe: "we should be able to run our queries",
//   whatactuallyis:
//     "cannot run without hardcoding password and username",
//   hypothesis: "something wrong with dotenv",
//   plan: "google it first - turns out we needed to install pg (thanks JC!) as well as ensure that we hardcode our values into the knexfile.js",
//   user_id: 1,
// });
// database.delete(4);

// module.exports = DebugService;

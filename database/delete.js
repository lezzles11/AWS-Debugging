const knexConfig = require("../knexfile")["development"];
const knex = require("knex")(knexConfig);

knex("bugs")
  .select("*")
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
  });

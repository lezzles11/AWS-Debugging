exports.up = function (knex, Promise) {
  return knex.schema.createTable("bugs", (table) => {
    table.increments("id");
    table.string("problem");
    table.string("whatshouldbe");
    table.string("whatactuallyis");
    table.string("hypothesis");
    table.string("plan");
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("passport_users");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("bugs");
};


exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments('id');
      tbl.string('make', 128).notNullable().index();
      tbl.string('model', 128).notNullable().index();
      tbl.string('vin', 17).notNullable().index();
      tbl.integer('mileage').notNullable().index();
      
      tbl.string('transmissionType', 128).index();
      tbl.string('titleStatus', 128).index();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};

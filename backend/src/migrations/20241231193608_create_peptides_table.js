/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  console.log('Starting migration...');
  return knex.schema
    .createTable('peptides', table => {
      console.log('Creating peptides table...');
      table.increments('id').primary();
      table.string('sequence').notNullable();
      table.string('name').notNullable();
      table.text('description');
      table.timestamps(true, true);
    })
    .then(() => {
      console.log('Peptides table created successfully');
    })
    .catch(error => {
      console.error('Error creating table:', error);
      throw error;
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('peptides');
};
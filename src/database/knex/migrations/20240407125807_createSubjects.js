exports.up = knex => knex.schema.createTable("subjects", table => { 
    table.increments("id");
    table.text("name"); 
    table.date("created");
}); 

exports.down = knex => knex.schema.dropTable("subjects"); //processo de deletar a tabela
exports.up = knex => knex.schema.createTable("class", table => { 
    table.increments("id");
    table.text("name"); 
    table.text("year"); 
    table.date("created");
}); 

exports.down = knex => knex.schema.dropTable("class"); //processo de deletar a tabela
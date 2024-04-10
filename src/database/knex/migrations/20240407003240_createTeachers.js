exports.up = knex => knex.schema.createTable("teachers", table => { 
    table.increments("id");
    table.text("name"); 
    table.text("email");
    table.text("cpf");
    table.date("birth");
    table.text("password");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("update_at").default(knex.fn.now());
}); 

exports.down = knex => knex.schema.dropTable("teachers"); //processo de deletar a tabela 
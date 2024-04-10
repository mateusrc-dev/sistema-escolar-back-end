exports.up = knex => knex.schema.createTable("studentsAndClass", table => { 
    table.increments("id");
    table.integer("class_id").references("id").inTable("class").onDelete("CASCADE");
    table.integer("student_id").references("id").inTable("students").onDelete("CASCADE");
}); 

exports.down = knex => knex.schema.dropTable("studentsAndClass"); //processo de deletar a tabela
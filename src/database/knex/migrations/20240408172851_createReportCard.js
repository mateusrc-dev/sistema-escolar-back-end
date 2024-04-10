exports.up = knex => knex.schema.createTable("reportCard", table => { 
    table.increments("id");
    table.float("assessment_one")
    table.float("assessment_two")
    table.float("recovery")
    table.integer("student_id").references("id").inTable("students");
    table.integer("subject_id").references("id").inTable("subjects");
}); 

exports.down = knex => knex.schema.dropTable("reportCard"); //processo de deletar a tabela
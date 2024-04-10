exports.up = knex => knex.schema.createTable("classAndTeachersAndSubjects", table => { 
    table.increments("id");
    table.integer("teacher_id").references("id").inTable("teachers").onDelete("CASCADE");
    table.integer("class_id").references("id").inTable("class").onDelete("CASCADE");
    table.integer("subject_id").references("id").inTable("subjects").onDelete("CASCADE");
}); 

exports.down = knex => knex.schema.dropTable("classAndTeachersAndSubjects"); //processo de deletar a tabela
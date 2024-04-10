const knex = require("../database/knex")

class ClassAndTeachersController {
  async create(request, response) {
    const { teacher_id, class_id, subject_id } = request.body
    //const { user_id } = request.params
    //const user_id = request.user.id
    await knex("classAndTeachersAndSubjects").insert({ teacher_id, class_id, subject_id })
    response.json()
  }

  async delete(request, response) {
    const { id } = request.params
    //const user_id = request.user.id
    await knex("classAndTeachersAndSubjects").where({ class_id: id }).delete()
    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const relationsReturn = await knex('classAndTeachersAndSubjects')
      .where({ class_id: id})
      .select(
        'classAndTeachersAndSubjects.*',
        'class.name as class_name',
        'class.year as class_year',
        'class.created as class_created',
        'subjects.name as subject_name',
        'subjects.created as subject_created',
        'teachers.name as teacher_name',
      )
      .leftJoin('class', 'classAndTeachersAndSubjects.class_id', 'class.id')
      .leftJoin('subjects', 'classAndTeachersAndSubjects.subject_id', 'subjects.id')
      .leftJoin('teachers', 'classAndTeachersAndSubjects.teacher_id', 'teachers.id');
    
      return response.json({ relationsReturn })
  }
}

module.exports = ClassAndTeachersController
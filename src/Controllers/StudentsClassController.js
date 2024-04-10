const knex = require("../database/knex")

class StudentsAndClassController {
  async create(request, response) {
    const { student_id, class_id } = request.body
    //const { user_id } = request.params
    //const user_id = request.user.id
    await knex("studentsAndClass").insert({ student_id, class_id })
    response.json()
  }

  async delete(request, response) {
    const { id } = request.params
    //const user_id = request.user.id
    await knex("studentsAndClass").where({ class_id: id }).delete()
    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const relationsReturn = await knex('studentsAndClass')
      .where({ class_id: id})
      .select(
        'studentsAndClass.*',
        'class.name as class_name',
        'class.year as class_year',
        'class.created as class_created',
        'students.id as student_id',
        'students.name as student_name',
        'students.birth as student_birth',
        'students.cpf as student_cpf',
      )
      .leftJoin('class', 'studentsAndClass.class_id', 'class.id')
      .leftJoin('students', 'studentsAndClass.student_id', 'students.id');
    
      return response.json({ relationsReturn })
  }
}

module.exports = StudentsAndClassController
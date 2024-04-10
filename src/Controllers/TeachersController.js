const knex = require("../database/knex")

class TeachersController {
  async create(request, response) {
    const { name, email, cpf, birth, password } = request.body
    const teacherCreated = await knex("teachers").insert({
      name, 
      email, 
      cpf, 
      birth, 
      password
    })
    response.json({ teacherCreated })
  }

  async update(request, response) {
    const { name, email, cpf, birth, password } = request.body
    const { id } = request.params
    await knex("teachers").update({
      name, 
      email, 
      cpf, 
      birth, 
      password
    }).where({ id })
    response.json()
  }

  async show(request, response) {
    const { name } = request.query
    const teachers = await knex("teachers").whereLike("name", `%${name}%`).orderBy("name")
    return response.json({ teachers })
  }

  async getTeacher(request, response) {
    const { id } = request.params
    const teacher = await knex("teachers").where({ id })
    response.json({ teacher })
  }

  async delete(request, response) {
    const { id } = request.params
    await knex("teachers").where({ id }).delete()
    response.json()
  }
}

module.exports = TeachersController
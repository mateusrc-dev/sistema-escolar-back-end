const knex = require("../database/knex")

class studentsController {
  async create(request, response) {
    const { name, email, cpf, birth, password } = request.body
    await knex("students").insert({
      name, 
      email, 
      cpf, 
      birth, 
      password
    })
    response.json()
  }

  async update(request, response) {
    const { name, email, cpf, birth, password } = request.body
    const { id } = request.params
    await knex("students").update({
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
    const students = await knex("students").whereLike("name", `%${name}%`).orderBy("name")
    return response.json({ students })
  }

  async getStudent(request, response) {
    const { id } = request.params
    const student = await knex("students").where({ id })
    response.json({ student })
  }

  async delete(request, response) {
    const { id } = request.params
    await knex("students").where({ id }).delete()
    response.json()
  }
}

module.exports = studentsController
const knex = require("../database/knex")
//const AppError = require("../utils/AppError")

class SubjectsController {
  async create(request, response) {
    const { name, created } = request.body
    //const user_id = request.user.id
    //const { user_id } = request.params
    await knex("subjects").insert({ name, created })
    response.json()
  }

  async update(request, response) {
    const { name, created } = request.body
    const { id } = request.params
    //const user_id = request.user.id
    //const { user_id } = request.params
    await knex("subjects").update({ name, created }).where({ id })
    response.json()
  }

  async show(request, response) {
    const { name } = request.query
    const subjects = await knex("subjects").whereLike("name", `%${name}%`).orderBy("name")
    return response.json({ subjects })
  }

  async getSubject(request, response) {
    const { id } = request.params
    const subject = await knex("subjects").where({ id })
    response.json({ subject })
  }

  async delete(request, response) {
    const { id } = request.params
    await knex("subjects").where({ id }).delete()
    return response.json()
  }
}

module.exports = SubjectsController
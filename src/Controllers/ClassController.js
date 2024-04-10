const knex = require("../database/knex")

class ClassController {
  async create(request, response) {
    const { name, year, created } = request.body
    //const user_id = request.user.id
    //const { user_id } = request.params
    const newClass = await knex("class").insert({ name, year, created })
    response.json({ newClass })
  }

  async update(request, response) {
    const { name, year, created } = request.body
    const { id } = request.params
    //const user_id = request.user.id
    //const { user_id } = request.params
    await knex("class").update({ name, year, created }).where({ id })
    response.json()
  }

  async show(request, response) {
    //const { id } = request.params
    const { name } = request.query
    const classItems = await knex("class").whereLike("name", `%${name}%`).orderBy("name")
    return response.json({ classItems })
  }

  async getClass(request, response) {
    const { id } = request.params
    const classItem = await knex("class").where({ id })
    response.json({ classItem })
  }

  async delete(request, response) {
    const { id } = request.params
    await knex("class").where({ id }).delete()
    return response.json()
  }
}

module.exports = ClassController